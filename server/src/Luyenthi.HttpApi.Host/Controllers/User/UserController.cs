using AutoMapper;
using Luyenthi.Core.Dtos;
using Luyenthi.Core.Dtos.User;
using Luyenthi.Core.Enums;
using Luyenthi.Domain.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SendGrid.Helpers.Errors.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

namespace Luyenthi.HttpApi.Host.Controllers.User
{

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : Controller
    {
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        public UserController(
            UserManager<ApplicationUser> userManager,
            IMapper mapper
        ) 
        {
            _userManager = userManager;
            _mapper = mapper;
        }
        [HttpGet]
        [Authorize(roles: Role.Admin)]
        public async Task<PageResultDto<UserInfoDto>> GetAllUser([FromQuery] UserSearchQuery query)
        {
            var userQueryable = query.Role != null ? (await _userManager.GetUsersInRoleAsync(query.Role)).AsQueryable() : _userManager.Users;
            var users = userQueryable.Where(user =>query.Key==null|| 
                                user.UserName.ToUpper().Contains(query.Key.ToUpper()) ||
                                user.Email.ToUpper().Contains(query.Key.ToUpper()) ||
                                user.FirstName.ToUpper().Contains(query.Key.ToUpper()) ||
                                user.LastName.ToUpper().Contains(query.Key.ToUpper())
                                ).OrderByDescending(u => u.CreatedAt).ToList();
            var result = new PageResultDto<UserInfoDto>();
            result.Total = users.Count();
            users= users
                .Skip(query.Skip)
                .Take(query.Take > 20 ? 20 : query.Take).ToList();
            result.Items = new List<UserInfoDto>();
            foreach(ApplicationUser user in users)
            {
                var userInfo = _mapper.Map<UserInfoDto>(user);
                var roles  = await _userManager.GetRolesAsync(user);
                userInfo.Roles = roles.ToList();
                result.Items.Add(userInfo);
            }
            return result;
        }
        [HttpPut("role")]
        public async Task<UserInfoDto> UpdateRoleUser(UserRoleRequest request)
        {
            var user =await _userManager.FindByIdAsync(request.UserId.ToString());
            if(user == null)
            {
                throw new KeyNotFoundException("Không tìm thấy người dùng");
            }
            var _roles = await _userManager.GetRolesAsync(user);
            var roles = request.Roles.Where(role => !_roles.Contains(role)).ToList();
            var rolesRemove = _roles.Where(role => !request.Roles.Contains(role)).ToList();
            var userInfo = _mapper.Map<UserInfoDto>(user);
            if (roles.Count() == 0 && rolesRemove.Count==0)
            {
                return userInfo;  
            }
            await _userManager.AddToRolesAsync(user,roles);
            await _userManager.RemoveFromRolesAsync(user, rolesRemove);
            userInfo.Roles = roles.ToList();
            return userInfo;
        }
        [HttpPost]
        [Authorize(Role.Admin)]
        public async Task<UserInfoDto> CreateAccount(UserCreateRequest request)
        {
            try
            {
                using TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);
                var preUser = await _userManager.FindByNameAsync(request.Username);
                if(preUser != null)
                {
                    throw new BadRequestException("Tên đăng nhập đã được sử dụng");
                }
                if (request.Email != null && request.Email != "")
                {
                     preUser = await _userManager.FindByEmailAsync(request.Email);
                    if(preUser != null )
                    {
                        throw new BadRequestException("Email đã tồn tại");
                    }
                }
                else
                {
                    request.Email = null;
                }

                var user = _mapper.Map<ApplicationUser>(request);
                user.CreatedAt = DateTime.UtcNow;
                user.EmailConfirmed = true;
                var userProccess = await _userManager.CreateAsync(user, request.Password);
                var userResponse = _mapper.Map<UserInfoDto>(user);
                var roleProcess = await _userManager.AddToRolesAsync(user, request.Roles);
                var userInfo = _mapper.Map<UserInfoDto>(user);
                userInfo.Roles = request.Roles;
                scope.Complete();
                scope.Dispose();
                return userInfo;
            }
            catch(Exception e)
            {
                throw new BadRequestException(e.Message);
            }
            
        }

    }
}
