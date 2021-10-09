using Luyenthi.Domain.User;
using Luyenthi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Luyenthi.HttpApi.Host.Middleware
{
    public class JwtMiddleware
    {
        private readonly AppSettings _appSettings;
        private readonly RequestDelegate _next;
        public JwtMiddleware(
            RequestDelegate next,
            IOptions<AppSettings> appSettings
            )
        {
            _appSettings = appSettings.Value;
            _next = next;
        }
        public async Task Invoke(HttpContext httpContext, JwtService jwtService)
        {
            var token = httpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
            {
                var userTokenPayload = await jwtService.ValidateToken(token);
                if(userTokenPayload != null)
                {
                    httpContext.Items["User"] = userTokenPayload.User;
                    httpContext.Items["Role"] = userTokenPayload.Roles;
                };
            }    

            await _next(httpContext);
        }
    }
}
