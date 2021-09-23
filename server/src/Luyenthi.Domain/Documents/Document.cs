using Luyenthi.Domain.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Luyenthi.Domain
{
    public class Document : IBaseEntity, IEntity<Guid>
    {
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Guid? CreatedBy { get; set; }
        public Guid? UpdatedBy { get; set; }
        public Guid Id { get; set; }
        public Subject Subject { get; set; }
        public Grade Grade { get; set; }
        public virtual List<PartDocument> PartDocuments { get; set; }
    }
}
