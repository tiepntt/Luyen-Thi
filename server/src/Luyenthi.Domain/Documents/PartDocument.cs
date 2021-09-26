using Luyenthi.Domain.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Luyenthi.Domain
{
    public class PartDocument : IEntity<Guid>, IBaseEntity
    {
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Guid? CreatedBy { get; set; }
        public Guid? UpdatedBy { get; set; }
        public Guid Id { get; set; }
        public bool show { get; set; }
        public string Name { get; set; }
        public int OrderNumber { get; set; }
        public  Guid DocumentId { get; set; }
        public virtual Document Document { get; set; }
        public  ICollection<Question> Questions { get; set; }
    }
}
