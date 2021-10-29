using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class DocumentGetAllDto
    {
        public int Total { get; set; }
        public List<DocumentTitleDto> Documents { get; set; }
    }
}
