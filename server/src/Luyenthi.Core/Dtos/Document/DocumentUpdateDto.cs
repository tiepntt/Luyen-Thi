using Luyenthi.Core.Enums.Document;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    class DocumentUpdateDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid SubjectId { get; set; }
        public Guid GradeId { get; set; }
        public Guid? ParentId { get; set; }
        public dynamic Description { get; set; }
        public DocumentType DocumentType { get; set; }
    }
}
