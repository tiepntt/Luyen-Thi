using AutoMapper;
using Luyenthi.Core.Dtos;
using Luyenthi.Core.Enums;
using Luyenthi.Domain;
using Luyenthi.Domain.User;
using Luyenthi.EntityFrameworkCore;
using Luyenthi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.SecurityTokenService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

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
        private readonly QuestionHistoryService _questionHistoryService;
        private readonly IMapper _mapper;
        public ExamController(
            DocumentService documentService,
            DocumentHistoryService historyService,
            QuestionSetService questionSetService,
            QuestionHistoryService questionHistoryService,
            IMapper mapper
            )
        {
            _questionSetService = questionSetService;
            _historyService = historyService;
            _documentService = documentService;
            _questionHistoryService = questionHistoryService;
            _mapper = mapper;
        }
        [HttpGet("{documentId}")]

        public async Task<ExamDto> GetExam(Guid documentId)
        {
            // lấy ra content document
            ApplicationUser user = (ApplicationUser)HttpContext.Items["User"];
            var documentTask= _documentService.GetDetailById(documentId);
            var documentHistoryTask = _historyService.GetDetailByDocumentId(user.Id, documentId);
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
                    DocumentId = documentId,
                };
                _historyService.Create(documentHistory);
            }
            else
            {
                // nếu bài thi đã kết thúc => chấm bài và trả về kết quả
                if(document.DocumentType == DocumentType.Exam && documentHistory.StartTime.AddMinutes(document.Times) < DateTime.Now)
                {
                    await _historyService.CloseHistory(documentHistory, document.Times);
                }
            }
            var result = new ExamDto
            {
                Document = _mapper.Map<DocumentPreviewDto>(document),
                DocumentHistory = _mapper.Map<DocumentHistoryDto>(documentHistory)
            };
            return result;
        }
        [HttpPost("submit")]
        public async Task<DocumentHistoryDto> SubmitExam(SubmitExamRequest request) {
            ApplicationUser user = (ApplicationUser)HttpContext.Items["User"];
            var documentHistory =await _historyService.GetDetailByDocumentId(user.Id, null, request.DocumentHistoryId);
            var document =  _documentService.GetById((Guid)documentHistory.DocumentId);
            if(documentHistory == null)
            {
                throw new KeyNotFoundException("Không tìm thấy bản ghi");
            }
            if(documentHistory.Status != DocumentHistoryStatus.Close)
            {
                await _historyService.CloseHistory(documentHistory,document.Times);
            }
            return _mapper.Map<DocumentHistoryDto>(documentHistory);
        }
        [HttpPost("reset")]
        public async Task<DocumentHistoryDto> ResetDocument(ReseteExamRequest request)
        {
            //
                ApplicationUser user = (ApplicationUser)HttpContext.Items["User"];
                var documentHistoryTask = _historyService.GetDetailByDocumentId(user.Id, request.DocumentId, null, DocumentHistoryStatus.Doing);
                await Task.WhenAll(documentHistoryTask);
                var documentHistory = documentHistoryTask.Result;
                if (documentHistory != null)
                {
                    throw new BadRequestException("Bạn vẫn chưa kết thúc bài thi này");
                }
                documentHistory = new DocumentHistory
                {
                    Id = new Guid(),
                    StartTime = DateTime.Now,
                    Status = DocumentHistoryStatus.Doing,
                    DocumentId = request.DocumentId,
                };
                _historyService.Create(documentHistory);
                return _mapper.Map<DocumentHistoryDto>(documentHistory);
            }
                       
    }
}
