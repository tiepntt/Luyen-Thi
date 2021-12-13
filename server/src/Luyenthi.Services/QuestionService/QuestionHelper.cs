using Luyenthi.Core.Enums;
using Luyenthi.Domain;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Luyenthi.Services
{
    public class QuestionHelper
    {
        public static AnswerStatus CheckAnswer(Question question, QuestionHistory questionHistory)
        {
            if (question == null)
            {
                return AnswerStatus.InCorrect;
            }
            return questionHistory.Answer.Equals(question.CorrectAnswer) ? AnswerStatus.Correct : AnswerStatus.InCorrect;
        }
        public static Question MakeIndex(Question question)
        {
            int currentIndex = 1;
            if (question.SubQuestions != null && question.SubQuestions.Count > 0)
            {
                // bộ câu hỏi
                var introduction = JsonConvert.SerializeObject(question.Introduction);
                var regex = new Regex(@"(\([0-9]+\)\s*____)");
                bool match = regex.IsMatch(introduction);
                if (match)
                {
                    for (int i = 0; i < question.NumberQuestion; i++)
                    {

                        introduction = regex.Replace(introduction, $"({currentIndex + i}) __u_", 1);
                    }
                    introduction = Regex.Replace(introduction, @"(__u_)", "____");


                    question.Introduction = JsonConvert.DeserializeObject<List<ExpandoObject>>(introduction);
                }
                

                
                foreach (Question subQ in question.SubQuestions)
                {
                    var contenQuestion = JsonConvert.SerializeObject(subQ.Introduction);
                    contenQuestion = Regex.Replace(contenQuestion, @"(#{index})", currentIndex.ToString());
                    subQ.Introduction = JsonConvert.DeserializeObject<List<ExpandoObject>>(contenQuestion);
                    currentIndex++;
                }
            }
            else
            {
                //câu hỏi thường
                var contenQuestion = JsonConvert.SerializeObject(question.Introduction);
                contenQuestion = Regex.Replace(contenQuestion, @"(#{index}\.)",": ");
                question.Introduction = JsonConvert.DeserializeObject<List<ExpandoObject>>(contenQuestion);
            }
            return question;
        }
        
    }
}
