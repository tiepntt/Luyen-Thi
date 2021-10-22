using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class QuestionHistoryRequestDto
    {
        public Guid? Id { get; set; }
        public Guid? DocumentHistoryId { get; set; }
        public Guid QuestionId { get; set; }
        public Guid? DocumentId { get; set; }
        public Guid? QuestionSetId { get; set; }
        public string Answer { get; set; }
    }
}
