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

namespace Luyenthi.Services
{
    public class GenerateService
    {
        private readonly TemplateDocumentRepository _templateDocumentRepository;
        private readonly DocumentRepository _documentRepository;
        private readonly TemplateQuestionGenerateRepository _templateQuestionGenerateRepository;
        private readonly QuestionRepository _questionRepository;
        public GenerateService(
            TemplateDocumentRepository templateDocumentRepository,
            TemplateQuestionGenerateRepository templateQuestionGenerateRepository,
            QuestionRepository questionRepository
            )
        {
            _templateDocumentRepository = templateDocumentRepository;
            _templateQuestionGenerateRepository = templateQuestionGenerateRepository;
            _questionRepository = questionRepository;
        }
        
        // generate document
        public Document GenerateDocument(Guid templateId)
        {
            var random = new Random();
            var template = _templateDocumentRepository.FindOne(t => t.Id == templateId)
               .Select(t => new TemplateDocument
               {
                   Id = t.Id,
                   SubjectId = t.SubjectId,
                   TemplateQuestionSets = t.TemplateQuestionSets.Select(qs => new TemplateQuestionSet
                   {
                       Id = qs.Id,
                       OrderNumber = qs.OrderNumber,
                       Name = qs.Name,
                       Content = qs.Content,
                       Show = qs.Show,
                       TemplateDocumentId = t.Id,
                       QuestionGenerates = qs.QuestionGenerates.OrderBy(i => i.OrderNumber).ToList(),
                       Grades = qs.Grades
                   }).OrderBy(i => i.OrderNumber).ToList()
               }).FirstOrDefault();
            if(template == null)
            {
                throw new KeyNotFoundException();
            }
            var document = new Document
            {
                Id = Guid.NewGuid(),
                TemplateDocumentId = template.Id,
                Status = DocumentStatus.Public,
                IsApprove = true,
                QuestionSets = new List<QuestionSet>(),
            };

            List<Guid> questionIds = new List<Guid>();
            foreach(TemplateQuestionSet templateQuestionSet in template.TemplateQuestionSets)
            {
                // tạo ra 1 questionSet
                var questionSet = new QuestionSet
                {
                    Id = Guid.NewGuid(),
                    Name = templateQuestionSet.Content,
                    Show = templateQuestionSet.Show,
                    Questions = new List<Question>(),
                };
                var questions = new List<Question>();
                foreach (TemplateQuestionGenerate questionGenerate in templateQuestionSet.QuestionGenerates)
                {
                    var question = _questionRepository.Find(q => 
                        q.Status == QuestionStatus.Used &&
                        q.SubjectId == template.SubjectId &&
                        templateQuestionSet.Grades.Contains(q.Grade)&&
                        q.NumberQuestion == questionGenerate.NumberQuestion &&
                        q.ParentId == null &&
                        (questionGenerate.GradeId == null || q.GradeId == questionGenerate.GradeId)&&
                        (questionGenerate.ChapterId == null || q.ChapterId == questionGenerate.ChapterId) &&
                        (questionGenerate.UnitId == null || q.UnitId == questionGenerate.UnitId)&&
                        (questionGenerate.LevelQuestionId == null || q.LevelId == questionGenerate.LevelQuestionId)&&
                        !questionIds.Contains(q.Id)
                    )
                    .Include(i => i.Grade)
                    .OrderBy(i => random.Next())
                    .Take(1)
                    .FirstOrDefault();
                    if(question == null)
                    {
                        throw new KeyNotFoundException("Không có dữ liệu");
                    }
                    questions.Add(question);
                    questionIds.Add(question.Id);
                }
                questionSet.Questions = questions;
                document.QuestionSets.Add(questionSet);
            }
            _documentRepository.Add(document);
            return document;
        }
        public Question GenerateQuestion(QuestionGenerateRequest request)
        {
            var random = new Random();
            var question = _questionRepository.Find(q =>
                q.ParentId == null &&
                (request.LevelIds.Count() == 0 ||
                request.LevelIds.Contains((Guid)q.LevelId))&&
                q.SubjectId == request.SubjectId &&
                q.Status == QuestionStatus.Used &&
                (request.UnitId == null || request.UnitId == q.UnitId) &&
                (request.ChapterId == null || request.ChapterId == q.ChapterId)
            )
            .Select(
                q => new Question
                {
                    Id = q.Id,
                    Introduction = q.Introduction,
                    Content = q.Content,
                    SubQuestions = q.SubQuestions.Select(s => new Question
                    {
                        Id = s.Id,
                        Introduction = s.Introduction,
                        Content = s.Content
                    }).ToList()
                }
                )
            .ToList()
            .OrderBy(q => random.Next())
            .FirstOrDefault();
            return question;
        }
        // generate Question

    }
}
