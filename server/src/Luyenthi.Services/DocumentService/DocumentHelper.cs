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
    public class DocumentHelper
    {
        public static string ConvertToUnSign(string inputStr)
        {
            var input = inputStr.Trim();
            for (int i = 0x20; i < 0x30; i++)
            {
                input = input.Replace(((char)i).ToString(), " ");
            }
            Regex regex = new Regex(@"\p{IsCombiningDiacriticalMarks}+");
            string str = input.Normalize(NormalizationForm.FormD);
            string str2 = regex.Replace(str, string.Empty).Replace('đ', 'd').Replace('Đ', 'D');
            while (str2.IndexOf("?") >= 0)
            {
                str2 = str2.Remove(str2.IndexOf("?"), 1);
            }
            return str2;
        }
        public static dynamic ParseDocumentImport()
        {
            // tạo ra form part document => trả về partDocument
            return null;
        }
        public static List<QuestionSet> MakeIndexQuestions(List<QuestionSet> questionSets)
        {
            int curentIndex = 1;
            foreach (QuestionSet questionSet in questionSets)
            {
                var startQuestionIndex = curentIndex;
                var endQuestionIndex = curentIndex;
                // var questionSet 
                foreach (Question question in questionSet.Questions)
                {
                    if (question.SubQuestions != null && question.SubQuestions.Count > 0)
                    {
                        // bộ câu hỏi
                        foreach (Question subQ in question.SubQuestions)
                        {
                            var contenQuestion = JsonConvert.SerializeObject(question.Content);
                            contenQuestion = Regex.Replace(contenQuestion, @"(#{index})", curentIndex.ToString());
                            question.Content = JsonConvert.DeserializeObject<List<ExpandoObject>>(contenQuestion);
                            curentIndex++;
                        }
                    }
                    else
                    {
                        //câu hỏi thường
                        var contenQuestion = JsonConvert.SerializeObject(question.Introduction);
                        contenQuestion = Regex.Replace(contenQuestion, @"(#{index})", curentIndex.ToString());
                        question.Introduction = JsonConvert.DeserializeObject<List<ExpandoObject>>(contenQuestion);
                        curentIndex++;
                    }
                }
            }
            return questionSets;
        }
    }
}
