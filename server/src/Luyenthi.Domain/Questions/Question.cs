using Luyenthi.Core.Enums.Question;
using Luyenthi.Domain.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Luyenthi.Domain
{
    public class Question:IEntity<Guid>, IBaseEntity
    {
        public Guid Id { get; set; }
        public Guid? SubjectId { get; set; }
        public Guid? GradeId { get; set; }
        public Guid? ChapterId { get; set; }
        public Guid? UnitId { get; set; }
        public Guid? LevelId { get; set; }
        public Guid? ParentId { get; set; }
        public Guid? TemplateQuestionId { get; set; }
        public dynamic Content { get; set; }
        public dynamic Introduction { get; set; }
        public dynamic Solve { get; set; }
        public string CorrectAnswer { get; set; }
        public string Options { get; set; }
        public QuestionStatus Status { get; set; } = QuestionStatus.Waiting;
        public int OrderNumber { get; set; }
        public virtual List<Question> SubQuestions { get; set; }
        public virtual Question Parent { get; set; }
        public virtual Grade Grade { get; set; }
        public virtual Subject Subject { get; set; }
        public virtual Chapter Chapter { get; set; }
        public virtual Unit Unit { get; set; }
        public virtual LevelQuestion Level { get; set; }
        public virtual TemplateQuestion TemplateQuestion { get; set; }
        public virtual List<QuestionSet> QuestionSets { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Guid? CreatedBy { get; set; }
        public Guid? UpdatedBy { get; set; }
    }
}
