using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class TemplateLevelGenerateDto
    {
        public Guid Id { get; set; }
        public int Count { get; set; }
        public int OrderNumber { get; set; }
        public Guid LevelQuestionId { get; set; }
    }
}
