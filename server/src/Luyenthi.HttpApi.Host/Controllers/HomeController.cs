using AutoMapper;
using Luyenthi.Services;
using Luyenthi.Services.GoolgeAPI;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Luyenthi.HttpApi.Host.Controllers
{
    [Route("api/[controller]")]

    [ApiController]
    public class HomeController : Controller
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly DocumentService _documentService;
        private readonly GradeService _gradeService;
        private readonly SubjectService _subjectService;
        private readonly IMapper _mapper;
        public HomeController(
            IWebHostEnvironment environment,
            DocumentService documentService,
            GradeService gradeService,
            SubjectService subjectService,
            IMapper mapper
            )
        {
            _hostingEnvironment = environment;
            _documentService = documentService;
            _gradeService = gradeService;
            _subjectService = subjectService;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<Dictionary<string, dynamic>> GetDocumentRate()
        {
            var documentGrade =  _gradeService.CountByGrades();
            var documentSubject = _subjectService.CountBySubject();
            var progress = await Task.WhenAll(documentGrade, documentSubject);
            
            var result = new Dictionary<string, dynamic>()
            {
                {"Grades", progress[0]},
                {"Subjects", progress[1]},
            };
            return result;
        }
    }
}
