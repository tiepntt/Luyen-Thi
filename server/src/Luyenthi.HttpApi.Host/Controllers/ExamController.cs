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
    [Authorize]
    public class ExamController : Controller
    {
        private readonly DocumentService _documentService;
        private readonly DocumentHistoryService _historyService;
        private readonly QuestionSetService _questionSetService;
        private readonly IMapper _mapper;
        public ExamController(
            DocumentService documentService,
            DocumentHistoryService historyService,
            QuestionSetService questionSetService,
            IMapper mapper
            )
        {
            _questionSetService = questionSetService;
            _historyService = historyService;
            _documentService = documentService;
            _mapper = mapper;
        }
        [HttpGet("{documentId}")]

        public async Task<ExamDto> GetExam(Guid documentId)
        {
            // lấy ra content document
            ApplicationUser user = (ApplicationUser)HttpContext.Items["User"];
            var documentTask= _documentService.GetDetailById(documentId);
            var documentHistoryTask = _historyService.GetDetailByDocumentId(documentId, user.Id);
            await Task.WhenAll(documentTask, documentHistoryTask);
            var document = documentTask.Result;
            var documentHistory = documentHistoryTask.Result;
            document.QuestionSets = DocumentHelper.MakeIndexQuestions(document.QuestionSets);
            if (document == null)
            {
                throw new KeyNotFoundException("Không tìm thấy đề thi");
            }
            if (documentHistory == null) {
                // nếu chưa có thì tạo
                documentHistory = new DocumentHistory
                {
                    Id = new Guid(),
                    StartTime = DateTime.Now,
                    Status = DocumentHistoryStatus.Doing,
                    DocumentId = documentId
                };
                _historyService.Create(documentHistory);
            }
            else
            {
                // nếu bài thi đã kết thúc => chấm bài và trả về kết quả

            }
            var result = new ExamDto
            {
                Document = _mapper.Map<DocumentPreviewDto>(document),
                DocumentHistory = _mapper.Map<DocumentHistoryDto>(documentHistory)
            };
            return result;
        }
    }
}
