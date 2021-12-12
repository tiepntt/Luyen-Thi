using Luyenthi.Core.Enums.Analytic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos.Analytic
{
    public class AnalyticGetDto
    {
        public Guid? SubjectId { get; set; }
        public Guid? GradeId { get; set; }

        public AnalyticType Type { get; set; } = AnalyticType.Month;
    }
}
