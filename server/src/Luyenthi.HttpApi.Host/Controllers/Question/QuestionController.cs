using AutoMapper;
using Luyenthi.Core;
using Luyenthi.Core.Dtos;
using Luyenthi.Core.Dtos.GoogleDoc;
using Luyenthi.Domain;
using Luyenthi.Services;
using Luyenthi.Services.GoolgeAPI;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Luyenthi.HttpApi.Host.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : Controller
    {
        private readonly FileService _fileService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly QuestionService _questionService;
        private readonly IMapper _mapper;
        public QuestionController(
            FileService fileService, 
            IWebHostEnvironment hostEnvironment,
            QuestionService questionService,
            IMapper mapper
            )
        {
            _fileService = fileService;
            _hostingEnvironment = hostEnvironment;
            _questionService = questionService;
            _mapper = mapper;
        }
        [HttpPost]
        public QuestionDto CreateQuestion(QuestionCreateDto questionCreate)
        {
            var question = _mapper.Map<Question>(questionCreate);
            question = _questionService.Create(question);
            return _mapper.Map<QuestionDto>(question);
        }
        [HttpGet("{questionId}")]
        public QuestionDto GetQuestion(Guid questionId)
        {
            var question = _questionService.GetQuestion(questionId);
            return _mapper.Map<QuestionDto>(question);
        }
    }
}
