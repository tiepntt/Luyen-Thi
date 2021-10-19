using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Services
{
    public class AuthSettings
    {
        public Google Google { get; set; }
        public Facebook Facebook { get; set; }
    }
    public class Google
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
    }
    public class Facebook
    {
        public string AppId { get; set; }
        public string AppSecret { get; set; }

    }
}
