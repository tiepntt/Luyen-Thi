using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class UserAnalyticResponse
    {
        public double TotalTime { get; set; }
        public double Medium { get; set; }
        public double MaxScore { get; set; }
        public int NumberDocument { get; set; }
        public double PercentCorrect { get; set; }
    }
}
