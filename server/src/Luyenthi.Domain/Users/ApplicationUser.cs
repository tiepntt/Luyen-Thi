using Luyenthi.Core.Enums.User;
using Luyenthi.Domain.Base;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Luyenthi.Domain.User
{
    public class ApplicationUser : IdentityUser<Guid>, IBaseEntity
    {
        public string Provider { get; set; } = "luyenthi";
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get ; set ; }
        public Guid? CreatedBy { get ; set ; }
        public Guid? UpdatedBy { get ; set ; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDay { get; set; }
        public Gender Gender { get; set; }
        public string AvatarUrl { get; set; }
        public string ActiveCode { get; set; }
        public virtual List<DocumentHistory> DocumentHistories { get; set; }
        public virtual List<QuestionHistory> QuestionHistories { get; set; }

    }
}
