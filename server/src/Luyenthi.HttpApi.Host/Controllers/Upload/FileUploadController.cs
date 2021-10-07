using Luyenthi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Luyenthi.HttpApi.Host.Controllers.Upload
{
    [ApiController]
    [Route("api/[controller]")]
    public class FileUploadController : Controller
    {
        private readonly FileService _fileService;
        public FileUploadController(
            FileService fileService)
        {
            _fileService = fileService;
        }
        [HttpPost("image")]
        public async Task<FileDto> UploadImage(IFormCollection formData)
        {
            var file = formData.Files.FirstOrDefault();
            var fileResult = new FileDto { };
            var cloundinaryService = CloudinarySerivce.GetService();
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                var fileBytes = ms.ToArray();
                var imageResult = await CloudinarySerivce.UploadImage(cloundinaryService,fileBytes,"Luyenthi");
                fileResult.Path = imageResult.SecureUrl.AbsoluteUri;
            }
            return fileResult;
        }
    }
}
