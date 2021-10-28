using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class UserHistoryAnalyticDto
    {
        public int Key { get; set; }
        public string Label { get; set; }
        public double MaxScore { get; set; }
        public int Total { get; set; }
        public double Medium { get; set; }
        public double TimeDuration { get; set; }
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}
