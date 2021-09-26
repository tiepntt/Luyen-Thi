using Luyenthi.Domain.Base;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Luyenthi.Domain
{
    public class QuestionDocumentPart
    {
        public Guid QuestionId { get; set; }
        public Guid PartDocumentId { get; set; }
    }
}
