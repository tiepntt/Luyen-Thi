using Luyenthi.Core;
using Luyenthi.Core.Dtos.Document;
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

namespace Luyenthi.HttpApi.Host.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentController : Controller
    {
        private readonly DocumentService _documentService;
        private readonly FileService _fileService;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public DocumentController(
            DocumentService documentService,
            FileService fileService,
            IWebHostEnvironment hostEnvironment
            )
        {
            _documentService = documentService;
            _fileService = fileService;
            _hostingEnvironment = hostEnvironment;
        }
        [HttpPost("import-document")]
        public  dynamic ImportDocument(DocumentImportRequestDto request)
        {
            if(request.GoogleDocId == "")
            {
                throw new Exception("Không tìm thấy GoogleDocId");
            }
            
            return null;
        }
        [HttpPost("import-questions")]
        public async Task<dynamic> ImportQuestion(QuestionImportDto questionImport)
        {
            var result = await _documentService.ImportDocument(questionImport, _hostingEnvironment.WebRootPath);
            return result;
            // lấy document
           
        }
    }
}
