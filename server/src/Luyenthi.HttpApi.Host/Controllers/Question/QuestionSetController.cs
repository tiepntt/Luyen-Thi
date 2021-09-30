using AutoMapper;
using Luyenthi.Core.Dtos;
using Luyenthi.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Luyenthi.HttpApi.Host.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionSetController : Controller
    {
        private readonly QuestionSetService _questionSetService;
        private readonly IMapper _mapper;
        public QuestionSetController(
            QuestionSetService questionSetService,
            IMapper mapper
            )
        {
            _questionSetService = questionSetService;
            _mapper = mapper;
        }
        [HttpGet("in-document/{documentId}")]
        public List<QuestionSetDetailDto> GetQuestionSetByDocumentId(Guid documentId) {
            var questionSets = _questionSetService.GetByDocumentId(documentId);
            return _mapper.Map<List<QuestionSetDetailDto>>(questionSets);
        }
    }
}
