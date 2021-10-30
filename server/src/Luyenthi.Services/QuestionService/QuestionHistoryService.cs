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
    public class QuestionHistoryService
    {
        private readonly QuestionHistoryRepository _questionHistoryRepository;
        public QuestionHistoryService(
            QuestionHistoryRepository questionHistoryRepository
            )
        {

            _questionHistoryRepository = questionHistoryRepository;
        }
        public void UpdateMany(List<QuestionHistory> questionHistories)
        {
            _questionHistoryRepository.UpdateMany(questionHistories);
        }
        public async Task<QuestionHistory> CreateOrUpdate(QuestionHistory questionHistory, Guid userId)
        {
           
            if(questionHistory.Id == Guid.Empty)
            {
                questionHistory.Id = new Guid();
                _questionHistoryRepository.Add(questionHistory);
                return questionHistory;
            }
            else
            {
                var history = await _questionHistoryRepository.Find(
                    i => i.Id == questionHistory.Id
                        && i.DocumentHistoryId == questionHistory.DocumentHistoryId
                        && i.CreatedBy == userId).FirstOrDefaultAsync();
                if(history != null)
                {
                    history.Answer = questionHistory.Answer;
                    history.AnswerStatus = questionHistory.AnswerStatus;
                    _questionHistoryRepository.UpdateEntity(history);
                    return history;
                }
            }
            return new QuestionHistory();
        }
    }
}
