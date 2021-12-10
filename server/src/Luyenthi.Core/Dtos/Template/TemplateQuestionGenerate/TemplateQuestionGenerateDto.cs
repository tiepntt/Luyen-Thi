using Luyenthi.Core.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class TemplateQuestionGenerateDto
    {
        public Guid Id { get; set; }
        public virtual Guid TemplateQuestionSetId { get; set; }
        public virtual Guid GradeId { get; set; }
        public virtual Guid ChapterId { get; set; }
        public virtual Guid UnitId { get; set; }
        public virtual Guid LevelQuestionId { get; set; }
        public int NumberQuestion { get; set; }
    }
}
