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
    public class QuestionHistory: IEntity<Guid>, IBaseEntity
    {
        public Guid Id { get; set; }
        [Required]
        public Guid QuestionId { get; set; }
        public Guid? DocumentHistoryId { get; set; }
        public virtual DocumentHistory DocumentHistory { get; set; }
        public Question Question { get; set; }
        public string Answer { get; set; }
        public ApplicationUser User { get; set; }
        public AnswerStatus AnswerStatus { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Guid? CreatedBy { get; set; }
        public Guid? UpdatedBy { get; set; }
    }
}
