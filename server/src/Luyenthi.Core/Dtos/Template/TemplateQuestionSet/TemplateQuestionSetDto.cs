using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class TemplateQuestionSetDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool Show { get; set; }
        public string Content { get; set; }
        public Guid TemplateDocumentId { get; set; }
        public List<GradeDto> Grades { get; set; }
        public virtual List<TemplateQuestionGenerateDto> QuestionGenerates { get; set; }
    }
}
