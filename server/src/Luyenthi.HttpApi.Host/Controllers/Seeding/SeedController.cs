using Luyenthi.Domain;
using Luyenthi.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Luyenthi.HttpApi.Host.Controllers.Seeding
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeedController : Controller
    {
        private readonly GradeRepository _gradeRepository;
        private readonly SubjectRepository _subjectRepository;
        private readonly LevelQuestionRepository _levelQuestionRepository;
        public SeedController(
            GradeRepository gradeRepository,
            SubjectRepository subjectRepository,
            LevelQuestionRepository levelQuestionRepository
        )
        {
            _gradeRepository = gradeRepository;
            _subjectRepository = subjectRepository;
            _levelQuestionRepository = levelQuestionRepository;
        }
        [HttpGet]
        public IActionResult Index() => View();
        [HttpPost("init-grade-and-subject")]
        public dynamic InitGradeAndSubject()
        {
            List<Grade> grades = new List<Grade>();

            using (StreamReader r = new StreamReader(@"../Luyenthi.DbMigrator/Data/grade.json"))
            {
                string json = r.ReadToEnd();
                grades = JsonConvert.DeserializeObject<List<Grade>>(json);
                _gradeRepository.AddRange(grades);
            }
            using (StreamReader r = new StreamReader(@"../Luyenthi.DbMigrator/Data/subject.json"))
            {
                string json = r.ReadToEnd();
                List<Subject> subjects = JsonConvert.DeserializeObject<List<Subject>>(json);
                foreach(var subject in subjects)
                {
                    subject.Grades = grades;
                }
                _subjectRepository.AddRange(subjects);
            }
            return Ok();
        }
        [HttpPost("init-level-question")]
        public dynamic InitLevelQuestion()
        {
            using (StreamReader r = new StreamReader(@"../Luyenthi.DbMigrator/Data/level-question.json"))
            {
                string json = r.ReadToEnd();
                var levelQuestions = JsonConvert.DeserializeObject<List<LevelQuestion>>(json);
                _levelQuestionRepository.AddRange(levelQuestions);
            }
            
            return Ok();
        }

    }
}
