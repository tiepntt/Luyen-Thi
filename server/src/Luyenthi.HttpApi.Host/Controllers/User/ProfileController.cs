﻿using AutoMapper;
using Luyenthi.Core.Dtos;
using Luyenthi.Core.Enums;
using Luyenthi.Domain.User;
using Luyenthi.EntityFrameworkCore;
using Luyenthi.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Luyenthi.HttpApi.Host.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProfileController : Controller
    {
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly UserService _userService;
        private readonly DocumentHistoryService _documentHistorySerevice;
        public ProfileController(
            UserManager<ApplicationUser> userManager,
            UserService userService,
            DocumentHistoryService documentHistoryService,
            IMapper mapper
            )
        {
            _userManager = userManager;
            _userService = userService;
            _mapper = mapper;
            _documentHistorySerevice = documentHistoryService;
        }
        [HttpGet]
        public UserInfoDto GetProfile()
        {
            var user = (ApplicationUser)HttpContext.Items["User"];
            var roles = (List<string>)HttpContext.Items["Roles"];
            var userResponse = _mapper.Map<UserInfoDto>(user);
            userResponse.Roles = roles;
            return userResponse;
        }
        [HttpPut]
        public async Task<UserInfoDto> UpdateProfile(UserUpdateInfoRequest request)
        {
            var user = (ApplicationUser)HttpContext.Items["User"]; 
            var roles = (List<string>)HttpContext.Items["Roles"];
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.AvatarUrl = request.AvatarUrl;
            user.BirthDay = request.BirthDay;
            user.PhoneNumber = request.PhoneNumber;
            await _userManager.UpdateAsync(user);
            var userResponse = _mapper.Map<UserInfoDto>(user);
            userResponse.Roles = roles;
            return userResponse;
        }
        [HttpGet("analytic")]
        public async Task<UserAnalyticResponse> GetAnalytic([FromQuery]UserAnalyticQuery query)
        {
            var user = (ApplicationUser)HttpContext.Items["User"];
            query.UserId = user.Id;
            var result = await _documentHistorySerevice.GetAnalyticUser(query);
            return result;
        }
        [HttpGet("history-analytic")]
        public async Task<List<UserHistoryAnalyticDto>> GetHistoryAnalytic([FromQuery] UserHistoryAnalyticQuery query)
        {
            var user = (ApplicationUser)HttpContext.Items["User"];
            query.UserId = user.Id;
            var result = await _documentHistorySerevice.GetUserHistoryAnalytic(query);
            return result;
        }
    }
}