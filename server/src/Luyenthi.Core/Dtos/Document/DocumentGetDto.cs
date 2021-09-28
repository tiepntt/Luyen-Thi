using Luyenthi.Core.Enums.Document;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class DocumentGetDto
    {
        public string Name { get; set; }
        public Guid Id { get; set; }
        public dynamic Description { get; set; }
        public GradeDto Grade { get; set; }
        public SubjectDto Subject { get; set; }
        public DocumentType DocumentType { get; set; }
        public DocumentStatus Status { get; set; }
        public  virtual DocumentTitleDto Parent { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
