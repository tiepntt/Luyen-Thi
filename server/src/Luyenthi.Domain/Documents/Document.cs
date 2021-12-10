using Luyenthi.Core.Enums;
using Luyenthi.Domain.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Luyenthi.Domain
{
    public class Document : IBaseEntity, IEntity<Guid>
    {
        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
        [Required]
        [MaxLength(255)]
        public string NameNomarlize { get; set; }
        public Guid Id { get; set; }
        public Guid SubjectId { get; set; }
        public Subject Subject { get; set; }
        public Guid GradeId { get; set; }
        public Grade Grade { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public DocumentType DocumentType { get; set; }
        public DocumentStatus Status { get; set; } = DocumentStatus.Private;
        public DocumentForm Form { get; set; } = DocumentForm.All;
        public DocumentShuffleType ShuffleType { get; set; } = DocumentShuffleType.None;
        public int Times { get; set; }
        public bool IsApprove { get; set; }
        public string GoogleDocId { get; set; }
        public virtual List<QuestionSet> QuestionSets { get; set; }
        public virtual List<DocumentHistory> DocumentHistories { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Guid? CreatedBy { get; set; }
        public Guid? UpdatedBy { get; set; }
        public Guid? TemplateDocumentId { get; set; }
        public virtual TemplateDocument TemplateDocument { get; set; }
    }
}
