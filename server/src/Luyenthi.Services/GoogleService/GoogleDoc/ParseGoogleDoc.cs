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
    public class ParseDoc
    {
        private List<ImageDto> _images;
        private List<StructuralElement> _elements;
        private bool _isOption;
        public ParseDoc(IList<StructuralElement> structuralElement, List<ImageDto> images, bool isOption = false)
        {
            _images = images;
            _elements = structuralElement.ToList();
            _isOption = isOption;
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
                    var text = i;
                    text = Regex.Replace(text, @"(Câu\s+[0-9]+[^\s]\s{0,5})", "Câu #{index}.");
                    text = Regex.Replace(text, @"(Question\s+[0-9]+[^\s]\s{0,5})", "Question #{index}.");
                    if (_isOption)
                    {
                     text = Regex.Replace(i, @"([АВСABCD]\s*?[\.|\․]\s{0,5})", "");  
                    }
                    
                    if (Regex.IsMatch(i, @"(\$[^$]+\$)|(\$\$[^$]*?\$\$)"))
                    {
                        elements.Add(ParseKatex(text));
                    }
                    else
                    {
                        elements.Add(ParseTextRun(text, style));
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
