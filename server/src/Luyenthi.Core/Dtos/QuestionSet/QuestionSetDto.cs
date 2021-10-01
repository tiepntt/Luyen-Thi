using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos.QuestionSet
{
    public class QuestionSetDto
    {
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Guid? CreatedBy { get; set; }
        public Guid? UpdatedBy { get; set; }
        public Guid Id { get; set; }
        public bool Show { get; set; }
        public string Name { get; set; }
        public int OrderNumber { get; set; }
        public Guid DocumentId { get; set; }
    }
}
