using Luyenthi.Domain;
using Luyenthi.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Luyenthi.Services
{
    public class QuestionService
    {
        private readonly QuestionRepository _questionRepository;
        public QuestionService(
            QuestionRepository questionRepository
           )
        {
            _questionRepository = questionRepository;

        }
        // getById
        public Question GetById(Guid Id)
        {
            var question = _questionRepository.Get(Id);
            return question;
        }
        public Question GetQuestion(Guid Id)
        {
            var question = _questionRepository.Find(q => q.Id == Id)
                .Include(q => q.SubQuestions)
                .FirstOrDefault();
            return question;
        }
        // create  question
        public Question Create(Question question)
        {
            _questionRepository.Add(question);
            return question;
        }
        public List<Question> CreateMany(List<Question> questions)
        {
            _questionRepository.AddRange(questions);
            return questions;
        }
        public Question GetInQuestionSet(Guid Id, QuestionSet questionSet)
        {
            var question = _questionRepository.Find(i => i.Id == Id && i.QuestionSets.Contains(questionSet)).Include(i => i.QuestionSets)
                .FirstOrDefault();
            return question;
        }
        public List<Question> GetInQuestionSet(QuestionSet questionSet)
        {
            var questions = _questionRepository.Find(i => i.QuestionSets.Contains(questionSet)).Include(i => i.QuestionSets)
                .ToList();
            return questions;
        }
        // update question Data
        public Question Update(Question question)
        {
            _questionRepository.UpdateEntity(question);
            return question;
        }
        
        // remove question
        public void Remove(Question question)
        {
            _questionRepository.Remove(question);
        }
        public void Remove(List<Question> questions)
        {
            _questionRepository.RemoveRange(questions);
        }

    }
}
