using System;
using System.Collections.Generic;
using System.Text;

namespace Luyenthi.Core.Dtos.GoogleDoc
{
    public class StructElement:BaseElement
    {
        public TableElement Table { get; set; } = null;
        public ElementParagraph Paragraph { get; set; } = null;
    }
}
