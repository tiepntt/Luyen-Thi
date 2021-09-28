using Luyenthi.Core.Enums.Document;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class DocumentDto
    {
        public string Name { get; set; }
        public Guid Id { get; set; }
        public Guid SubjectId { get; set; }
        public Guid GradeId { get; set; }
        public dynamic Description { get; set; }
        public DocumentType DocumentType { get; set; }
        public DocumentStatus Status { get; set; } = DocumentStatus.Private;
        public Guid? ParentId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
