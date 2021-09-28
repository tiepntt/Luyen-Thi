using AutoMapper;
using Luyenthi.Core;
using Luyenthi.Core.Dtos;
using Luyenthi.Core.Dtos.Document;
using Luyenthi.Core.Dtos.GoogleDoc;
using Luyenthi.Domain;
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
        private readonly IMapper _mapper;

        public DocumentController(
            DocumentService documentService,
            FileService fileService,
            IWebHostEnvironment hostEnvironment, 
            IMapper mapper
            )
        {
            _documentService = documentService;
            _fileService = fileService;
            _hostingEnvironment = hostEnvironment;
            _mapper = mapper;
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
        [HttpPost]
        public DocumentDto Create(DocumentCreateDto document)
        {
            var documentCreate = _mapper.Map<Document>(document);
            var documentResponse = _documentService.Create(documentCreate);
            return _mapper.Map<DocumentDto>(documentResponse);
        }
        [HttpGet("{documentId}")]
        public DocumentGetDto GetById(Guid documentId)
        {
            var documentResponse = _documentService.GetById(documentId);
            return _mapper.Map<DocumentGetDto>(documentResponse);
        }
        [HttpDelete("{documentId}")]
        public void DeleteById(Guid documentId)
        {
             _documentService.RemoveById(documentId);
        }
    }
}
