using Luyenthi.Domain.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Domain
{
    public class LevelQuestion:IEntity<Guid>
    {
        public string Name { get; set; }
        public Guid Id { get; set; }
        public string Code { get; set; }
    }
}
