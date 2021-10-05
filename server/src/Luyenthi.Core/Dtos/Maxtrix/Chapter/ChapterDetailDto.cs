using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class ChapterDetailDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public GradeDto Grade { get; set; }
        public SubjectDto Subject { get; set; }
    }
}
