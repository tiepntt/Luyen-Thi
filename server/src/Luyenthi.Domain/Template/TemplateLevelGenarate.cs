using Luyenthi.Domain.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Domain
{
    public class TemplateLevelGenarate:IEntity<Guid>
    {
        public Guid Id { get; set; }
        public int Count { get; set; }
        public int OrderNumber { get; set; }
        public Guid LevelQuestionId { get; set; }
        public Guid TemplateQuestionGenerateId { get; set; }
        public LevelQuestion LevelQuestion { get; set; }
        public TemplateQuestionGenerate TemplateQuestionGenerate { get; set; }
    }
}
