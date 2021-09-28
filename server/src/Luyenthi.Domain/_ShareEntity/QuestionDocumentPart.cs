using Luyenthi.Domain.Base;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Luyenthi.Domain
{
    public class QuestionSetQuestion
    {
        public Guid QuestionId { get; set; }
        public Guid QuestionSetId { get; set; }
    }
}
