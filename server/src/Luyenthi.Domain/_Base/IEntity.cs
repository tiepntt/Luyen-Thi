using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Luyenthi.Domain.Base
{
    public interface IEntity<T>
    {
        [Key]
        public T Id { get; set; }
    }
}
