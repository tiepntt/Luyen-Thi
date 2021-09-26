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
        public HomeController(IWebHostEnvironment environment)
        {
            _hostingEnvironment = environment;
        }
        [HttpGet]
        public async Task<dynamic> Index()
        {
            var gdocService = GoogleDocApi.GetService();
            var doc =await GoogleDocApi.GetDocument(gdocService, "1b1R3lJ38kfZ-ghANo__rYBFt42Q7iIIigUugwlTvvvw");
            return Ok();
        }
    }
}
