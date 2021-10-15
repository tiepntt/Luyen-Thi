using Luyenthi.Domain.Base;
using Luyenthi.Domain.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Domain
{
    public class Notification : IBaseEntity, IEntity<Guid>
    {
        public Guid Id { get; set; }
        public dynamic Content { get; set; }
        public string Type { get; set; }
        public virtual List<TargetUserNotification> Targets { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Guid? CreatedBy { get; set; }
        public Guid? UpdatedBy { get; set; }
    }
}
