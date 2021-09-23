using Luyenthi.Domain.Base;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Luyenthi.Domain.User
{
    public class ApplicationUser : IdentityUser<Guid>, IBaseEntity
    {
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get ; set ; }
        public Guid? CreatedBy { get ; set ; }
        public Guid? UpdatedBy { get ; set ; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDay { get; set; }
    }
}
