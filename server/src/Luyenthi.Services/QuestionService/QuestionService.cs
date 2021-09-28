using Luyenthi.Domain;
using Luyenthi.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
        // create  question
        public Question Create(Question question)
        {
            _questionRepository.Add(question);
            return question;
        }
        // update question Data
        // remove question
        
        
    }
}
