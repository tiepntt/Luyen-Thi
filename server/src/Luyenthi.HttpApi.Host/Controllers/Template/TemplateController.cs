using AutoMapper;
using Luyenthi.Core.Dtos;
using Luyenthi.Domain;
using Luyenthi.EntityFrameworkCore;
using Luyenthi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Luyenthi.HttpApi.Host.Controllers.Matrix
{
    [ApiController]
    [Route("api/[controller]")]
    public class TemplateController : Controller
    {
        private readonly TemplateQuestionGenerateRepository _templateQuestionGenerateRepository;
        private readonly TemplateDocumentRepository _templateDocumentRepository;
        private readonly TemplateQuestionSetRepository _templateQuestionSetRepository;
        private readonly GradeRepository _gradeRepository;
        private readonly IMapper _mapper;
        public TemplateController(
            TemplateDocumentRepository templateDocumentRepository,
            TemplateQuestionSetRepository templateQuestionSetRepository,
            TemplateQuestionGenerateRepository templateQuestionGenerateRepository,
            GradeRepository gradeRepository,
            IMapper mapper
            )
        {
            _templateDocumentRepository = templateDocumentRepository;
            _templateQuestionSetRepository = templateQuestionSetRepository;
            _templateQuestionGenerateRepository = templateQuestionGenerateRepository;
            _gradeRepository = gradeRepository;
            _mapper = mapper;
        }
        // lấy bởi
        [HttpGet("{id}")]
        public TemplateDocumentDto GetById(Guid id)
        {
            var template = _templateDocumentRepository.FindOne(t => t.Id == id)
                .Select(t => new TemplateDocument
                {
                    Id = t.Id,
                    SubjectId = t.SubjectId,
                    NumberQuestion=t.NumberQuestion,
                    Times = t.Times,
                    TemplateQuestionSets = t.TemplateQuestionSets.Select(qs => new TemplateQuestionSet
                    {
                        Id = qs.Id,
                        OrderNumber = qs.OrderNumber,
                        Name = qs.Name,
                        Content=qs.Content,
                        Show = qs.Show,
                        TemplateDocumentId = t.Id,
                        QuestionGenerates = qs.QuestionGenerates.OrderBy(i => i.OrderNumber).ToList(),
                        Grades = qs.Grades
                    }).OrderBy(i => i.OrderNumber).ToList()
                }).FirstOrDefault();
            if (template == null)
            {
                throw new KeyNotFoundException();
            }
            return _mapper.Map<TemplateDocumentDto>(template);
        }
        [HttpPut]
        public TemplateDocumentDto Update(TemplateDocumentGenerateDto templateDocument)
        {
            var template = _templateDocumentRepository.Get(templateDocument.Id);
            
                
            if (template == null)
            {
                throw new KeyNotFoundException();
            }
            template.NumberQuestion = templateDocument.NumberQuestion;
            template.Times = templateDocument.Times;
            _templateDocumentRepository.UpdateEntity(template);
            return _mapper.Map<TemplateDocumentDto>(template);
        }
        [HttpPost("{subjectId}")]
        public TemplateDocumentDto Create(Guid subjectId)
        {
            var template = new TemplateDocument
            {
                Id = Guid.NewGuid(),
                SubjectId = subjectId,
                Times=60
            };
            _templateDocumentRepository.Add(template);
            return _mapper.Map<TemplateDocumentDto>(template);
        }
        [HttpDelete("{id}")]
        public void Remove(Guid id)
        {
            _templateDocumentRepository.RemoveById(id);
        }
        [HttpPost("question-set")]
        public TemplateQuestionSetDto AddQuestionSet(TemplateQuestionSetCreateRequest request)
        {
            var grades = _gradeRepository.GetAll().ToList();
            var lastQuestionSet = _templateQuestionSetRepository.GetAll().OrderByDescending(i => i.OrderNumber).Take(1).ToList();
            double OrderNumber = 1;
            if (lastQuestionSet.Count() == 1)
            {
                OrderNumber = lastQuestionSet.FirstOrDefault().OrderNumber + 1;
            }
            var templateQuestionSet = new TemplateQuestionSet
            {
                Id = Guid.NewGuid(),
                TemplateDocumentId = request.TemplateDocumentId,
                Show = request.Show,
                Grades = grades,
                OrderNumber = OrderNumber,
                Content = request.Content
            };
            _templateQuestionSetRepository.Add(templateQuestionSet);
            return _mapper.Map<TemplateQuestionSetDto>(templateQuestionSet);
        }
        [HttpPut("question-set")]
        public TemplateQuestionSetDto UpdateQuestionSet(TemplateQuestionSetUpdateRequest request)
        {
            var templateQuestionSet = _templateQuestionSetRepository.Get(request.Id);
            if (templateQuestionSet == null)
            {
                throw new KeyNotFoundException();
            }
            templateQuestionSet.Name = request.Name;
            templateQuestionSet.Show = request.Show;
            templateQuestionSet.Content = request.Content;
            _templateQuestionSetRepository.UpdateEntity(templateQuestionSet);
            return _mapper.Map<TemplateQuestionSetDto>(templateQuestionSet);
        }
        [HttpPatch("question-set/change-grades")]
        public void ChangeGrades(TemplateQuestionSetChangeGradeRequest request)
        {
            var grades = _gradeRepository.Find(i => request.GradeIds.Contains(i.Id)).ToList();
            var questionSet = _templateQuestionSetRepository.FindOne(i => i.Id == request.Id).Include(q => q.Grades).FirstOrDefault();
            questionSet.Grades = grades;
            _templateQuestionSetRepository.UpdateEntity(questionSet);
        }
        [HttpDelete("question-set/{id}")]
        public void RemoveQuestionSet(Guid id)
        {
            _templateQuestionSetRepository.RemoveById(id);
        }
        [HttpPost("question-generate/{templateQuestionSetId}")]
        public TemplateQuestionGenerateDto AddTemplateQuestion(Guid templateQuestionSetId)
        {
            double orderNumber = 1;
            var lastQuestion = _templateQuestionGenerateRepository
                .Find(i => i.TemplateQuestionSetId == templateQuestionSetId)
                .OrderByDescending(i => i.OrderNumber)
                .Take(1)
                .ToList();
            if(lastQuestion.Count() == 1)
            {
                orderNumber = lastQuestion.First().OrderNumber + 1;
            }

            var question = new TemplateQuestionGenerate
            {
                Id = Guid.NewGuid(),
                TemplateQuestionSetId = templateQuestionSetId,
                OrderNumber = orderNumber,
                NumberQuestion = 1,
            };
            _templateQuestionGenerateRepository.Add(question);
            
            return _mapper.Map<TemplateQuestionGenerateDto>(question);
        }
        [HttpPut("question-generate")]
        public TemplateQuestionGenerateDto UpdateTemplateQuestion(TemplateQuestionGenerateDto request)
        {
            var questionGenerate = _templateQuestionGenerateRepository.Get(request.Id);
            if(questionGenerate == null)
            {
                throw new KeyNotFoundException();
            }
            questionGenerate.GradeId = request.GradeId;
            questionGenerate.LevelQuestionId = request.LevelQuestionId;
            questionGenerate.NumberQuestion = request.NumberQuestion;
            questionGenerate.UnitId = request.UnitId;
            questionGenerate.ChapterId = request.ChapterId;
            _templateQuestionGenerateRepository.UpdateEntity(questionGenerate);
            return _mapper.Map<TemplateQuestionGenerateDto>(questionGenerate);
        }
        [HttpDelete("question-generate/{id}")]
        public void RemoveTempleQuestion(Guid id)
        {
            _templateQuestionGenerateRepository.RemoveById(id);
        }


    }
}
