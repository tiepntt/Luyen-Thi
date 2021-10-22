using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class ExamDto
    {
        public DocumentPreviewDto Document { get; set; }
        public DocumentHistoryDto DocumentHistory { get; set; }
    }
}
