﻿using Luyenthi.Core.Enums.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class UserInfoDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDay { get; set; }
        public Gender Gender { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public bool EmailConfirmed { get; set; }
        public List<string> Roles { get; set; }
    }
}