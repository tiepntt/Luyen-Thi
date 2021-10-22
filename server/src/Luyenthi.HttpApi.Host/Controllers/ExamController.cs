using Luyenthi.Core.Dtos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Luyenthi.HttpApi.Host.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamController : Controller
    {
        
        public ExamController()
        {

        }
        [HttpGet("{documentId}")]
        public async Task<ExamDto> GetExam()
        {
            return new ExamDto();
        }
    }
}
