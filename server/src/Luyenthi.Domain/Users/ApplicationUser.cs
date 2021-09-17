using Luyenthi.Domain.Base;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Luyenthi.Domain.User
{
    public class ApplicationUser : IdentityUser<Guid>, IBaseEntity
    {
        public DateTime CreatedAt { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public DateTime UpdatedAt { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public Guid? CreatedBy { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public Guid? UpdatedBy { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string FirstName { get; set; }
        public DateTime BirthDay { get; set; }
    }
}
