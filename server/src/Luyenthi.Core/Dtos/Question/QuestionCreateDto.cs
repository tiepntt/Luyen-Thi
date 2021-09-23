using System;
using System.Collections.Generic;
using System.Text;

namespace Luyenthi.Core.Dtos.Question
{
    public class QuestionCreateDto
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Guid? CreatedBy { get; set; }
        public Guid? UpdatedBy { get; set; }

        public dynamic Content { get; set; }
        public dynamic Introduction { get; set; }
        public dynamic Solve { get; set; }
    }
}
