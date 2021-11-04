using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class PageResultDto<T>
    {
        public IList<T> Items { get; set; }
        public int Total { get; set; }
    }
}
