using Luyenthi.Domain;
using Luyenthi.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Services
{
    public class QuestionSetGenerateService
    {
        private readonly TemplateQuestionSetRepository _templateQuestionSetRepository;
        public QuestionSetGenerateService(
            TemplateQuestionSetRepository templateQuestionSetRepository)
        {
            _templateQuestionSetRepository = templateQuestionSetRepository;
        }
        public TemplateQuestionSet Create(TemplateQuestionSet templateQuestionSet)
        {
            return null;
        }
        public TemplateQuestionSet Update(TemplateQuestionSet templateQuestionSet)
        {
            return null;
        }
        public void Remove(Guid Id)
        {
            
        }
    }
}
