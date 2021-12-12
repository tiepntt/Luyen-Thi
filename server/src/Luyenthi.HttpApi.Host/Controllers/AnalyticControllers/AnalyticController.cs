using AutoMapper;
using Luyenthi.Core.Dtos.Analytic;
using Luyenthi.Core.Enums;
using Luyenthi.Domain.User;
using Luyenthi.EntityFrameworkCore;
using Luyenthi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Luyenthi.HttpApi.Host.Controllers.AnalyticControllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AnalyticController : Controller
    {
        private readonly UserService _userService;
        private readonly ChapterRepository _chapterRepository;
        private readonly SubjectService _subjectService;
        private readonly QuestionRepository _questionRepository;
        private readonly QuestionHistoryRepository _questionHistoryRepository;
        private readonly IMapper _mapper;

        public AnalyticController(
            UserService userService,
            ChapterRepository chapterRepository,
            SubjectService subjectService,
            QuestionRepository questionRepository,
            QuestionHistoryRepository questionHistoryRepository,
            IMapper mapper
            )
        {
            _userService = userService;
            _chapterRepository = chapterRepository;
            _subjectService = subjectService;
            _questionRepository = questionRepository;
            _questionHistoryRepository = questionHistoryRepository;
            _mapper = mapper;
        }

        [HttpGet("{subjectId}")]
        public Dictionary<string, dynamic> GetAnalytic(Guid subjectId)
        {
            ApplicationUser user = (ApplicationUser)HttpContext.Items["User"];

            var chapterBySubject = _chapterRepository.Find(c => c.SubjectId == subjectId).Select(c => c.Id).ToList();

            var questionHistory = _questionHistoryRepository.Find(h => h.CreatedBy == user.Id).Include(i => i.Question).Select(h => new
            {
                ChapterId = h.Question.ChapterId,
                QuestionId = h.QuestionId,
                Status = h.AnswerStatus,
                SubjectId = h.Question.SubjectId,
            }).Where(s => s.SubjectId == subjectId).ToList().GroupBy(k => k.ChapterId).Select(g => new
            {
                ChapterId = (Guid)g.Key,
                QuestionCorrectQuantily = g.Where(g => g.Status == AnswerStatus.Correct).Count(),
                QuestionQuantily = g.ToList().Count,
                QuestionTotal = _questionRepository.Find(q => q.ChapterId == g.Key).Count(),
            }).ToList();

            foreach (var id in chapterBySubject)
            {
                if (!questionHistory.Select(h=>h.ChapterId).Contains(id))
                {
                    questionHistory.Add(new
                    {
                        ChapterId = id,
                        QuestionCorrectQuantily = 0,
                        QuestionQuantily = 0,
                        QuestionTotal = _questionRepository.Find(q => q.ChapterId == id).Count(),
                    });
                }
            }

            return new Dictionary<string, dynamic>()
            {
                {"Analytic", questionHistory},
            };
        }
    }
}
