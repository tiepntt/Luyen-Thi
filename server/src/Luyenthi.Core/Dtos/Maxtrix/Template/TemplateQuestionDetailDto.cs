using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class TemplateQuestionDetailDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public UnitDto Unit { get; set; }
    }
}
