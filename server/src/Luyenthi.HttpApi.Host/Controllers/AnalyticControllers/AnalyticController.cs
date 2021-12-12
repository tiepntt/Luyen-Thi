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
        private readonly GradeService _gradeService;
        private readonly SubjectService _subjectService;
        private readonly QuestionRepository _questionRepository;
        private readonly QuestionHistoryRepository _questionHistoryRepository;
        private readonly IMapper _mapper;

        public AnalyticController(
            UserService userService,
            GradeService gradeService,
            SubjectService subjectService,
            QuestionRepository questionRepository,
            QuestionHistoryRepository questionHistoryRepository,
            IMapper mapper
            )
        {
            _userService = userService;
            _subjectService = subjectService;
            _questionRepository = questionRepository;
            _questionHistoryRepository = questionHistoryRepository;
            _mapper = mapper
        }

        [HttpGet]
        public Dictionary<string,dynamic> GetAnalytic()
        {
            ApplicationUser user = (ApplicationUser)HttpContext.Items["User"];

            var questionHistory = _questionHistoryRepository.Find(h => h.CreatedBy == user.Id).Include(i => i.Question).Select(h => new
            {
                ChapterId = h.Question.ChapterId,
                QuestionId = h.QuestionId,
                Status = h.AnswerStatus,
            }).ToList().GroupBy(k=>k.ChapterId).Select(g=>new
            {
                ChapterId = g.Key,
                QuestionCorrectQuantily = g.Where(g => g.Status == AnswerStatus.Correct).Count(),
                QuestionQuantily = g.ToList().Count,
                QuestionTotal = _questionRepository.Find(q=>q.ChapterId == g.Key).Count(),
            });

            return new Dictionary<string, dynamic>()
            {
                {"Analytic", questionHistory},
            };
        }
    }
}
 