using Luyenthi.Core.Enums;
using Luyenthi.Core.Enums.Document;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class DocumentUpdateDto
    {
        [Required]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid SubjectId { get; set; }
        public Guid GradeId { get; set; }
        public string Description { get; set; }
        public string GoogleDocId { get; set;  }
        public DocumentType DocumentType { get; set; }
        public DocumentStatus Status { get; set; }
        public DocumentForm Form { get; set; }
        public DocumentShuffleType ShuffleType { get; set; }
        public int Times { get; set; }
        public string ImageUrl { get; set; }
    }
}
