
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class DocumentHistoryRank
    {
        public UserTitleDto User { get; set; }
        public double TimeDuration{get;set;}
        public int Rank { get; set; }
        public int NumberCorrect { get; set; }
    }
}
