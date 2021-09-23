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
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get ; set ; }
        public Guid? CreatedBy { get ; set ; }
        public Guid? UpdatedBy { get; set; }

        [NotMapped]
        public dynamic Content { get; set; }
        [NotMapped]
        public dynamic Introduction { get; set; }
        [NotMapped]
        public dynamic Solve { get; set; }
        public virtual List<Question> SubQuestions { get; set; }
        public virtual Question Parent { get; set; }
        public Grade Grade { get; set; }
        public Subject Subject { get; set; }
        public Chapter Chapter { get; set; }
        public Unit Unit { get; set; }
        public LevelQuestion Level { get; set; }
        public  ICollection<PartDocument> PartDocuments { get; set; }
    }
}
