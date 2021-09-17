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
            var doc = GoogleDocApi.GetDocument(gdocService, "1b1R3lJ38kfZ-ghANo__rYBFt42Q7iIIigUugwlTvvvw");
            var fileService = new FileService();
            var imgBytes = await fileService.Download("https://s.saokhuee.com/ktdg/tu-nhien-xa-hoi/lop1/bai-2-cau-1-3.png");
            var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploads/questions");
            var filePath = Path.Combine(uploads, "bai-2-cau-1-3.png");
            var img =await fileService.Save(imgBytes,filePath, uploads);
            return img;
        }
    }
}
