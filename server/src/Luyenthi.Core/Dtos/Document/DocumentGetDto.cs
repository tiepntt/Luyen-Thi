using Luyenthi.Core.Enums;
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
        public string Description { get; set; }
        public GradeDto Grade { get; set; }
        public SubjectDto Subject { get; set; }
        public DocumentType DocumentType { get; set; }
        public DocumentStatus Status { get; set; }
        public bool IsApprove { get; set; }
        public DocumentForm Form { get; set; }
        public DocumentShuffleType ShuffleType { get; set; }
        public int Times { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string GoogleDocId { get; set; }
        public string ImageUrl { get; set; }
    }
}
