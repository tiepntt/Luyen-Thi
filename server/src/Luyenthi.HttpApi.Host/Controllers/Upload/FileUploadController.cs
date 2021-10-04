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
        private readonly CloudinarySerivce _cloudinarySerivce;
        public FileUploadController(
            FileService fileService,
            CloudinarySerivce cloudinarySerivce)
        {
            _fileService = fileService;
            _cloudinarySerivce = cloudinarySerivce;
        }
        [HttpPost("image")]
        public async Task<FileDto> UploadImage(IFormCollection formData)
        {
            var file = formData.Files.FirstOrDefault();
            var fileResult = new FileDto { };
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                var fileBytes = ms.ToArray();
                var imageResult = await _cloudinarySerivce.UploadImage(fileBytes );
                fileResult.Path = imageResult.SecureUrl.AbsoluteUri;
            }
            return fileResult;
        }
    }
}
