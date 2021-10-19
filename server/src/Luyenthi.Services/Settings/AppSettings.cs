using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Services
{
    public class AppSettings
    {
        public string ClientURL { get; set; }
        public string StaticDataURL { get; set; }
        public string WebRootPath { get; set; }
        public string StaticDataFolder { get; set; }
        public string Secret { get; set; }
        public int Expires { get; set; }
    }
    public class GoogleAuthSettings
    {

    }
}
