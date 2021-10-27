using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Core.Dtos
{
    public class UserDocumentAnalyticDto
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public double MaxScore { get; set; }
        public double TimeDuration { get; set; }
        public string ImageUrl { get; set; }
    }
}
