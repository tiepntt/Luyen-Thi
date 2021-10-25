using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class ReseteExamRequest
    {
        public Guid DocumentId { get; set; }
        public Guid? ExamId { get; set; }
    }
}
