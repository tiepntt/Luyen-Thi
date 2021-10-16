using Luyenthi.Domain;
using Luyenthi.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Luyenthi.Services
{
    public class QuestionSetService
    {
        private readonly QuestionSetRepository _questionSetRepository;
        private readonly QuestionRepository _questionRepository;
        
        public QuestionSetService(
            QuestionSetRepository questionSetRepository,
            QuestionRepository questionRepository
            )
        {
            _questionSetRepository = questionSetRepository;
            _questionRepository = questionRepository;
        }
        public QuestionSet GetById(Guid Id)
        {
            var questionSet = _questionSetRepository.Get(Id);
            return questionSet;
        }
        public QuestionSet Create(QuestionSet questionSet)
        {
            questionSet.Questions = new List<Question>();
            _questionSetRepository.Add(questionSet);
            return questionSet;
        }
        public QuestionSet Update(QuestionSet questionSet)
        {
            _questionSetRepository.UpdateEntity(questionSet);
            return questionSet;
        }
        public void Remove(QuestionSet questionSet)
        {
            _questionSetRepository.Remove(questionSet);
        }
        public List<QuestionSet> CreateMany(List<QuestionSet> questionSets)
        {
            try
            {
                _questionSetRepository.AddRange(questionSets);
                return questionSets;
            }
            catch(Exception e)
            {
                throw  new Exception(e.Message);
            }
            
        }
        public List<QuestionSet> GetByDocumentId(Guid DocumentId)
        {
            var questionSets =  _questionSetRepository.Find(questionSet => questionSet.DocumentId == DocumentId)
                                            .Include(qs => qs.Document)
                                            .Include(qs => qs.Questions)
                                            .ThenInclude(q => q.SubQuestions).ToList();
            // đánh index cho các question
            // đánh index cho các question
            return questionSets;
        }
        public QuestionSet GetDetail(Guid id)
        {
            var questionSet = _questionSetRepository.Find(questionSet => questionSet.Id == id)
                                            .Include(qs => qs.Document)
                                            .Include(qs => qs.Questions)
                                            .ThenInclude(q => q.SubQuestions).FirstOrDefault();
            // đánh index cho các question
            // đánh index cho các question
            return questionSet;
        }
        public void RemoveByDocumentId(Guid documentId)
        {
            // chỉ sử dụng cho import
            var questionSets = _questionSetRepository.Find(qs => qs.DocumentId == documentId)
                .Include(i => i.Questions)
                .ThenInclude(i=>i.SubQuestions).ToList();
            if(questionSets.Count == 0)
            {
                return;
            }
            var questions = questionSets.SelectMany(i => i.Questions).ToList();
            var subQuestions = questions.SelectMany(i => i.SubQuestions).ToList();
            questions.AddRange(subQuestions);
            _questionRepository.RemoveRange(questions);
            _questionSetRepository.RemoveRange(questionSets);
        }
        public Question AddQuestion(Question question, Guid id)
        {
            var questionSet = _questionSetRepository.Find(i => i.Id==id).Include(i=>i.Questions).FirstOrDefault();
            if(questionSet == null)
            {
                throw new KeyNotFoundException("Không tìm thấy bản ghi");
            }
            questionSet.Questions.Add(question);
            _questionSetRepository.UpdateEntity(questionSet);
            return question;
        }
        
        
        
    }
}
