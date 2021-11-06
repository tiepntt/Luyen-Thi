using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class DocumentGradeDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public int Total { get; set; }
        public List<SubjectDto> Subjects { get; set; }
    }
    public class DocumentSubjectDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public int Total { get; set; }
        public List<GradeDto> Grades { get; set; }
    }
}
