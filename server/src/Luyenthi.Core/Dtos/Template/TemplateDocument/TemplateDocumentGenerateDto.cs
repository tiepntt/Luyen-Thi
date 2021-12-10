using Luyenthi.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class TemplateDocumentGenerateDto
    {
        public Guid Id { get; set; }
        public Guid SubjectId { get; set; }
        public int Time { get; set; }
        public int NumberQuestion { get; set; }
        public Guid? DocumentId { get; set; }
        public DocumentHistoryStatus Status { get; set; }
    }
}
