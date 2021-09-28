using Luyenthi.Core.Enums.Document;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class DocumentCreateDto
    {
        public string Name { get; set; }
        public Guid SubjectId { get; set; }
        public Guid GradeId { get; set; }
        public Guid? ParentId { get; set; }
        public dynamic Description { get; set; }
        public DocumentType DocumentType { get; set; }
    }
}
