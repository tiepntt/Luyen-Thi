using Luyenthi.Core.Enums;
using Luyenthi.Domain.Base;
using Luyenthi.Domain.User;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Domain
{
    public class DocumentHistory : IBaseEntity, IEntity<Guid>
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Guid? CreatedBy { get; set; }
        public Guid? UpdatedBy { get; set; }
        public ApplicationUser User { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int NumberCorrect { get; set; } = 0;
        public int NumberIncorrect { get; set; } = 0;
        public DocumentHistoryStatus Status { get; set; }
        public Guid? DocumentId { get; set; }
        public virtual Document Document { get; set; }
        public virtual List<QuestionHistory> QuestionHistories {get;set;}
        
    }
}
