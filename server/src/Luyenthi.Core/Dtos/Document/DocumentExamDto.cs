using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos.Document
{
    public class DocumentExamDto
    {
        public string Name { get; set; }
        public Guid Id { get; set; }
        public int Times { get; set; }
        public DocumentHistoryDto DocumentHistory { get; set; }
    }
}
