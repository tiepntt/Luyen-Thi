using System;
using System.Collections.Generic;
using System.Text;

namespace Luyenthi.Domain.Base
{
    public interface IEntity<T>
    {
        public T Id { get; set; }
    }
}
