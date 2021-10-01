using Luyenthi.Core.Enums.Document;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class DocumentGetByGradeSubjectDto
    {
        public Guid GradeId { get; set; }
        public Guid SubjectId { get; set; }
        public string Key { get; set; } = "";
        public int Take { get; set; }
        public DocumentType? Type { get; set; }
        public DocumentStatus? Status { get; set; }
        public int Skip { get; set; }
    }
}
