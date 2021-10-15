using Luyenthi.Domain.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Domain
{
    public class TemplateQuestionGenerate : IEntity<Guid>
    {
        public Guid Id { get; set; }
        public virtual Guid GradeId { get; set; }
        public virtual Grade Grade { get; set; }
        public virtual Chapter Chapter { get; set; }
        public virtual Unit Unit { get; set; }
        public virtual TemplateQuestion TemplateQuestion { get; set; }
        public virtual List<TemplateLevelGenarate> TemplateLevelGenarates { get; set; }
        public virtual TemplateQuestionSet TemplateQuestionSet { get; set; }
    }
}
