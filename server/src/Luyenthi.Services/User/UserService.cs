using Luyenthi.Domain.User;
using Luyenthi.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Services
{
    public class UserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly UserRepository _userRepository;
        private readonly DocumentHistoryRepository _documentHistoryRepository;
        public UserService(
            UserManager<ApplicationUser> userManager,
            UserRepository userRepository
            )
        {
            _userManager = userManager;
            _userRepository = userRepository;
        }
       
        
    }
}
