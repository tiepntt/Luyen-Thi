using Google.Apis.Docs.v1.Data;
using Luyenthi.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Luyenthi.Services
{
    public class GoogleDocHelper
    {
        // trả về 1 tree của các question
        // Pt
        /// <summary>
        /// template split by paragraph has heading H3 and end by paragraph heading normal text
        /// </summary>
        /// <returns></returns>
        public static List<List<StructuralElement>> SplitParagraph(List<StructuralElement> structuralElements, string heading, bool getTop = false)
        {
            // cắt theo heading, kết quả trả về bao gồm heading và content
            List<List<StructuralElement>> result = new List<List<StructuralElement>>();
            List<StructuralElement> temp = new List<StructuralElement>();
            bool isFound = false;
            for (int i = 0; i < structuralElements.Count; i++)
            {
                var structElement = structuralElements[i];
                if (structElement.Paragraph != null && structElement.Paragraph.ParagraphStyle.NamedStyleType == heading)
                {
                    isFound = true;
                    if(temp.Count != 0)
                    {
                        result.Add(temp);
                        temp = new List<StructuralElement>();
                    }
                    
                };
                if (isFound || getTop)
                {
                    temp.Add(structElement);
                }
            }
            result.Add(temp);
            if (!isFound)
            {
                return new List<List<StructuralElement>>() { structuralElements };
            }
            return result;
        }
        public static List<OptionQuestionDto> SplitOptions(List<StructuralElement> structuralElements)
        {
            // cắt theo heading, kết quả trả về bao gồm heading và content
            List<OptionQuestionDto> result = new List<OptionQuestionDto>();
            string optionResult = "ABCDEFGHIK";
            for (int i = 0; i < structuralElements.Count; i++)
            {
                var structElement = structuralElements[i];
                var content = GetContent(structElement);
                var option = new OptionQuestionDto();
                option.Content = new List<StructuralElement>() { structElement };
                option.Name = optionResult[result.Count].ToString();

                if (content != "" && structElement.Paragraph.ParagraphStyle.NamedStyleType == "HEADING_5")
                {
                    option.isTrue = true;
                };
                if(content != "" || structElement.Table != null)
                {
                    result.Add(option);
                }
                
            }
            
            return result;
        }
        /// <summary>
        /// xóa các heading không cân thiết
        /// </summary>
        /// <param name="headings"> các heading</param>
        /// <returns></returns>
        public static List<StructuralElement> RemovePargraph(List<StructuralElement> structuralElements, string heading)
        {

            return structuralElements.Where(structElement =>
            {
                if (structElement.Paragraph == null || structElement.Paragraph.ParagraphStyle == null)
                {
                    return true;
                }
                var result = heading !=structElement.Paragraph.ParagraphStyle.NamedStyleType;
                return result;
            }).ToList();
        }
        public static string GetContent(StructuralElement element)
        {
            var paragraph = element.Paragraph;
            if (paragraph == null)
            {
                return " ";
            }
            List<ParagraphElement> elements = paragraph.Elements.ToList();
            string[] contents = elements.Where(i => i.TextRun != null).Select(element => element.TextRun.Content).Where(i => i != null).ToArray();

            string content = string.Join("", contents);
            content = Regex.Replace(content, @"(\$\$)", "$");
            return content;

        }

    }
}
