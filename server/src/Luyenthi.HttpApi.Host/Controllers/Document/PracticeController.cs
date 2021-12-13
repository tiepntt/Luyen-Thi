using AutoMapper;
using Hangfire;
using Luyenthi.Core.Dtos;
using Luyenthi.Core.Enums;
using Luyenthi.Domain;
using Luyenthi.Domain.User;
using Luyenthi.EntityFrameworkCore;
using Luyenthi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Luyenthi.HttpApi.Host.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PracticeController : Controller
    {
        private readonly GenerateService _generateService;
        private readonly DocumentRepository _documentRepository;
        private readonly DocumentHistoryRepository _documentHistoryRepository;
        private readonly TemplateDocumentRepository _templateDocumentRepository;
        private readonly QuestionHistoryRepository _questionHistoryRepository;
        private readonly QuestionRepository _questionRepository;
        private readonly IMapper _mapper;
        
        public PracticeController(
            GenerateService generateService,
            DocumentRepository documentRepository,
            DocumentHistoryRepository documentHistoryRepository,
            TemplateDocumentRepository templateDocumentRepository,
            QuestionHistoryRepository questionHistoryRepository,
            QuestionRepository questionRepository,
            IMapper mapper
            )
        {
            _generateService = generateService;
            _documentRepository = documentRepository;
            _templateDocumentRepository = templateDocumentRepository;
            _documentHistoryRepository = documentHistoryRepository;
            _questionHistoryRepository = questionHistoryRepository;
            _questionRepository = questionRepository;
            _mapper = mapper;
        }
        [HttpGet("{templateId}")]
        public dynamic GetTemplateInfo(Guid templateId)
        {
            ApplicationUser user = (ApplicationUser)HttpContext.Items["User"];
            // lấy random document đã đc generate và chưa được sử dụng với user
            // nếu k có, thì tạo ra 1 template

            var documents = _documentRepository.Find
                (i => i.TemplateDocumentId == templateId &&
                    (i.DocumentHistories.Where(h => h.CreatedBy == user.Id).Count() == 0|| i.DocumentHistories.Where(h => h.CreatedBy == user.Id && h.Status == DocumentHistoryStatus.Doing).Count() != 0))
                .Take(3);
            var template = _templateDocumentRepository.Get(templateId);
            // xem kết quả cao nhất
            if (template == null)
            {
                throw new KeyNotFoundException("không tìm thấy bản ghi");
            }
            var result = new TemplateInfoDto
            {
                Id = template.Id,
                SubjectId = template.SubjectId,
                NumberQuestion = template.NumberQuestion,
                Times = template.Times
            };
            if (documents.Count() == 0)
            {
                BackgroundJob.Enqueue(() => _generateService.GenerateDocument(templateId));
            }
            else
            {
                result.DocumentId = documents.FirstOrDefault().Id;
                if (documents.Count() < 3) {
                    BackgroundJob.Enqueue(() => _generateService.GenerateDocument(templateId));
                }
            };
           
            // chạy cron job để sinh thêm, nếu có ít hơn 5 đề
            return result;
        }
        [HttpPost("generate-question")]
        public QuestionDto GetQuestion(QuestionGenerateRequest request)
        {
            // lấy về question theo ma trận đã định hình
            var question = _generateService.GenerateQuestion(request);
            if (question != null)
            {
                question = QuestionHelper.MakeIndex(question);
            }
            
            return _mapper.Map<QuestionDto>(question);
        }
        [HttpPost("generate-document/{templateId}")]
        public DocumentDto GenertateDocument(Guid templateId)
        {
            // lấy về question theo ma trận đã định hình
            var document = _generateService.GenerateDocument(templateId);

            return _mapper.Map<DocumentDto>(document);
        }
        [HttpPost("checkAnswer")]
        public List<QuestionHistoryDto> CheckAnswerQuestion(List<QuestionHistoryDto> questionHistories)
        {
            var ids = questionHistories.Select(i => i.Id);
            var histories = _questionHistoryRepository.Find(i => ids.Contains(i.Id)).Include(qh => qh.Question).ToList();
            foreach(QuestionHistory questionHistory in histories)
            {
                questionHistory.AnswerStatus = QuestionHelper.CheckAnswer(questionHistory.Question, questionHistory);
            }
            _questionHistoryRepository.UpdateMany(histories);
            return _mapper.Map<List<QuestionHistoryDto>>(histories);
        }
        [HttpGet("solves/{questionId}")]
        public QuestionDto GetSolveQuestions(Guid questionId)
        {

            var question = _questionRepository.FindOne(i => i.Id == questionId)
                .Select(q => new Question
                {
                    Id = q.Id,
                    Introduction = q.Introduction,
                    Content = q.Content,
                    Type = q.Type,
                    Solve = q.Solve,
                    CorrectAnswer = q.CorrectAnswer,
                    NumberQuestion = q.NumberQuestion,
                    SubQuestions = q.SubQuestions.Select(s => new Question
                    {
                        Id = s.Id,
                        Introduction = s.Introduction,
                        Content = s.Content,
                        Solve = s.Solve,
                        CorrectAnswer = s.CorrectAnswer
                    }).ToList()
                }
                ).FirstOrDefault();
            question = QuestionHelper.MakeIndex(question);
            return _mapper.Map<QuestionDto>(question);
        }


    }
}
