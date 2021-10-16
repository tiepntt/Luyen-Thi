using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class DocumentPreviewDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int NumberQuestion {get;set;}
        public int Times {get;set;}
        public List<QuestionSetDetailDto> QuestionSets { get; set; }
        // history question
    }
}
