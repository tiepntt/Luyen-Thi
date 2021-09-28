using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core
{
    public class QuestionSetGdocDto
    {
        public string Name { get; set; }
        public int OrderNumber { get; set; }
        public bool Show { get; set; }
        public Guid DocumentId { get; set; }
        public List<QuestionGdocDto> Questions { get; set; }
    }
}
