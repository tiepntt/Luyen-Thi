using Luyenthi.Domain;
using Luyenthi.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Services
{
    public class DocumentHistoryService
    {
        private readonly DocumentHistoryRepository _documentHistoryRepository;
        public DocumentHistoryService(
            DocumentHistoryRepository documentHistoryRepository
            ) 
        {
            _documentHistoryRepository = documentHistoryRepository;
        }
        public DocumentHistory Create(DocumentHistory documentHistory)
        {
            _documentHistoryRepository.Add(documentHistory);
            return documentHistory;
        }
        public DocumentHistory Update()
        {
            return new DocumentHistory();
        }
        public DocumentHistory GetById()
        {
            return new DocumentHistory();
        }
        public async Task<DocumentHistory> GetDetailByDocumentId(Guid documentId, Guid userId)
        {
            var documentHistory = await _documentHistoryRepository.Find(i => i.CreatedBy == userId)
                .OrderByDescending(i => i.StartTime)
                .Take(1)
                .Select(h => new DocumentHistory
                {
                    Id = h.Id,
                    StartTime = h.StartTime,
                    EndTime = h.EndTime,
                    Status = h.Status,
                    DocumentId = documentId,
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
    }
}
