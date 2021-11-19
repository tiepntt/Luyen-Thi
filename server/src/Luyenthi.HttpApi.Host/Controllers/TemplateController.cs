using AutoMapper;
using Luyenthi.Core.Dtos;
using Luyenthi.Domain;
using Luyenthi.EntityFrameworkCore;
using Luyenthi.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

namespace Luyenthi.HttpApi.Host.Controllers
{
    [Route("api/[controller]")]

    [ApiController]
    public class TemplateController : Controller
    {
        private readonly TemplateDocumentService _templateDocumentService;
        private readonly TemplateQuestionSetRepository _templateQuestionSetRepository;
        private readonly IMapper _mapper;
        public TemplateController(
            TemplateDocumentService templateDocumentService,
            TemplateQuestionSetRepository templateQuestionSetRepository,
            IMapper mapper)
        {
            _templateDocumentService = templateDocumentService;
            _templateQuestionSetRepository = templateQuestionSetRepository;
            _mapper = mapper;
        }
        [HttpGet("{gradeId}/{subjectId}")]
        public TemplateDocumentDto GetTemplate(Guid gradeId, Guid subjectId)
        {
            var template = _templateDocumentService.GetTemplate(gradeId, subjectId);
            using TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);
            if (template == null)
            {
                template = new TemplateDocument
                {
                    Id = Guid.NewGuid(),
                    GradeId = gradeId,
                    SubjectId = subjectId
                };
                template = _templateDocumentService.Create(template);
            }
            scope.Complete();
            scope.Dispose();
            // nếu chưa có thì tạo ra

            return _mapper.Map<TemplateDocumentDto>(template);
        }
        [HttpPost("{templateId}/question-set")]
        public TemplateQuestionSetDto AddQuestion(Guid templateId)
        {
            var template = _templateDocumentService.GetById(templateId);
            if(template == null)
            {
                throw new KeyNotFoundException();
            }

            var newQuestionSetTemplate = new TemplateQuestionSet
            {
                Id = Guid.NewGuid(),
                Name = "",
                Show = template.TemplateQuestionSets.Count() > 0,
                TemplateDocumentId=template.Id
            };
            _templateQuestionSetRepository.Add(newQuestionSetTemplate);
            
            return _mapper.Map<TemplateQuestionSetDto>(newQuestionSetTemplate);
        }
        
    }
}
