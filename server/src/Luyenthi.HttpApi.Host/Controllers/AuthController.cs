using AutoMapper;
using Luyenthi.Core.Dtos;
using Luyenthi.Core.Enums;
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
using System.Security.Cryptography;
using System.Text;
using Hangfire;
using Luyenthi.Core.Dtos.User;
using Google.Apis.Auth;
using System.Net.Http;

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
                user = await _userManager.FindByEmailAsync(userName);
                if (user != null)
                {
                    userName = user.UserName;
                }
            }
            else
            {
                user = await _userManager.FindByNameAsync(userName);
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
            accountUser = await _userManager.FindByLoginAsync("luyenthi", requestRegister.Email);
            if (accountUser != null)
            {
                throw new BadRequestException("Email đã được sử dụng");
            }
            var user = _mapper.Map<ApplicationUser>(requestRegister);

            user.CreatedAt = DateTime.Now;
            user.CreatedAt = DateTime.Now;
            user.Provider = "luyenthi";

            string activeCode = MutationService.GenerateActiveCode();
            user.ActiveCode = HashingService.Md5Encrypt(activeCode);

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
                var mailRequest = MailForm.FormActiveEmail(user, activeCode);
                BackgroundJob.Enqueue(() => _mailService.SendMail(mailRequest));
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
        public async Task<UserResponseLogin> LoginByFacebook(ProviderLoginRequest request)
        {
            var userFacebook = await VerifyFacebookTokenAsync(request.IdToken);
            if (userFacebook == null)
            {
                throw new BadRequestException("Thông tin không hợp lệ");
            }
            return await UserResponseLoginProvider(userFacebook);
        }
        private async Task<ApplicationUser> VerifyFacebookTokenAsync(string token)
        {
            var user = new ApplicationUser();
            var client = new HttpClient();

            var verifyTokenEndPoint = string.Format("https://graph.facebook.com/me?access_token={0}&fields=first_name,last_name,email,picture", token);

            var uri = new Uri(verifyTokenEndPoint);
            var response = await client.GetAsync(uri);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var userObj = (Newtonsoft.Json.Linq.JObject)Newtonsoft.Json.JsonConvert.DeserializeObject(content);

                if (userObj != null)
                {
                    //token is from our App
                    user.Email = (string)userObj["email"];
                    user.UserName = (string)userObj["email"];
                    user.FirstName = (string)userObj["first_name"];
                    user.LastName = (string)userObj["last_name"];
                }

                return user;
            }
            return user;
        }

        [HttpPost("login-google")]
        public async Task<UserResponseLogin> LoginByGoogle(ProviderLoginRequest request)
        {
            var user = new ApplicationUser();
            GoogleJsonWebSignature.Payload payload;
            var clientId = "1031836054677-q8fg2l94a2hvpjjgplp163f4svp3qjgc.apps.googleusercontent.com";
            try
            {
                payload = await GoogleJsonWebSignature.ValidateAsync(request.IdToken, new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new[] { clientId }
                });
            }
            catch
            {
                throw new BadRequestException("Thông tin không hợp lệ");
            }
            var requestRegister = new ApplicationUser()
            {
                Email = payload.Email,
                UserName = payload.Email,
                FirstName = payload.Name,
            };
            return await UserResponseLoginProvider(requestRegister);
        }
        private async Task<UserResponseLogin> UserResponseLoginProvider(ApplicationUser requestRegister)
        {
            var isEmail = UserHelper.ValidateEmail(requestRegister.Email);
            if (!isEmail) throw new BadRequestException("Thông tin không hợp lệ");

            var user = new ApplicationUser();
            user = await _userManager.FindByEmailAsync(requestRegister.Email);
            if (user == null)
            {

                requestRegister.CreatedAt = DateTime.Now;
                requestRegister.Provider = "luyenthi";
                var proccessUser = await _userManager.CreateAsync(user);
                if (!proccessUser.Succeeded)
                {
                    throw new BadRequestException($"Lỗi tạo người dùng");
                }
                var processRole = await _userManager.AddToRoleAsync(user, Role.Student);
                if (!processRole.Succeeded)
                {
                    throw new BadRequestException($"Lỗi cấp quyền người dùng");
                }
                user = requestRegister;
                var userLoginInfo = new UserLoginInfo("luyenthi", requestRegister.Email, "luyenthi".ToUpperInvariant());
                var loginResult = await _userManager.AddLoginAsync(user, userLoginInfo);
                if (!loginResult.Succeeded)
                {
                    throw new BadRequestException($"Lỗi khởi tạo người dùng");
                }
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
        [Authorize]
        [HttpPut("resend-active-code")]
        public async Task<IActionResult> SendMail()
        {
            try
            {
                var user = (ApplicationUser)HttpContext.Items["User"];
                var userAccount = await _userManager.FindByNameAsync(user.UserName);
                if (userAccount == null)
                {
                    throw new KeyNotFoundException("Người dùng không tồn tại");
                }
                //genarate active code
                string activeCode = MutationService.GenerateActiveCode();
                userAccount.ActiveCode = HashingService.Md5Encrypt(activeCode);
                var mailRequest = MailForm.FormActiveEmail(userAccount, activeCode);
                await _userManager.UpdateAsync(userAccount);
                BackgroundJob.Enqueue(() => _mailService.SendMailAsync(mailRequest));

                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }
        [Authorize]
        [HttpPost("active-account")]
        [Consumes("application/json")]
        public async Task<IActionResult> ActiveAccount(UserActiveAccount body)
        {
            ApplicationUser userContext = (ApplicationUser)HttpContext.Items["User"];
            var userName = userContext.UserName;
            var user = await _userManager.FindByNameAsync(userName);
            if (user == null)
            {
                throw new KeyNotFoundException("Không tìm thấy người dùng");
            }
            if (user.EmailConfirmed)
            {
                return Ok();
            }
                if (user.ActiveCode != null)
            {
                string decodeCipher = HashingService.Md5Decrypt(user.ActiveCode);
                if (decodeCipher == body.ActiveCode)
                {
                    user.EmailConfirmed = true;
                    user.ActiveCode = null;
                    await _userManager.UpdateAsync(user);
                    return Ok();
                }
                else
                {
                    throw new BadRequestException("Active account failed");
                }
            }
            else
            {
                throw new UnauthorizedAccessException($"Unauthorized");
            }
        }

        [HttpPost("forget-password")]
        [Consumes("application/json")]
        public async Task ForgetPassword(UserForgetPassword body)
        {
            var email = body.Email.Trim();
            if (string.IsNullOrEmpty(email))
            {
                throw new BadRequestException("Email can not be blank");
            }
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                throw new BadRequestException("User not found");
            }
            string password = MutationService.GeneratePassword();
            user.PasswordHash = password;
            string hashPassword = _userManager.PasswordHasher.HashPassword(user, password);
            user.PasswordHash = hashPassword;
            await Task.WhenAll(
                _userManager.UpdateAsync(user),
                _mailService.SendMailAsync(new SendMailDto
                {
                    ToEmail = email,
                    Subject = "Quên mật khẩu",
                    Body = $"Mật khẩu mới: {password}"
                }
                    )
                );
        }

        [Authorize]
        [HttpPut("change-password")]
        [Consumes("application/json")]
        public async Task<IActionResult> ResetPassword(UserResetPassword body)
        {
            ApplicationUser userContext = (ApplicationUser)HttpContext.Items["User"];
            if (userContext == null)
            {
                throw new UnauthorizedAccessException();
            }
            if (body.NewPassword != body.ConfirmPassword)
            {
                throw new BadRequestException("Not match");
            }
            var user = await _userManager.FindByIdAsync(userContext.Id.ToString());
            if (user == null)
            {
                throw new BadRequestException("User not found");
            }
            string hashPassword = _userManager.PasswordHasher.HashPassword(user, body.ConfirmPassword);
            user.PasswordHash = hashPassword;
            await _userManager.UpdateAsync(user);
            return Ok();
        }
    }
}
