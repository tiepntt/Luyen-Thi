using AutoMapper;
using Luyenthi.Core.Dtos;
using Luyenthi.Core.Enums;
using Luyenthi.Domain;
using Luyenthi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Luyenthi.HttpApi.Host.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class QuestionSetController : Controller
    {
        private readonly QuestionSetService _questionSetService;
        private readonly QuestionService _questionService;
        private readonly IMapper _mapper;
        public QuestionSetController(
            QuestionSetService questionSetService,
            QuestionService questionService,
            IMapper mapper
            )
        {
            _questionSetService = questionSetService;
            _questionService = questionService;
            _mapper = mapper;
        }
        [HttpGet("in-document/{documentId}")]
        [Authorize(Role.Admin, Role.Teacher)]
        public List<QuestionSetDetailDto> GetQuestionSetByDocumentId(Guid documentId) {
            var questionSets = _questionSetService.GetByDocumentId(documentId);
            questionSets = DocumentHelper.MakeIndexQuestions(questionSets);
            return _mapper.Map<List<QuestionSetDetailDto>>(questionSets);
        }
        [HttpGet("{id}")]
        public QuestionSetDetailDto GetQuestionSetDetail(Guid id)
        {
            var questionSet = _questionSetService.GetDetail(id);
            if(questionSet == null)
            {
                throw new  KeyNotFoundException("Không tìm thấy bản ghi");
            }
            // đánh index
            questionSet = DocumentHelper.MakeIndexQuestionSet(questionSet);
            return _mapper.Map<QuestionSetDetailDto>(questionSet);
        }
        [HttpPost]
        public QuestionSetDetailDto CreateQuestionSet(QuestionSetCreateDto questionSetCreate)
        {
            var questionSet = _mapper.Map<QuestionSet>(questionSetCreate);
            questionSet = _questionSetService.Create(questionSet);
            return _mapper.Map<QuestionSetDetailDto>(questionSet);
        }
        [HttpPost("{questionSetId}/add-question")]
        public QuestionDto AddQuestion(Guid questionSetId, QuestionCreateDto questionCreate)
        {
            var question = _mapper.Map<Question>(questionCreate);
            question = _questionSetService.AddQuestion(question, questionSetId);
            return _mapper.Map<QuestionDto>(question);
        }
        [HttpDelete("{questionSetId}/remove-question/{questionId}")]
        public void RemoveQuestion(Guid questionSetId, Guid questionId)
        {
            var questionSet = _questionSetService.GetById(questionSetId);
            if(questionSet == null)
            {
                throw  new KeyNotFoundException("Không tìm thấy bộ câu");
            }
            var question = _questionService.GetInQuestionSet(questionId, questionSet);
            if (question == null)
            {
                throw new KeyNotFoundException("Không tìm thấy câu hỏi");
            }
                // remove Question Set
                question.QuestionSets.Remove(questionSet);
                _questionService.Update(question);
        }
        [HttpPut]
        public QuestionSetDetailDto Update(QuestionSetUpdateDto questionSetUpdate)
        {
            var questionSet = _questionSetService.GetDetail(questionSetUpdate.Id);
            if(questionSet == null)
            {
                throw new KeyNotFoundException("Không tìm thấy bản ghi");
            }
            questionSet.Name = questionSetUpdate.Name;
            questionSet.Show = questionSetUpdate.Show;
            questionSet = _questionSetService.Update(questionSet);
            return _mapper.Map<QuestionSetDetailDto>(questionSet);
        }
        [HttpDelete("{id}")]
        public void Remove(Guid id)
        {
            var questionSet = _questionSetService.GetById(id);
            var questions = _questionService.GetInQuestionSet(questionSet);
            if (questionSet == null)
            {
                throw new KeyNotFoundException("Không tìm thấy bản ghi");
            }
            var questionRemoves = questions.Where(question =>question.QuestionSets.Count == 1).ToList();
            _questionService.Remove(questions);
            _questionSetService.Remove(questionSet);
        }
        
    }
}
