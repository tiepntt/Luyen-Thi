using Luyenthi.Domain.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Domain
{
    public class Chapter : IEntity<Guid>, IBaseEntity
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
        public string Code { get; set; }
        public string OrderNumber { get; set; }
        public Subject Subject { get; set; }
        public Grade Grades { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Guid? CreatedBy { get; set; }
        public Guid? UpdatedBy { get; set; }

    }
}
