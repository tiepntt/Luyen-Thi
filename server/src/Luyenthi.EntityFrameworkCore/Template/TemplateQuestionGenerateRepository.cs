using Luyenthi.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.EntityFrameworkCore
{
    public class TemplateQuestionGenerateRepository : BaseRepository<TemplateQuestionGenerate>
    {
        public TemplateQuestionGenerateRepository(LuyenthiDbContext dbContext) : base(dbContext)
        {

        }

    }
}
