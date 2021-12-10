using AutoMapper;
using Luyenthi.Core.Dtos;
using Luyenthi.Core.Enums;
using Luyenthi.Domain;
using Luyenthi.Domain.User;
using Luyenthi.EntityFrameworkCore;
using Luyenthi.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Luyenthi.HttpApi.Host.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PracticeController : Controller
    {
        private readonly GenerateService _generateService;
        private readonly DocumentRepository _documentRepository;
        private readonly DocumentHistoryRepository _documentHistoryRepository;
        private readonly TemplateDocumentRepository _templateDocumentRepository;
        private readonly IMapper _mapper;
        
        public PracticeController(
            GenerateService generateService,
            DocumentRepository documentRepository,
            DocumentHistoryRepository documentHistoryRepository,
            TemplateDocumentRepository templateDocumentRepository,
            IMapper mapper
            )
        {
            _generateService = generateService;
            _documentRepository = documentRepository;
            _templateDocumentRepository = templateDocumentRepository;
            _documentHistoryRepository = documentHistoryRepository;
            _mapper = mapper;
        }
        [HttpGet("/{templateId}")]
        public TemplateDocumentGenerateDto GetTemplateInfo(Guid TemplateId)
        {
            ApplicationUser user = (ApplicationUser)HttpContext.Items["User"];
            var result = new TemplateDocumentGenerateDto();
            // trả về documentId chưa hoàn thành hoặc tạo mới
            var template = _templateDocumentRepository.Get(TemplateId);
          
            if (template == null)
            {
                throw new KeyNotFoundException();
            }
            result.NumberQuestion = template.NumberQuestion;
            result.SubjectId = template.SubjectId;
            result.Time = template.Times;
            result.NumberQuestion = template.NumberQuestion;
            result.Id = template.Id;
            var history = _documentHistoryRepository
                .FindOne(h => 
                h.CreatedBy == user.Id &&
                h.Status != DocumentHistoryStatus.Close 
                && h.Document.TemplateDocumentId == TemplateId)
                .OrderByDescending(q => q.CreatedAt)
                .Take(1)
                .Select(h => new DocumentHistory
                {
                    DocumentId = h.DocumentId,
                    Status = h.Status,
                })
                .FirstOrDefault();
            if(history != null)
            {
                result.DocumentId = history.DocumentId;
                result.Status = history.Status;
            }
            else
            {
                // lấy random document đã đc generate và chưa được sử dụng với user
                var document = _documentRepository.Find(d =>
                        d.TemplateDocumentId == TemplateId &&
                        !(d.DocumentHistories.Where(i => i.CreatedBy == user.Id).ToList().Count == 0)&&
                        d.CreatedAt > template.CreatedAt
                    )
                    .FirstOrDefault();
                if(document == null)
                {
                    // nếu k có, thì tạo ra 1 template
                    document = _generateService.GenerateDocument(TemplateId);
                    // chạy cron job để sinh thêm, nếu có ít hơn 5 đề
                }
            }
            return null;
        }
        [HttpPost("generate-question")]
        public QuestionDto GetQuestion(QuestionGenerateRequest request)
        {
            // lấy về question theo ma trận đã định hình
            var question = _generateService.GenerateQuestion(request);
            return _mapper.Map<QuestionDto>(question);
        }

    }
}
