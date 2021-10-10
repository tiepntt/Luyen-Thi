using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class UserResponseLogin
    {
        public string AccessToken { get; set; }
        public UserInfoDto UserInfo { get; set; }
    }
}
