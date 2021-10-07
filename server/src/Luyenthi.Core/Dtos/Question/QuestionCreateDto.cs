using Luyenthi.Core.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Luyenthi.Core.Dtos
{
    public class QuestionCreateDto
    {
        public dynamic Content { get; set; }
        public dynamic Introduction { get; set; }
        public dynamic Solve { get; set; }
        public QuestionType Type { get; set; }
        public List<QuestionCreateDto> SubQuestions { get; set; }
    }
}
