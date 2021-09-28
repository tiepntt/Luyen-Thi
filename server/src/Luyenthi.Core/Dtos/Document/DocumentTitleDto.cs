using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class DocumentTitleDto
    {
        public string Name { get; set; }
        public Guid Id { get; set; }
        public dynamic Description { get; set; }
    }
}
