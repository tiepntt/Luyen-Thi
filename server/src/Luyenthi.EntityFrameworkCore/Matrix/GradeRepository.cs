using Luyenthi.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.EntityFrameworkCore
{
    public class GradeRepository : BaseRepository<Grade>
    {
        public GradeRepository(LuyenthiDbContext context) : base(context)
        {

        }
    }
}
