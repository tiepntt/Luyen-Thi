using AutoMapper;
using Luyenthi.Core.Dtos;
using Luyenthi.Domain;
using Luyenthi.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Luyenthi.HttpApi.Host.Controllers.Matrix
{
    [ApiController]
    [Route("api/[controller]")]
    public class TemplateQuestionController : Controller
    {
        private readonly TemplateQuestionService _templateQuestionService;
        private readonly IMapper _mapper;
        public TemplateQuestionController(
            TemplateQuestionService templateQuestionService,
            IMapper mapper
            )
        {
            _templateQuestionService = templateQuestionService;
            _mapper = mapper;
        }
        [HttpGet("{id}")]
        public TemplateQuestionDetailDto GetById(Guid Id)
        {
            var templateQuestion = _templateQuestionService.GetById(Id);
            return _mapper.Map<TemplateQuestionDetailDto>(templateQuestion);
        }
        [HttpGet("get-in-unit/{id}")]
        public List<TemplateQuestionDetailDto> GetByUnitId(Guid Id)
        {
            var templateQuestions = _templateQuestionService.GetAllByUnitId(Id);
            return _mapper.Map<List<TemplateQuestionDetailDto>>(templateQuestions);
        }
        [HttpPut]
        public TemplateQuestionDto Update(TemplateQuestionDto templateQuestionUpdate)
        {
            var templateQuestion = _mapper.Map<TemplateQuestion>(templateQuestionUpdate);
            templateQuestion = _templateQuestionService.Update(templateQuestion);
            return _mapper.Map<TemplateQuestionDto>(templateQuestion);
        }
        [HttpPost]
        public TemplateQuestionDto Create(TemplateCreateDto templateCreate)
        {
            var templateQuestion = _mapper.Map<TemplateQuestion>(templateCreate);
            templateQuestion = _templateQuestionService.Create(templateQuestion);
            return _mapper.Map<TemplateQuestionDto>(templateQuestion);
        }
        [HttpDelete("{id}")]
        public void Delelte(Guid id)
        {
            _templateQuestionService.RemoveById(id);
        }

    }
}
