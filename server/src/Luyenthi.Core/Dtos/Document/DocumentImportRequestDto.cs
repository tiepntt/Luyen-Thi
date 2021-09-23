using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Luyenthi.Core.Dtos.Document
{
    public class DocumentImportRequestDto
    {
        [Required]
        public string GoogleDocId { get; set; }
        public string documentId { get; set; }
    }
}
