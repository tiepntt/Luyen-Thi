using Luyenthi.Core.Enums;
using Luyenthi.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
        
    }
}
