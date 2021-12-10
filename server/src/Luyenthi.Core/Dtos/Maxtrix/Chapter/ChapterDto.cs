using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class ChapterDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public Guid GradeId { get; set; }
        public Guid SubjectId { get; set; }
        public List<UnitDto> Units { get; set; }
    }
}
