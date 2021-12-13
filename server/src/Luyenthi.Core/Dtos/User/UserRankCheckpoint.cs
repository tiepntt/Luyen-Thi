using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class UserRankCheckpoint
    {
            public UserTitleDto User { get; set; }
            public int Rank { get; set; }
            public int Total { get; set; }
    }
}
