using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class UserAnalyticQuery
    {
        public string GradeCode { get; set; }
        public string SubjectCode { get; set; }
        public Guid? UserId { get; set; }
    }
}
