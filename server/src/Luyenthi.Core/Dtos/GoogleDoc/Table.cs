using System;
using System.Collections.Generic;
using System.Text;

namespace Luyenthi.Core.Dtos.GoogleDoc
{
    public class TableElement : StructElement
    {
        public List<TableRowElement> children { get; set; }
    }
    public class TableRowElement
    {
        public string Type { get; } = "table_row";
        public List<TableCellElement> children { get; set; }
    }
    public class TableCellElement
    {
        public string Type { get; } = "table_cell";
        public List<StructElement> children { get; set; }
        public int? ColumnSpan { get; set; }
        public int? RowSpan { get; set; }

    }   
}
