using Luyenthi.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class DocumentQuery
    {
        public string Key { get; set; } = "";
        public int Skip { get; set; } = 0;
        public int Take { get; set; } = 10;
        public string GradeCode { get; set; }
        public string SubjectCode { get; set; }
        public DocumentType? Type { get; set; } 
    }
}
