using Luyenthi.Domain.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Luyenthi.HttpApi.Host
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute: Attribute, IAuthorizationFilter
    {
        private readonly string[] _roles;
        public AuthorizeAttribute(params string[] roles)
        {
            _roles = roles;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = (ApplicationUser)context.HttpContext.Items["User"];
            var roles = (List<string>)context.HttpContext.Items["Roles"];
            if (user == null)
            {
                context.Result = new JsonResult(new { message = "Phiên đăng nhập đã kết thúc" }) 
                { StatusCode = StatusCodes.Status401Unauthorized };
                return;
            }
            else
            {
                bool isAuthorize = _roles.Length ==0 || _roles.Any(role => roles.Contains(role));
                if (!isAuthorize)
                {
                    context.Result = new JsonResult(new { message = "Bạn không có quyền làm điều này" })
                    { StatusCode = StatusCodes.Status403Forbidden };
                    return;
                }
            }
        }
    }
}
