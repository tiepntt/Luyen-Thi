using System;
using System.Collections.Generic;
using System.Text;

namespace Luyenthi.Core.Dtos.GoogleDoc
{
    public abstract class Element:BaseElement
    {
        public string Content { get; set; }
        
    }
    public class TextElement : Element { 
        public StyleElement Style { get; set; }
    }
    public class ImageLink:Element
    {
        public int Width { get; set; }
        public int Height { get; set; }
    }
    public class StyleElement { 
        public bool Italic { get; set; } = false;
        public bool Bold { get; set; } = false;
        public bool Underline { get; set; } = false;
        public RGBColor RGBColor { get; set; } = null;
    }
    public class RGBColor
    {
        public int Red { get; set; }
        public int Blue { get; set; }
        public int Green { get; set; }
        public int Alpha { get; set; }
    }

}
