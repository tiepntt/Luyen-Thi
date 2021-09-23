using System;
using System.Collections.Generic;
using System.Text;

namespace Luyenthi.Core.Dtos.GoogleDoc
{
    public class ElementParagraph:StructElement
    {
        public List<Element> children { get; set; }
        public string Align { get; set; } = "left";

    }
}
