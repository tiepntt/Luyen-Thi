using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class QuestionCorrectAnswerDto
    {
        public Guid Id { get; set; }
        public string CorrectAnswer{get;set;}
        public dynamic Solve { get; set; }
    }
}
