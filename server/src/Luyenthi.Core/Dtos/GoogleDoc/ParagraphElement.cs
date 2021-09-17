using System;
using System.Collections.Generic;
using System.Text;

namespace Luyenthi.Core.Dtos.GoogleDoc
{
    public class ElementParagraph:BaseElement
    {
        public List<Element> Elements { get; set; }
        public ParagraphStyle Style { get; set; }
    }
    public class ParagraphStyle
    {
        public string AlignMent { get; set; } = "left";
        public string Direaction { get; set; } = "LEFT_TO_RIGHT";
        public string NameStyle { get; set; }
    }
}
