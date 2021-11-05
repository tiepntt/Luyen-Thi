using Luyenthi.Core.Dtos;
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
using TimeZoneConverter;

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
            current.TimeDuration = documentHistory.TimeDuration;
            current.Status = documentHistory.Status;
            _documentHistoryRepository.UpdateEntity(current);
            return current;
        }
        public DocumentHistory GetById(Guid id)
        {
            var history = _documentHistoryRepository.Get(id);
            return history;
        }
        public DocumentHistory GetDetailByDocumentId(
            Guid userId, Guid? documentId, Guid? Id = null, DocumentHistoryStatus? status = null)
        {
            var documentHistory = _documentHistoryRepository
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
                    NumberCorrect = h.NumberCorrect,
                    NumberIncorrect = h.NumberIncorrect,
                   
                    QuestionHistories = h.QuestionHistories.Select(q => new QuestionHistory { 
                        Id = q.Id, 
                        QuestionId = q.QuestionId,
                        QuestionSetId = q.QuestionSetId,
                        DocumentHistoryId=h.Id,
                        Answer = q.Answer,
                        AnswerStatus =q.AnswerStatus,
                        
                    }).ToList()
                })
                .FirstOrDefault();
            return documentHistory;
        }
        public DocumentHistory GetExitDocument(Guid userId, Guid? documentId, Guid? Id = null, DocumentHistoryStatus? status = null)
        {
            var documentHistory = _documentHistoryRepository
               .Find(i => i.CreatedBy == userId && (i.DocumentId == documentId || i.Id == Id)
                           && (status == null || status == i.Status))
               .Include(h => h.Document)
               .OrderByDescending(i => i.StartTime)
               .Take(1)
               .FirstOrDefault();
            return documentHistory;
        }
        public void CloseHistory(DocumentHistory documentHistory,int times = 0)
        {
            using TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);
            // kiểm tra đáp án
            documentHistory.EndTime = DateTime.UtcNow <= documentHistory.StartTime.AddMinutes(times) || times == 0  ? DateTime.UtcNow : documentHistory.StartTime.AddMinutes(times);
            documentHistory.Status = DocumentHistoryStatus.Close;
            var questionSets =  _questionSetService.GetByDocumentId((Guid)documentHistory.DocumentId);
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
            documentHistory.NumberIncorrect = questions.Count() - documentHistory.NumberCorrect;
            documentHistory.TimeDuration = (documentHistory.EndTime - documentHistory.StartTime).TotalMinutes;
            Update(documentHistory);
            scope.Complete();
            scope.Dispose();
            documentHistory.QuestionHistories = questionHistories.ToList();
        }
        public async Task<UserAnalyticResponse> GetAnalyticUser(UserAnalyticQuery query)
        {
            var result = new UserAnalyticResponse();
            var documentHistories = await _documentHistoryRepository
                .Find(i => i.Status == DocumentHistoryStatus.Close &&
                     (query.GradeCode == null || i.Document.Grade.Code == query.GradeCode) &&
                     (query.SubjectCode == null || i.Document.Subject.Code == query.SubjectCode) &&
                     (query.UserId == null || i.CreatedBy == query.UserId)
                )
                .GroupBy(i => i.DocumentId)
                .Select(h => new {
                    DocumentId = h.Key,
                    NumberDocument = 1,
                    MaxScore = h.Max(s => (double)(s.NumberCorrect / (s.NumberCorrect + s.NumberIncorrect))),
                    Medium = h.Average(s => s.NumberCorrect / (s.NumberCorrect + s.NumberIncorrect)),
                    TotalTime = h.Sum(s => s.TimeDuration)
                }).ToListAsync();
            result.NumberDocument = documentHistories.Sum(i => i.NumberDocument);
            result.PercentCorrect = Math.Round((double)documentHistories.Average(i => i.Medium) * 100, 2);
            result.TotalTime = documentHistories.Sum(i => i.TotalTime);
            result.Medium = documentHistories.Average(i => i.Medium);
            result.MaxScore = documentHistories.Max(i => Math.Round(i.MaxScore, 2));
            return result;
        }
        public async Task<List<UserHistoryAnalyticDto>> GetUserHistoryAnalytic(UserHistoryAnalyticQuery query)
        {
            var timeAnalytic = DocumentHelper.GetTimeAnalytic(query.Type);
            var timeZoneInfo = TZConvert.GetTimeZoneInfo(query.TimeZone);
            var histories = await _documentHistoryRepository
                .Find(i => (query.UserId == Guid.Empty || i.CreatedBy == query.UserId) &&
                      i.Status == DocumentHistoryStatus.Close &&
                      i.EndTime >= timeAnalytic.StartTime && i.EndTime <= timeAnalytic.EndTime)
                .Select(i => new DocumentHistory
                {
                    Id = i.Id,
                    DocumentId = i.DocumentId,
                    StartTime = i.StartTime,
                    EndTime = i.EndTime,
                    NumberCorrect = i.NumberCorrect,
                    NumberIncorrect = i.NumberIncorrect,
                    TimeDuration = i.TimeDuration
                })
                .ToListAsync();
            var historyAnalytics= histories
                .GroupBy(i => {
                    switch (query.Type)
                    {
                        case UserHistoryAnalyticType.Today:
                            return (int)(DateTime.UtcNow -  i.EndTime).TotalHours;
                        case UserHistoryAnalyticType.InWeek:
                            return (int)(DateTime.UtcNow.Date - i.EndTime.Date).TotalDays;
                        case UserHistoryAnalyticType.InMonth:
                            return (int)(DateTime.UtcNow.Date - i.EndTime.Date).TotalDays;
                        case UserHistoryAnalyticType.InYear:
                            return i.EndTime.Month;
                    };
                    return 1 ;
                })
                .Select(i => new UserHistoryAnalyticDto
                {
                    Key=i.Key,
                    Label = DocumentHelper.GetLabelAnalytic(query.Type, i.Key,timeZoneInfo),
                    MaxScore = Math.Round(i.Max(h => (double)h.NumberCorrect / (h.NumberCorrect + h.NumberIncorrect)*10),2),
                    Total = i.Count(),
                    TimeDuration = i.Sum(h => h.TimeDuration),
                    Medium = Math.Round(i.Average(h => (double)h.NumberCorrect / (h.NumberCorrect + h.NumberIncorrect)) * 10,2),
                    StartDate = i.Min(i => i.EndTime),
                    EndDate = i.Max(i => i.EndTime)
                    
                }).ToList();
            // lấp đầy dữ liệu
            var StartTime = timeAnalytic.EndTime;
            var EndTime = timeAnalytic.EndTime;
            var results = new List<UserHistoryAnalyticDto>();
            while(EndTime >= timeAnalytic.StartTime) {
                var key = 1;
                switch (query.Type)
                {
                    case UserHistoryAnalyticType.Today:
                        key = (int)(DateTime.UtcNow - EndTime).TotalHours;
                        EndTime = EndTime.AddHours(-1);
                        StartTime = EndTime.AddHours(1);
                        break;
                    case UserHistoryAnalyticType.InWeek:
                        key = (int)(DateTime.UtcNow.Date - EndTime.Date).TotalDays;
                        EndTime = EndTime.AddDays(-1);
                        StartTime = EndTime.AddDays(1);
                        break;
                    case UserHistoryAnalyticType.InMonth:
                        key = (int)(DateTime.UtcNow.Date - EndTime.Date).TotalDays;
                        EndTime = EndTime.AddDays(-1);
                        StartTime = EndTime.AddDays(1);
                        break;
                    case UserHistoryAnalyticType.InYear:
                        key = EndTime.Month ;
                        EndTime = EndTime.AddMonths(-1);
                        StartTime = EndTime.AddMonths(1);
                        break;
                };
                var userHistory = historyAnalytics.Find(i => i.Key == key);
                if(userHistory == null)
                {
                    results.Add(new UserHistoryAnalyticDto
                    {
                        Key=key,
                        Label=DocumentHelper.GetLabelAnalytic(query.Type, key,timeZoneInfo),
                        TimeDuration=0,
                        StartDate = EndTime,
                        EndDate = StartTime,
                        Medium=0,
                        MaxScore = 0,
                        Total = 0
                    });
                }
                else
                {
                    results.Add(userHistory);
                }
                StartTime = EndTime;
            }
            
            return results.OrderBy(i => i.StartDate).ToList();
        }
        public bool CheckAllowUpdateHistory(Guid id)
        {
            var history = _documentHistoryRepository.Find(h => h.Id == id)
                .Select(h => new 
                {
                    StartTime =h.StartTime,
                    Endtime = h.EndTime,
                    Status = h.Status,
                    TotalTime = h.Document.Times,
                    Type = h.Document.DocumentType
                }).FirstOrDefault();
            if(history.Status == DocumentHistoryStatus.Close)
            {
                return false;
            }

            if (history.Type == DocumentType.Exam && history.StartTime.AddMinutes(history.TotalTime) <= DateTime.UtcNow)
            {
                return false;
            }
            return true;
        }
        public async Task<List<UserDocumentAnalyticDto>> GetRanks()
        {
            return new List<UserDocumentAnalyticDto>();
        }
        public IQueryable<DocumentHistory> GetRankInDocument(Guid documentId)
        {
            var histories = _documentHistoryRepository.Find(i => i.DocumentId == documentId && i.Status == DocumentHistoryStatus.Close)
                .Include(h => h.User)
                .OrderByDescending(h => h.NumberCorrect)
                .ThenBy(h => h.TimeDuration)
                .ToList()
                .GroupBy(i => i.User)
                .Select(h => new DocumentHistory
                {
                    User = h.Key,
                    NumberCorrect = h.FirstOrDefault().NumberCorrect,
                    CreatedBy=h.Key.Id,
                    TimeDuration = h.FirstOrDefault().TimeDuration
                })
                .AsQueryable();
            return histories;
        }
    }
}
