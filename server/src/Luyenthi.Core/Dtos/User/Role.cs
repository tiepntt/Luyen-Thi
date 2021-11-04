using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Luyenthi.Core.Dtos.User
{
    public class UserRoleRequest
    {
        [Required]
        public Guid UserId { get; set; }
        public List<string> Roles { get; set; }
    }
}
