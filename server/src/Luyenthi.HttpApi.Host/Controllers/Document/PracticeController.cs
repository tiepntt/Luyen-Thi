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
        public dynamic GetTemplateInfo(Guid templateId)
        {
           
                // lấy random document đã đc generate và chưa được sử dụng với user
                    // nếu k có, thì tạo ra 1 template
                    var document = _generateService.GenerateDocument(templateId);
            // chạy cron job để sinh thêm, nếu có ít hơn 5 đề
            return document;
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
