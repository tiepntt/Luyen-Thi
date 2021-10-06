using Luyenthi.Domain.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Domain
{
    public class Unit : IEntity<Guid>, IBaseEntity
    {
        public string Name { get; set; }
        public Guid ChapterId { get; set; }
        public Chapter Chapter { get; set; }
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Guid? CreatedBy { get; set; }
        public Guid? UpdatedBy { get; set; }
        public virtual List<Question> Questions { get; set; }
        public virtual List<TemplateQuestion> TemplateQuestions { get; set; }
    }
}
