using Google.Apis.Docs.v1.Data;
using Luyenthi.Core;
using Luyenthi.Core.Dtos.GoogleDoc;
using Luyenthi.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Luyenthi.Services
{
    public class ParseQuestionDocService
    {
        // đầu vào : paragraph question : bắt đầu từ h3 -> cuối h3
        // question normal : không chưa h5
        // parse question từ paragraph
        // trả về dữ liệu các question bao gồm : Content, Solve, Introduct, MetaQuestion
        // tạo dữ liệu kiểu mẫu cho từng phần dạng Paragraph
        private List<ImageDto> _images;
        private List<StructuralElement> _elements;
        private Guid _documentId;
        public ParseQuestionDocService(
            List<StructuralElement> elements,
            List<ImageDto> images,
             Guid documentId
            )
        {
            _images = images;
            _elements = elements;
            _documentId = documentId;
        }
        public List<QuestionSetGdocDto> Parse()
        {
            // tách các tiêu đề 2
            var partElements = GoogleDocHelper.SplitParagraph(_elements, "HEADING_2");
            var parts = partElements.Select((e, i) => ParsePartQuestion(e, i, partElements.Count > 1)).ToList();
            return parts;
        }
        public QuestionSetGdocDto ParsePartQuestion(List<StructuralElement> partElement,int index, bool isShow=true)
        {
            var partHeader = partElement[0];
            var part = new QuestionSetGdocDto();
            part.Name = "";
            if(partHeader.Paragraph != null && partHeader.Paragraph.ParagraphStyle.NamedStyleType == "HEADING_2")
            {
                part.Name = GoogleDocHelper.GetContent(partHeader);
            }
            var questionElements = GoogleDocHelper.SplitParagraph(partElement, "HEADING_3");
            part.Questions = questionElements.Select((e, i) => ParseQuestion(e, i)).ToList();
            part.Show = isShow;
            part.OrderNumber = index;
            part.DocumentId = _documentId;
            return part;
        }
        public QuestionGdocDto ParseQuestion(List<StructuralElement> partElement,int index)
        {
            var questionElement = GoogleDocHelper.SplitParagraph(partElement, "HEADING_4", true);
            if(questionElement.Count >= 2)
            {
                // bộ câu hỏi
                var introduction = new ParseDoc(questionElement[0],_images).Parse();
                questionElement.RemoveAt(0);
                var subQuestion = questionElement.Select((e,i) => ParseSubQuestion(e,i)).ToList();
                return new QuestionGdocDto
                {
                    OrderNumber = index,
                    Introduction = introduction,
                    SubQuestions = subQuestion, 
                    Type = QuestionType.QuestionGroup

                };
            }
            else
            {
                // câu hỏi đơn
                var question = ParseSubQuestion(questionElement[0], index);
                return question;
            }
        }
        public QuestionGdocDto ParseSubQuestion(List<StructuralElement> _questionElement,int index)
        {
            var question = new QuestionGdocDto();
            var questionElement = GoogleDocHelper.SplitParagraph(_questionElement, "SUBTITLE", true);
            var questionContent = questionElement[0];

            // parse Content => introduction, content
            var introductionElement = questionContent.Where(i => !Regex.IsMatch(GoogleDocHelper.GetContent(i), @"(\s*?[АВСABCD]\s*?[\.|\․][\w\W]+)")).ToList();
            var contentElement = questionContent.Where(i => Regex.IsMatch(GoogleDocHelper.GetContent(i), @"(\s*?[АВСABCD]\s*?[\.|\․][\w\W]+)")).ToList();
            question.Introduction = new ParseDoc(introductionElement, _images).Parse();
            // pareOptions
            var options = GoogleDocHelper.SplitOptions(contentElement);
            question.CorrectAnswer = options.FirstOrDefault(i => i.isTrue).Name;
            question.OrderNumber = index;
            question.Type = QuestionType.QuestionMultipleChoice;
            question.Content = options.Select(i =>
            {
                var option = new ParseDoc(i.Content, _images, true).Parse();
                return new OptionQuestionDto
                {
                    Content = option,
                    Name = i.Name
                };
            }
            ).ToList();
            if (questionElement.Count > 1)
            {
                
                var questionSolve = GoogleDocHelper.RemovePargraph(questionElement[1], "SUBTITLE");
                question.Solve = new ParseDoc(questionSolve, _images).Parse();
                // parse solve
            }
            return question;
        }
        


    }
}
