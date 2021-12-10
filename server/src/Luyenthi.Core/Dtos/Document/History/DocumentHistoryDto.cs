using Luyenthi.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class DocumentHistoryDto
    {
        public Guid Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int NumberCorrect { get; set; } = 0;
        public int NumberIncorrect { get; set; } = 0;
        public DocumentHistoryStatus Status { get; set; }
        public List<QuestionHistoryDto> QuestionHistories { get; set; }
        public double TimeDuration { get; set; }
    }
}
