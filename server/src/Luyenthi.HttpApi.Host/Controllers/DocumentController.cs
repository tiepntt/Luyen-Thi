using Luyenthi.Core.Dtos.Document;
using Luyenthi.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Luyenthi.HttpApi.Host.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentController : Controller
    {
        private readonly  DocumentService _documentService;
        
        public DocumentController(DocumentService documentService)
        {
            _documentService = documentService;
        }
        [HttpPost("import-document")]
        public async Task<dynamic> ImportDocument(DocumentImportRequestDto request)
        {
            if(request.GoogleDocId == "")
            {
                throw new Exception("Không tìm thấy GoogleDocId");
            }
            var result =await _documentService.ImportDocument(request);
            return result;
        }
    }
}
