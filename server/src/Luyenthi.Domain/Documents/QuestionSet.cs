using Luyenthi.Domain.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Luyenthi.Domain
{
    public class QuestionSet : IEntity<Guid>, IBaseEntity
    {
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Guid? CreatedBy { get; set; }
        public Guid? UpdatedBy { get; set; }
        public Guid Id { get; set; }
        public bool Show { get; set; }
        public string Name { get; set; }
        public int OrderNumber { get; set; }
        public  Guid DocumentId { get; set; }
        public virtual Document Document { get; set; }
        public virtual List<Question> Questions { get; set; }
    }
}
