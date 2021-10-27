
using Luyenthi.Domain.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.EntityFrameworkCore
{
    public class UserRepository : BaseRepository<ApplicationUser>
    {
        public UserRepository(LuyenthiDbContext dbContext) : base(dbContext)
        {

        }
    }
}
