using Google.Apis.Sheets.v4.Data;
using Luyenthi.Core;
using Luyenthi.Core.Dtos.GoogleDoc;
using Luyenthi.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Luyenthi.Services.GoogleService
{
    public class ParseGoogleSheet
    {
        private readonly Sheet _sheet;
        private readonly Guid _documentId;
        public ParseGoogleSheet(Sheet sheet, Guid documentId)
        {
            _sheet = sheet;
            _documentId = documentId;
        }
        public List<QuestionSetGdocDto> ParseData()
        {
           var questions = _sheet.Data.Select(g => ParseGrid(g)).FirstOrDefault();
            return new List<QuestionSetGdocDto>{ new QuestionSetGdocDto
            {
                DocumentId = _documentId,
                Name="",
                Show=false,
                Questions = questions,
                OrderNumber = 0
            } };
        }
        public List<QuestionGdocDto> ParseGrid(GridData gridData)
        {
            return gridData.RowData.Select(r => ParseRow(r)).ToList();
        }
        public QuestionGdocDto ParseRow(RowData rowData)
        {
            var values = rowData.Values;
            var question = new QuestionGdocDto();

            // parse Question
            // 0 : introduction
            if(values.Count()  <  5)
            {
                return null;
            }
            question.Introduction = ParseCell(values[0]);
            // 1,2,3,4 : content
            var options = new List<OptionQuestionDto>();
            var optionName = new List<string> { "A", "B", "C", "D" };
            var random = new Random();
            optionName = EnumerateService<string>.Shuffle(optionName).ToList();

            for (int i = 1; i <=4; i++)
            {
                var optionContent = ParseCell(values[i], true);
                var option = new OptionQuestionDto
                {
                    Name = optionName[i - 1],
                    isTrue = i == 1,
                    Content = optionContent,
                };
                if(i == 1)
                {
                    question.CorrectAnswer = optionName[i - 1];
                }
                options.Add(option);
            }
            question.Content = options.OrderBy(i => i.Name).ToList();
            question.Solve = ParseCell(values[5]);

            // 6 : level
            return question;
        }
        public List<ElementParagraph> ParseCell(CellData cell, bool _isOption = false)
        {
            string value = cell.FormattedValue;
            if(value == null || value.Trim('\n').Trim() =="")
            {
                return null;
            }
            int maxIndex = value.Length;
            var userFormat = cell.UserEnteredFormat.TextFormat;
            var paragraph = new ElementParagraph
            {
                Type = "paragraph",
                Align = "left",
                children = new List<Element>()
            };
            List<TextFormatRun> formatRuns = new List<TextFormatRun>();
            formatRuns.Add(new TextFormatRun
            {
                StartIndex = 0,
                Format = userFormat
            });
            if (cell.TextFormatRuns != null)
            {
                var formats = cell.TextFormatRuns.Where(i => i.StartIndex != null).ToList();
                formatRuns.AddRange(formats);
            }
            
            for(int i = 0; i < formatRuns.Count(); i++)
            {
                int start =(int) formatRuns[i].StartIndex;
                int end = maxIndex;
                var style = formatRuns[i].Format;
                if(i < formatRuns.Count() - 1)
                {
                    end = (int)formatRuns[i + 1].StartIndex;
                }
                string dataText = value.Substring(start, end - start);
                dataText = ParseDoc.StringToSymbols(dataText);
                var textElements = Regex.Split(dataText, @"(\$[^$]+\$)|(\$\$[^$]*?\$\$)|(Câu\s+[0-9]+[^\s]\s{0,5})|(Question\s+[0-9]+[^\s]\s{0,5})").ToList();
                var elements = new List<Element>();
                textElements.ForEach(i =>
                {
                    var text = i;
                    //text = Regex.Replace(text, @"(\[[0-9]+\])", "[#{index}] ");
                    text = Regex.Replace(text, @"(Câu\s+[0-9]+[^\s]\s{0,5})", "Câu #{index}. ");
                    text = Regex.Replace(text, @"(Question\s+[0-9]+[^\s]\s{0,5})", "Question #{index}. ");
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
                paragraph.children.AddRange(elements);
            }
            return new List<ElementParagraph> { paragraph };
        }
        public KatexTextElement ParseKatex(string katex)
        {
            return new KatexTextElement
            {
                Content = katex,
            };
        }
        public TextElement ParseTextRun(string text, TextFormat textStyle)
        {
            var result = new TextElement
            {
                Text = text,
            };
            if (textStyle.Bold != null || text.Trim() == "Question #{index}.")
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
            if ( text.Trim() == "Question #{index}." || text.Trim() == "Câu #{index}.")
            {
                result.Bold = true;
            }
            return result;
        }
        public QuestionLevel ParseLevel(string levelText)
        {
            switch (levelText)
            {
                case "nhận biết":
                    return QuestionLevel.NB;
                case "thông hiểu":
                    return QuestionLevel.TH;
                case "vận dụng thấp":
                    return QuestionLevel.NB;
                case "vận dụng" :
                    return QuestionLevel.VDC ;
                default:
                    return QuestionLevel.NB;
            }
        }
    }
}
