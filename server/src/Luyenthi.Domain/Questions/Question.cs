using Luyenthi.Domain.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Luyenthi.Domain.Questions
{
    public class Question:IEntity<Guid>, IBaseEntity
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public DateTime UpdatedAt { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public Guid? CreatedBy { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public Guid? UpdatedBy { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string Content { get; set; }
    }
}
