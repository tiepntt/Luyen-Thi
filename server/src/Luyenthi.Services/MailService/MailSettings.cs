using Luyenthi.Core.Dtos;
using Luyenthi.Domain.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Services
{
    public class MailSettings
    {
        public string Mail { get; set; }
        public string DisplayName { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
    }
    public class MailForm
    {
        public static SendMailDto FormActiveEmail(ApplicationUser user,string  activeCode)
        {
            string body = $"<div>Xin chào<b> {user.FirstName}</b>!</div> </br>" +
                $"<div>Mã xác thực tài khoản của bạn là  : <b>{activeCode}</div>" +
                $"<div><b>Lưu ý : </b>Vui lòng không chia sẻ mã này cho bất kỳ cá nhân nào vì lý do bảo mật.</div>" +
                $"<div>Xin cảm ơn !</div>";
            return new SendMailDto { 
                Body =body,
                Subject="Mã kích hoạt tài khoản",
                ToEmail=user.Email
            };
        }
    }
}
