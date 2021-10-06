using Luyenthi.Domain;
using Luyenthi.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Services
{
    public class TemplateQuestionService
    {
        private readonly TemplateQuestionRepository _templateQuestionRepository;
        public TemplateQuestionService(
            TemplateQuestionRepository templateQuestionRepository
            ) 
        {
            _templateQuestionRepository = templateQuestionRepository;
        }
        public TemplateQuestion GetById(Guid Id)
        {
            var tempalteQuestion = _templateQuestionRepository.Find(i => i.Id == Id).Include(i => i.Unit).FirstOrDefault();
            if(tempalteQuestion == null)
            {
                throw new KeyNotFoundException("Không tìm thấy bản ghi");
            }
            return tempalteQuestion;
        }
        public List<TemplateQuestion> GetAllByUnitId(Guid unitId)
        {
            var templateQuestions = _templateQuestionRepository.Find(i => i.UnitId == unitId).ToList();
            return templateQuestions;
        }
        public TemplateQuestion Create(TemplateQuestion templateQuestion)
        {
            _templateQuestionRepository.Add(templateQuestion);
            return templateQuestion;
        }
        public TemplateQuestion Update(TemplateQuestion templateUpdate)
        {
            var templateQuestion = _templateQuestionRepository.Get(templateUpdate.Id);
            if(templateQuestion == null)
            {
                throw new KeyNotFoundException("Không tìm thấy bản ghi");
            }
             _templateQuestionRepository.UpdateEntity(templateUpdate);
            return templateUpdate;
        }
        public void RemoveById(Guid id)
        {
            var templateQuestion = _templateQuestionRepository.Get(id);
            if (templateQuestion == null)
            {
                throw new KeyNotFoundException("Không tìm thấy bản ghi");
            }
            _templateQuestionRepository.RemoveEntity(templateQuestion);
        }
    }
}
