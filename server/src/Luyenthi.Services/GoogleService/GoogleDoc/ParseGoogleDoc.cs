using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
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
        private List<StructuralElement> _elements;
        public ParseDoc(IList<StructuralElement> structuralElement, List<ImageDto> images)
        {
            _images = images;
            _elements = structuralElement.ToList();
        }
        public List<StructElement> Parse()
        {
            var structElements = _elements.Select(i =>ParseStructuralElement(i)).Where(i => i != null).ToList();
            
            return structElements.Where(i => i!= null).ToList();
        }
        public  StructElement ParseStructuralElement(StructuralElement element)
        {
           StructElement structElement = null;
           if(element.Table != null)
            {
                structElement= ParseTable(element.Table);
            }
            else
            {
                structElement= ParseParagraph(element.Paragraph); 
               
            }
           if(structElement != null)
            {
                structElement.EndIndex = element.EndIndex;
                structElement.StartIndex = element.StartIndex;
            }
            
            return structElement;
        }
        public  TableElement ParseTable(Table table)
        {
            var tableElement = new TableElement
            {
                Type = "table",
            };
            var children = table.TableRows.Select(i => ParseTableRow(i)).Where(i => i != null).ToList();
            for(int i_row = children.Count - 1; i_row >= 0; i_row--)
            {
                var row = children[i_row].children;
                for(int i_col = row.Count - 1; i_col >= 0; i_col--)
                {
                    var col = row[i_col];
                    if(col.ColumnSpan > 1)
                    {
                        // xóa col.ColumnSpan - 1 phần tử của hàng kể từ phần tử này
                        children[i_row].children.RemoveRange(i_col + 1,(int)col.ColumnSpan - 1);
                    }
                    if (col.RowSpan > 1)
                    {
                        // xóa col.RowSpan - 1 phần tử của cột
                        for(int index_row = i_row + 1; index_row < i_row + (int)col.RowSpan; index_row++)
                        {
                            children[index_row].children.RemoveAt(i_col);
                        }
                    }
                }
            }
            // xóa các colSpan, row span đi
            tableElement.children = children;
            return tableElement;
        }
        public  TableCellElement ParseTableCell(TableCell tableCell)
        {
            return new TableCellElement
            {
                RowSpan = tableCell.TableCellStyle.RowSpan,
                ColumnSpan = tableCell.TableCellStyle.ColumnSpan,
                children = tableCell.Content.Select(i => ParseStructuralElement(i)).Where(i => i != null).ToList()
            };
        }
        public  TableRowElement ParseTableRow(TableRow tableRow)
        {
            return new TableRowElement
            {
               children=tableRow.TableCells.Select(i => ParseTableCell(i)).Where(i => i != null).ToList()
            };
        }
        public  ElementParagraph ParseParagraph(Paragraph paragraph)
        {
            if(paragraph == null)
            {
                return null;
            }
            var paragraphElement = new ElementParagraph
            {
                Type = "paragraph",
                Align = paragraph.ParagraphStyle.Alignment,
                NameStyle = paragraph.ParagraphStyle.NamedStyleType
            };
            if (paragraphElement.Align != null && paragraphElement.Align=="JUSTIFIED")
            {
                paragraphElement.Align = "JUSTIFY";
            }
           
            paragraphElement.children = paragraph.Elements.SelectMany(i => ParseElement(i)).Where(i => i != null).ToList();
            return paragraphElement;
        }
        // text run
        public List<Element> ParseElement(ParagraphElement element)
        {
            if (element.InlineObjectElement != null)
            {
                // ảnh
                var image = ParseImage(element.InlineObjectElement);
                return new List<Element> { image };
            }
            else
            {
                // text thường
                // thay các kí tự \$ thành các mã code
                var text = StringToSymbols(element.TextRun.Content).Trim('\n','r');
                // tách các phần có latex ra
                var textElements = Regex.Split(text, @"(\$[^$]+\$)|(\$\$[^$]*?\$\$)").ToList();
                var style = element.TextRun.TextStyle;
                var elements = new List<Element>();
                textElements.ForEach(i =>
                {
                    if (Regex.IsMatch(i, @"(\$[^$]+\$)|(\$\$[^$]*?\$\$)"))
                    {
                        elements.Add(ParseKatex(i));
                    }
                    else
                    {
                        elements.Add(ParseTextRun(i, style));
                    }
                });
                return elements;
            }
        }
        public KatexTextElement ParseKatex(string katex)
        {
            return new KatexTextElement
            {
                Content = katex,
            };
        }
        public TextElement ParseTextRun(string text, TextStyle textStyle)
        {
            var result =  new TextElement
            {
                Text = text,
            };
            if (textStyle.Bold != null)
            {
                result.Bold = textStyle.Bold;
            }
            if (textStyle.Italic != null)
            {
                result.Italic = textStyle.Italic;
            }
            if (textStyle.Underline != null)
            {
                result.Underline = textStyle.Underline;
            }
            return result;
        }
        public ImageLink ParseImage(InlineObjectElement inlineObjectElement)
        {
            var image = GetImage(inlineObjectElement.InlineObjectId);
            return new ImageLink
            {
                Url = image.Url,
                Width = image.Width,
                Height = image.Height,
            };
        }
        
        public ImageDto GetImage(string Id)
        {
            var image = _images.FirstOrDefault(i => i.Id == Id);
            return image;
        }

        public static string SymbolsToString(string content)
        {
            content = content.Replace("&#47;&#36", "$");
            return content;
        }
        public static string StringToSymbols(string content)
        {
            content = content.Replace("/$", "&#47;&#36;");
            return content;
        }
        
    }
}
