using Luyenthi.Domain.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Domain
{
    public class TemplateDocument : IBaseEntity, IEntity<Guid>
    {
        public Guid Id { get; set; }
        public int Times { get; set; }
        public int NumberQuestion { get; set; }
        public virtual List<TemplateQuestionSet> TemplateQuestionSets { get; set; }
        public Guid SubjectId { get; set; }
        public virtual Subject Subject { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Guid? CreatedBy { get; set; }
        public Guid? UpdatedBy { get; set; }
        public virtual List<Document> Documents { get; set; }
    }
}
