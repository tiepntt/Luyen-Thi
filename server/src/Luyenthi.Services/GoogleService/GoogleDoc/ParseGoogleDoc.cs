using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Google.Apis.Docs.v1;
using Google.Apis.Docs.v1.Data;
using Luyenthi.Core.Dtos.GoogleDoc;

namespace Luyenthi.Services
{
    public class ParseGoogleDoc
    {
        // trả về 1 tree của các question
        // Pt
        /// <summary>
        /// template split by paragraph has heading H3 and end by paragraph heading normal text
        /// </summary>
        /// <returns></returns>
        public static List<List<StructuralElement>> SplitParagraph(List<StructuralElement> structuralElements, string heading)
        {

            return new List<List<StructuralElement>>();
        }
        /// <summary>
        /// xóa các heading không cân thiết
        /// </summary>
        /// <param name="headings"> các heading</param>
        /// <returns></returns>
        public  static List<StructuralElement> RemovePargraph(List<StructuralElement> structuralElements, string[] headings) {

            return structuralElements.Where(structElement =>
            {
                if (structElement.Paragraph == null || structElement.Paragraph.ParagraphStyle == null)
                {
                    return true;
                }
                var result = headings.Contains(structElement.Paragraph.ParagraphStyle.NamedStyleType);
                return result;
            }).ToList();
        }
        
    }
    public class ParseDoc
    {
        private List<ImageDto> _images;
        private StructuralElement _element;
        public ParseDoc(StructuralElement structuralElement, List<ImageDto> images)
        {
            _images = images;
            _element = structuralElement;
        }
        public  StructElement ParseStructuralElement(StructuralElement element)
        {
            return new StructElement
            {
                Type = "StructElement"
            };
        }
        public  TableElement ParseTable(Table table)
        {
            return new TableElement
            {
                Type = "Table"
            };
        }
        public  TableCellElement ParseTableCell(TableCell tableCell)
        {
            return new TableCellElement
            {
            };
        }
        public  TableRowElement ParseTableRow(TableRow tableRow)
        {
            return new TableRowElement
            {
            };
        }
        public  ElementParagraph ParseParagraph(Paragraph paragraph)
        {
            return new ElementParagraph
            {
                Type = "Paragraph"
            };
        }
        public  Element ParseElement(ParagraphElement element)
        {
            return new TextElement
            {
                Type = "TextElement"
            };
        }
        public ImageDto GetImage(string Id)
        {
            var image = _images.FirstOrDefault(i => i.Id == Id);
            return image;
        }
    }
}
