using Luyenthi.Domain.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Domain
{
    public class TemplateQuestionSet : IEntity<Guid>
    {
        public Guid Id { get; set; }
        public double OrderNumber { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public bool Show {get;set;}
        public Guid TemplateDocumentId { get; set; }
        public virtual List<Grade> Grades { get; set; }
        public virtual TemplateDocument TemplateDocument { get; set; }
        public virtual List<TemplateQuestionGenerate> QuestionGenerates { get; set; }

    }
}
