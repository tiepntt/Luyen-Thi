using Luyenthi.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class QuestionMatrixDto
    {
        public Guid Id { get; set; }
        public Guid GradeId { get; set; }
        public Guid SubjectId { get; set; }
        public Guid ChapterId {get;set;}
        public Guid UnitId { get; set; }
        public Guid TemplateQuestionId { get; set; }
        public Guid LevelId { get; set; }
        public QuestionStatus Status { get; set; }
    }
}
