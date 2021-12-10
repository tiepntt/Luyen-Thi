using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class TemplateQuestionSetUpdateRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool Show { get; set; }
        public string Content { get; set; }
    }
}
