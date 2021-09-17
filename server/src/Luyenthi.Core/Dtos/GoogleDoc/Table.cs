using System;
using System.Collections.Generic;
using System.Text;

namespace Luyenthi.Core.Dtos.GoogleDoc
{
    public class TableElement : BaseElement
    {
        public List<TableRowElement> Rows { get; set; }
    }
    public class TableRowElement
    {
        public List<TableCellElement> Cells { get; set; }
    }
    public class TableCellElement
    {
        public CellStyle Style { get; set; }
        public List<StructElement> Elements { get; set; }
        
    }
    public class CellStyle
    {
        public int ColumnSpan { get; set; }
        public int RowSpan { get; set; }
        public Border BoderLeft { get; set; }
        public Border BoderRight { get; set; }
        public Border BoderBottom { get; set; }
        public Border BoderTop { get; set; }
    }
    public class Border
    {
        public RGBColor RGBColor { get; set; }
    }
}
