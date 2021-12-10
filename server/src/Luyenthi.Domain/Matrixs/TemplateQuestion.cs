using Luyenthi.Domain.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Domain
{
    public class TemplateQuestion : IEntity<Guid>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Unit Unit { get; set; }
        public Guid UnitId { get; set; }
        public virtual List<Question> Questions { get; set; }
        public virtual List<TemplateQuestionGenerate> TemplateQuestionGenerates{ get; set; }
    }
}
