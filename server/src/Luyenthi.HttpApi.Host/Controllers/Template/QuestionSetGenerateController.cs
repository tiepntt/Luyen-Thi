using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Luyenthi.HttpApi.Host.Controllers.Template
{
    [Route("api/[controller]")]

    [ApiController]
    public class QuestionSetGenerateController : Controller
    {
        
        public QuestionSetGenerateController()
        {

        }
        [HttpPut]
        public void CreateQuestionSetGenerate()
        {

        }
    }
}
