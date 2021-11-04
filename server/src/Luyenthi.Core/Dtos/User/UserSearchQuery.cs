using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class UserSearchQuery
    {
        public string Role { get; set; }
        public string? Key { get; set; } = "";
        public int Skip { get; set; } = 0;
        public int Take { get; set; }
       
    }
}
