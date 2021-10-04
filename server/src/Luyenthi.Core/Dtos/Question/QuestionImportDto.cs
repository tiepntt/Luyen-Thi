using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core
{
    public class QuestionImportDto
    {
        public Guid DocumentId { get; set; }
        public string GoogleDocId { get; set; }
        public string GoogleDocUrl { get; set; }
    }
}
