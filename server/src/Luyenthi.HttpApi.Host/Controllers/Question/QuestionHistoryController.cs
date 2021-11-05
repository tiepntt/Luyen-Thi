using AutoMapper;
using Luyenthi.Core.Dtos;
using Luyenthi.Domain;
using Luyenthi.Domain.User;
using Luyenthi.Services;
using Microsoft.AspNetCore.Mvc;
using SendGrid.Helpers.Errors.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Luyenthi.HttpApi.Host.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class QuestionHistoryController : Controller
    {
        private readonly QuestionHistoryService _questionHistoryService;
        private readonly DocumentHistoryService _documentHistoryService;
        private readonly IMapper _mapper;
        public QuestionHistoryController(
            QuestionHistoryService questionHistoryService,
            DocumentHistoryService documentHistoryService,
            IMapper mapper
            )
        {
            _questionHistoryService = questionHistoryService;
            _documentHistoryService = documentHistoryService;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<QuestionHistoryDto> SaveQuestionHistory(QuestionHistoryRequestDto request)
        {
            ApplicationUser user = (ApplicationUser)HttpContext.Items["User"];
            var questionHistory = _mapper.Map<QuestionHistory>(request);
            if(request.DocumentHistoryId != null)
            {
                // kiểm tra xem còn thời lượng không
                var canUpdate = _documentHistoryService.CheckAllowUpdateHistory((Guid)request.DocumentHistoryId);
                if (!canUpdate)
                {
                    throw new BadRequestException("Ngoài thời gian nộp bài");
                }
            }
            questionHistory = await _questionHistoryService.CreateOrUpdate(questionHistory,user.Id);
            return _mapper.Map<QuestionHistoryDto>(questionHistory);
        }
    }
}
