using Luyenthi.Core;
using Luyenthi.Core.Dtos.GoogleDoc;
using Luyenthi.Services;
using Luyenthi.Services.GoolgeAPI;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Luyenthi.HttpApi.Host.Controllers.Question
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : Controller
    {
        private readonly FileService _fileService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public QuestionController(
            FileService fileService, 
            IWebHostEnvironment hostEnvironment
            )
        {
            _fileService = fileService;
            _hostingEnvironment = hostEnvironment;
        }
        
    }
}
