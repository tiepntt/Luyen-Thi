using Luyenthi.Domain;
using Luyenthi.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Services
{
    public class LevelQuestionService
    {
        private readonly LevelQuestionRepository _levelQuestionRepository;
        public LevelQuestionService(
            LevelQuestionRepository levelQuestionRepository
            ) 
        {
            _levelQuestionRepository = levelQuestionRepository;
        }
        public List<LevelQuestion> GetAll()
        {
            return _levelQuestionRepository.GetAll().OrderBy(x => x.OrderNumber).ToList();
        }
    }
}
