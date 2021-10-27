using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{     
    public class UserHistoryAnalyticQuery
    {
        public Guid? UserId { get; set; }
        public UserHistoryAnalyticType Type { get; set; }
    }
    public enum UserHistoryAnalyticType
    {
        Today,
        InWeek,
        InMonth,
        InYear,
    }
}
