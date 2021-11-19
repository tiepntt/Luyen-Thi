using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class TemplateQuestionGenerateDto
    {
        public Guid Id { get; set; }
        public virtual Guid GradeId { get; set; }
        public virtual Guid ChapterId { get; set; }
        public virtual Guid UnitId { get; set; }
        public virtual Guid TemplateQuestionId { get; set; }
        public virtual List<TemplateLevelGenerateDto> TemplateLevelGenarates { get; set; }
    }
}
