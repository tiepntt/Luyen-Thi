using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Luyenthi.HttpApi.Host.Helpers
{
    public class UserHelper 
    {
        public static bool ValidateEmail(string email)
        {
            return Regex.IsMatch(email, @"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$");
        }
    }
}
