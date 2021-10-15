using Luyenthi.Domain.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Domain
{
    public class TemplateQuestionSet : IEntity<Guid>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool Show {get;set;}
        public virtual TemplateDocument TemplateDocument { get; set; }
        public virtual List<TemplateQuestionGenerate> QuestionGenerates { get; set; }
    }
}
