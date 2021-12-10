using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class TemplateDocumentDto
    {
        public Guid Id { get; set; }
        public Guid SubjectId { get; set; }
        public int Times { get; set; }
        public int NumberQuestion { get; set; }
        public virtual List<TemplateQuestionSetDto> TemplateQuestionSets { get; set; }
    }
}
