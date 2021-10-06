using Luyenthi.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.EntityFrameworkCore
{
    public class TemplateQuestionRepository:BaseRepository<TemplateQuestion>
    {
        public TemplateQuestionRepository(LuyenthiDbContext context) : base(context) { }
    }
}
