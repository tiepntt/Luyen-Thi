using System;
using System.Collections.Generic;
using System.Text;

namespace Luyenthi.Core.Dtos.GoogleDoc
{
    public class BaseElement
    {
        public string Type { get; set; }  
        public int? StartIndex { get; set; }
        public int? EndIndex { get; set; }
    }
}
