using AutoMapper;
using Luyenthi.Core;
using Luyenthi.Core.Dtos;
using Luyenthi.Core.Dtos.Document;
using Luyenthi.Core.Dtos.GoogleDoc;
using Luyenthi.Domain;
using Luyenthi.EntityFrameworkCore;
using Luyenthi.Services;
using Luyenthi.Services.GoolgeAPI;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

namespace Luyenthi.HttpApi.Host.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentController : Controller
    {
        private readonly DocumentService _documentService;
        private readonly QuestionSetService _questionSetService;
        private readonly QuestionService _questionService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IMapper _mapper;

        public DocumentController(
            DocumentService documentService,
            IWebHostEnvironment hostEnvironment,
            QuestionSetService questionSetService,
            QuestionService questionService,
        IMapper mapper
            )
        {
            _documentService = documentService;
            _hostingEnvironment = hostEnvironment;
            _questionSetService = questionSetService;
            _questionService = questionService;
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
            //using TransactionScope scope = new TransactionScope();
            var cloundinaryService = CloudinarySerivce.GetService();
            if (questionImport.DocumentId == Guid.Empty || questionImport.GoogleDocId == "")
            {
                throw new Exception("Dữ liệu không hợp lệ");
            }
            var docService = GoogleDocApi.GetService();
            var document = _documentService.GetById(questionImport.DocumentId);
            if(document == null)
            {
                throw new KeyNotFoundException("Không tìm thấy tài liệu");
            }
            if (document.IsApprove)
            {
                throw new Exception("Bạn không thể sử dụng chức năng này");
            }
            // xóa toàn bộ các question ở trong document
            var doc = await GoogleDocApi.GetDocument(docService, questionImport.GoogleDocId);
            // download image
            List<Task<ImageDto>> uploadImages = new List<Task<ImageDto>>();
            if (doc.InlineObjects != null)
            {
                for (int i = 0; i < doc.InlineObjects.Count; i++)
                {
                    var inlineObject = doc.InlineObjects.Values.ToList()[i];
                    uploadImages.Add(CloudinarySerivce.DownLoadImageFromDoc(cloundinaryService,inlineObject));
                }
            }
            var tasks = uploadImages.ToArray();
            var imageResults = await Task.WhenAll(tasks);
            var images = imageResults.ToList();
            // parse doc
            var questionSetDatas = new ParseQuestionDocService(doc.Body.Content.ToList(), images, questionImport.DocumentId).Parse();
            var questionSets = _mapper.Map<List<QuestionSet>>(questionSetDatas);
            document.GoogleDocId = questionImport.GoogleDocUrl;
            //_documentRepository.UpdateEntity(document);
            // xóa các question set đã tạo
            _questionSetService.RemoveByDocumentId(questionImport.DocumentId);
            // xóa các question đã tạo 
            _questionSetService.CreateMany(questionSets);
            // update document google Doc Id
            // cập nhật document
           
            
            questionSets = DocumentHelper.MakeIndexQuestions(questionSets);
            return questionSets;
            //scope.Complete();
            //scope.Dispose();
            
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
        [HttpPost("getAll")]
        public List<DocumentTitleDto> GetByGradeAndSubject(DocumentGetByGradeSubjectDto request)
        {
            var documents = _documentService.GetAll(request);
            return _mapper.Map<List<DocumentTitleDto>>(documents);
        }
        [HttpPut]
        public void UpdateById(DocumentUpdateDto documentUpdate)
        {
            if (documentUpdate.Id == Guid.Empty)
            {
                throw new KeyNotFoundException("Dữ liệu không hợp lệ");
            } 
            _documentService.Update(documentUpdate);
        }
    }
}
