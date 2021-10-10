using AutoMapper;
using Luyenthi.Core.Dtos;
using Luyenthi.Core.Enums.User;
using Luyenthi.Domain.User;
using Luyenthi.HttpApi.Host.Helpers;
using Luyenthi.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.SecurityTokenService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;


namespace Luyenthi.HttpApi.Host
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        private readonly JwtService _jwtService;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IMailService _mailService;
        public AuthController(
            UserManager<ApplicationUser> userManager,
            JwtService jwtService,
            SignInManager<ApplicationUser> signInManager,
            IMapper mapper,
            IMailService mailService
            )
        {
            _userManager = userManager;
            _jwtService = jwtService;
            _signInManager = signInManager;
            _mapper = mapper;
            _mailService = mailService;
        }
        [HttpPost("login")]
        public async Task<UserResponseLogin> Login(UserRequestLogin requestLogin)
        {
            var isEmail = UserHelper.ValidateEmail(requestLogin.UserName);
            string userName = requestLogin.UserName;
            var user = new ApplicationUser();
            if (isEmail)
            {
                // đăng nhập bằng email
                user = await  _userManager.FindByEmailAsync(userName);
                if(user != null)
                {
                    userName = user.UserName;
                }
            }
            else
            {
                user  = await _userManager.FindByNameAsync(userName);
            }
            var processLogin = await _signInManager.PasswordSignInAsync(
                userName, requestLogin.Password, false, lockoutOnFailure: false
                );
            if (!processLogin.Succeeded)
            {
                throw new BadRequestException("Tài khoản hoặc mật khẩu không chính xác");
            }
            // genarate token
            var token = _jwtService.GenarateToken(user);
            var userInfo = _mapper.Map<UserInfoDto>(user);
            userInfo.Roles = (await _userManager.GetRolesAsync(user)).ToList();
            return new UserResponseLogin
            {
                AccessToken = token,
                UserInfo = userInfo
            };
            
        }
        [HttpPost("register")]
        public async Task<UserResponseLogin> Register(UserRequestRegister requestRegister)
        {
            using TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);
            bool isValidateEmail = UserHelper.ValidateEmail(requestRegister.Email);
            if (!isValidateEmail)
            {
                throw new BadRequestException("Thông tin không hợp lệ");
            }
            var accountUser = await _userManager.FindByNameAsync(requestRegister.UserName);
            if (accountUser != null)
            {
                throw new BadRequestException("Tên đăng nhập đã tồn tại");
            }
            var user = _mapper.Map<ApplicationUser>(requestRegister);
            user.CreatedAt = DateTime.Now;
            user.CreatedAt = DateTime.Now;
            user.Provider = "luyenthi";
            var proccessUser = await _userManager.CreateAsync(user, requestRegister.Password);
            if (!proccessUser.Succeeded)
            {
                throw new BadRequestException($"Lỗi tạo người dùng");
            }
            var processRole = await _userManager.AddToRoleAsync(user, Role.Student);
            if (!processRole.Succeeded)
            {
                throw new BadRequestException($"Lỗi cấp quyền người dùng");
            }
            var token = _jwtService.GenarateToken(user);
            var userInfo = _mapper.Map<UserInfoDto>(user);
            var userLoginInfo = new UserLoginInfo("luyenthi", requestRegister.Email, "luyenthi".ToUpperInvariant());
            var loginResult = await _userManager.AddLoginAsync(user, userLoginInfo);
            userInfo.Roles = new List<string> { Role.Student };
            scope.Complete();
            scope.Dispose();
            if (loginResult.Succeeded)
            {
                return new UserResponseLogin
                {
                    AccessToken = token,
                    UserInfo = userInfo,
                };
            }
            else
            {
                throw new BadRequestException($"Lỗi khởi tạo người dùng");
            }

        }
        [HttpPost("login-facebook")]
        public async Task<UserResponseLogin> LoginByFacebook()
        {
            throw new BadRequestException("Thông tin không hợp lệ");
        }
        [HttpPost("login-google")]
        public async Task<UserResponseLogin> LoginByGoogle()
        {
            throw new BadRequestException("Thông tin không hợp lệ");
        }
        [HttpPost("send-mail")]
        public async Task<IActionResult> SendMail(SendMailDto mailRequest)
        {
            try
            {
                await _mailService.SendMailAsync(mailRequest);
                return Ok();
            }
            catch(Exception ex)
            {
                throw;
            }
        }
    }
}
