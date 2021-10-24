using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class SubmitExamRequest
    {
        public Guid DocumentHistoryId { get; set; }
        public Guid? ExamManagerId { get; set; }
    }
}
