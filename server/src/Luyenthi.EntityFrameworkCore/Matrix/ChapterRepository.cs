using Luyenthi.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.EntityFrameworkCore
{
    public class ChapterRepository : BaseRepository<Chapter>
    {
        public ChapterRepository(LuyenthiDbContext context) : base(context)
        {

        }
    }
}
