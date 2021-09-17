using System;
using System.Collections.Generic;
using System.Text;

namespace Luyenthi.Domain.Base
{
    public interface IBaseEntity
    {
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Guid? CreatedBy { get; set; }
        public Guid? UpdatedBy { get; set; }
    }
}
