using System;
using System.Collections.Generic;
using System.Text;

namespace Luyenthi.Core.Dtos.GoogleDoc
{
    public abstract class Element
    {
        
    }
    public class TextElement : Element {
        public string Text { get; set; }
        public bool? Italic { get; set; } = false;
        public bool? Bold { get; set; } = false;
        public bool? Underline { get; set; } = false;
    }
    public class KatexTextElement : Element
    {
        public string Type { get; } = "katex";
        public string Content { get; set; }
        public List<TextElement> children = new List<TextElement>() { new TextElement { Text = "" } };
    }
    public class ImageLink:Element
    {
        public string Type { get; } = "image";
        public string Url { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }

        public List<TextElement> children = new List<TextElement>() { new TextElement { Text = "" } };
    }

}
