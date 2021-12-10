using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class QuestionGenerateMatrixQuery
    {
        public Guid? ChapterId { get; set; }
        public Guid? SubjectId { get; set; }
        public List<Guid> LevelIds { get; set; }
    }
}
