using Luyenthi.Core.Enums.Document;
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
        public Guid Id { get; set; }
        public Guid SubjectId { get; set; }
        public Subject Subject { get; set; }
        public Guid GradeId { get; set; }
        public Grade Grade { get; set; }
        public dynamic Description { get; set; }
        public DocumentType DocumentType { get; set; }
        public DocumentStatus Status { get; set; } = DocumentStatus.Private;
        public virtual List<PartDocument> PartDocuments { get; set; }
        public virtual List<Document> Childrens { get; set; }

        public Guid ParentId { get; set; }
        public virtual Document Parent { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Guid? CreatedBy { get; set; }
        public Guid? UpdatedBy { get; set; }
    }
}
