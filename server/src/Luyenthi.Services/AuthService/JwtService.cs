using Luyenthi.Domain.User;
using Luyenthi.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Services
{
    public class JwtService
    {
        private readonly AppSettings _appSettings;
        private readonly UserManager<ApplicationUser> _userManager;

        public JwtService(
            IOptions<AppSettings> appSettings,
            UserManager<ApplicationUser> userManager
            )
        {
            _appSettings = appSettings.Value;
            _userManager = userManager;
        }
        public string GenarateToken(ApplicationUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { 
                    new Claim("id", user.Id.ToString()), new Claim("username", user.UserName) 
                }),
                Expires = DateTime.UtcNow.AddDays(_appSettings.Expires),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        public async  Task<UserTokenPayload> ValidateToken(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero,
                    RequireExpirationTime = true
                }, out SecurityToken validatedToken);
                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = new Guid(jwtToken.Claims.First(x => x.Type == "id").Value);

                var user = _userManager.Users
                    .Where(u => u.Id == userId)
                    .FirstOrDefault();
                var roles = await _userManager.GetRolesAsync(user);
                return new UserTokenPayload
                {
                    User = user,
                    Roles = roles.ToList()
                };
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
    public class UserTokenPayload
    {
        public ApplicationUser User { get; set; }
        public List<string> Roles { get; set; }
    }
}
