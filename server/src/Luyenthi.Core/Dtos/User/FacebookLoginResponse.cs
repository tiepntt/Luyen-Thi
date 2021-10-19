using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class FacebookLoginResponse
    {
        public string id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
        public Avatar picture { get; set; }
    }
    public class Avatar
    {
        public DataPicture Data { get; set; }
    } 
   public class DataPicture
    {
        public string url { get; set; }
    }
}
