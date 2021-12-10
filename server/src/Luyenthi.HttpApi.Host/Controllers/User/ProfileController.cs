using AutoMapper;
using Luyenthi.Core.Dtos;
using Luyenthi.Core.Enums;
using Luyenthi.Domain.User;
using Luyenthi.EntityFrameworkCore;
using Luyenthi.Services;
using Luyenthi.Services.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
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
            user.Gender = request.Gender;
            await _userManager.UpdateAsync(user);
            var userResponse = _mapper.Map<UserInfoDto>(user);
            userResponse.Roles = roles;
            return userResponse;
        }
        [HttpPut("change-avatar")]
        public async Task<UserInfoDto> ChangeAvatar(IFormCollection formData)
        {
            var user = (ApplicationUser)HttpContext.Items["User"];
            var roles = (List<string>)HttpContext.Items["Roles"];
            var file = formData.Files.FirstOrDefault();
            var fileResult = new FileDto { };
            var cloundinaryService = CloudinarySerivce.GetService();
            if (file == null)
            {
                throw new KeyNotFoundException("Không có file nào được chọn");
            }
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                var fileBytes = ms.ToArray();
                var imageResult = await CloudinarySerivce.UploadImage(cloundinaryService, fileBytes, CloudinarySetting.FolderUser, user.Id.ToString());
                fileResult.Path = imageResult.SecureUrl.AbsoluteUri;
            }
            user.AvatarUrl = fileResult.Path;
            await _userManager.UpdateAsync(user);
            var userResponse = _mapper.Map<UserInfoDto>(user);
            userResponse.Roles = roles;
            return userResponse;
        }
        [HttpGet("analytic")]
        public UserAnalyticResponse GetAnalytic([FromQuery] UserAnalyticQuery query)
        {
            var user = (ApplicationUser)HttpContext.Items["User"];
            query.UserId = user.Id;
            var result = _documentHistorySerevice.GetAnalyticUser(query);
            return result;
        }
        [HttpGet("history-analytic")]
        public List<UserHistoryAnalyticDto> GetHistoryAnalytic([FromQuery] UserHistoryAnalyticQuery query)
        {
            var user = (ApplicationUser)HttpContext.Items["User"];
            query.UserId = user.Id;
            var result = _documentHistorySerevice.GetUserHistoryAnalytic(query);
            return result;
        }
        [HttpGet("analytic-by-grade/{userId}")]
        public List<UserAnalyticByGradeDto> GetAnalyticByGrade(Guid userId,[FromQuery] AnalyticByGradeQuery query)
        {
            // 

            return null;
        }
    }
}
