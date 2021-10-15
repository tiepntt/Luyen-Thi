using Luyenthi.Domain.Base;
using Luyenthi.Domain.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Domain
{
    public class TargetUserNotification : IEntity<Guid>
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public dynamic Payload { get; set; }
        public bool Seen { get; set; }
        public virtual Notification Notification { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}
