using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class QuestionSetCreateDto
    {
        public bool Show { get; set; }
        public string Name { get; set; }
        public Guid DocumentId { get; set; }
    }
}
