using Luyenthi.Core.Enums;
using Luyenthi.Domain;
using Luyenthi.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace Luyenthi.Services
{
    public class DocumentHistoryService
    {
        private readonly DocumentHistoryRepository _documentHistoryRepository;
        private readonly QuestionSetService _questionSetService;
        private readonly QuestionHistoryService _questionHistoryService;
        public DocumentHistoryService(
            DocumentHistoryRepository documentHistoryRepository,
            QuestionSetService questionSetService,
            QuestionHistoryService questionHistoryService
            ) 
        {
            _documentHistoryRepository = documentHistoryRepository;
            _questionSetService = questionSetService;
            _questionHistoryService = questionHistoryService;
        }
        public DocumentHistory Create(DocumentHistory documentHistory)
        {
            _documentHistoryRepository.Add(documentHistory);
            return documentHistory;
        }
        public DocumentHistory Update(DocumentHistory documentHistory)
        {
            var current = _documentHistoryRepository.Get(documentHistory.Id);
            current.NumberCorrect = documentHistory.NumberCorrect;
            current.EndTime = documentHistory.EndTime;
            current.NumberIncorrect = documentHistory.NumberIncorrect;
            current.Status = documentHistory.Status;
            _documentHistoryRepository.UpdateEntity(current);
            return current;
        }
        public DocumentHistory GetById(Guid id)
        {
            var history = _documentHistoryRepository.Get(id);
            return history;
        }
        public async Task<DocumentHistory> GetDetailByDocumentId(
            Guid userId, Guid? documentId, Guid? Id = null, DocumentHistoryStatus? status = null)
        {
            var documentHistory = await _documentHistoryRepository
                .Find(i => i.CreatedBy == userId && (i.DocumentId == documentId || i.Id == Id) 
                            && (status == null ||status == i.Status))
                .OrderByDescending(i => i.StartTime)
                .Take(1)
                .Select(h => new DocumentHistory
                {
                    Id = h.Id,
                    StartTime = h.StartTime,
                    EndTime = h.EndTime,
                    Status = h.Status,
                    DocumentId = h.DocumentId,
                    QuestionHistories = h.QuestionHistories.Select(q => new QuestionHistory { 
                        Id = q.Id, 
                        QuestionId = q.QuestionId,
                        QuestionSetId = q.QuestionSetId,
                        DocumentHistoryId=h.Id,
                        Answer = q.Answer,
                        AnswerStatus =q.AnswerStatus
                    }).ToList()
                })
                .FirstOrDefaultAsync();
            return documentHistory;
        }
        public async Task CloseHistory(DocumentHistory documentHistory,int times = 0)
        {
            using TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);
            // kiểm tra đáp án
            documentHistory.EndTime = DateTime.Now <= documentHistory.StartTime.AddMinutes(times) || times == 0  ? DateTime.Now : documentHistory.StartTime.AddMinutes(times);
            documentHistory.Status = DocumentHistoryStatus.Close;
            var questionSets = await _questionSetService.GetByDocumentId((Guid)documentHistory.DocumentId);
            var questions = questionSets.SelectMany(qs => qs.Questions)
                .SelectMany(q => q.Type == QuestionType.QuestionGroup ? q.SubQuestions : new List<Question> { q });
            var questionHistories = documentHistory.QuestionHistories.Select(qh =>
            {
                var question = questions.FirstOrDefault(i => i.Id == qh.QuestionId);
                qh.AnswerStatus = QuestionHelper.CheckAnswer(question, qh);
                return qh;
            }).ToList();
            _questionHistoryService.UpdateMany(questionHistories);
            documentHistory.NumberCorrect = questionHistories.Count(i => i.AnswerStatus == AnswerStatus.Correct);
            Update(documentHistory);
            scope.Complete();
            scope.Dispose();
            documentHistory.QuestionHistories = questionHistories.ToList();
        }
    }
}
