using Luyenthi.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.EntityFrameworkCore
{
    public class SubjectRepository : BaseRepository<Subject>
    {
        public SubjectRepository(LuyenthiDbContext context) : base(context)
        {

        }
    }
}
