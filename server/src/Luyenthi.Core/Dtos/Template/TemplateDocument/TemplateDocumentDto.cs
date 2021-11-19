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
        public string Name { get; set; }
        public Guid GradeId { get; set; }
        public Guid SubjectId { get; set; }
        public string BackgroundUrl { get; set; }
        public string BannerUrl { get; set; }
        public virtual List<TemplateQuestionSetDto> TemplateQuestionSets { get; set; }
    }
}
