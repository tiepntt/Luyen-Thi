using Luyenthi.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.EntityFrameworkCore
{
    public class DocumentHistoryRepository : BaseRepository<DocumentHistory>
    {
        public DocumentHistoryRepository(LuyenthiDbContext context) : base(context)
        {

        }
    }
}
