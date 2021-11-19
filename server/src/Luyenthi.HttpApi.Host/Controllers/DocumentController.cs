using AutoMapper;
using Luyenthi.Core;
using Luyenthi.Core.Dtos;
using Luyenthi.Core.Dtos.Document;
using Luyenthi.Core.Dtos.GoogleDoc;
using Luyenthi.Core.Enums;
using Luyenthi.Domain;
using Luyenthi.Domain.User;
using Luyenthi.EntityFrameworkCore;
using Luyenthi.Services;
using Luyenthi.Services.GoolgeAPI;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        private readonly DocumentRepository _documentRepository;
        private readonly DocumentHistoryRepository _documentHistoryRepository;
        private readonly DocumentHistoryService _documentHistoryService;
        private readonly IMapper _mapper;

        public DocumentController(
            DocumentService documentService,
            IWebHostEnvironment hostEnvironment,
            QuestionSetService questionSetService,
            QuestionService questionService,
            DocumentRepository documentRepository,
            DocumentHistoryRepository documentHistoryRepository,
            DocumentHistoryService documentHistoryService,
        IMapper mapper
            )
        {
            _documentService = documentService;
            _hostingEnvironment = hostEnvironment;
            _questionSetService = questionSetService;
            _questionService = questionService;
            _documentRepository = documentRepository;
            _documentHistoryRepository = documentHistoryRepository;
            _documentHistoryService = documentHistoryService;
            _mapper = mapper;
        }
        [HttpGet("preview/{Id}")]
        public DocumentPreviewDto GetPreview(Guid Id)
        {
            ApplicationUser user = (ApplicationUser)HttpContext.Items["User"];
            var document =   _documentService.GetDetailById(Id);
            var questionSets = document.QuestionSets;
            var numberQuestion = questionSets.SelectMany(i => i.Questions)
                .SelectMany(q => q.Type == QuestionType.QuestionGroup ? q.SubQuestions : new List<Question> { q })
                .Count();
            questionSets = DocumentHelper.MakeIndexQuestions(questionSets);
            var result = new DocumentPreviewDto
            {
                Id = document.Id,
                Name = document.Name,
                Times = document.Times,
                Description = document.Description,
                NumberQuestion = numberQuestion,
                QuestionSets = _mapper.Map<List<QuestionSetDetailDto>>(questionSets)
            };
        // lấy ra lần gần nhất làm bài
      
            if (user != null)
            {
                var  history = _documentHistoryService.GetExitDocument(user.Id, Id);
                result.DocumentHistory = _mapper.Map<DocumentHistoryDto>(history);
            }

            return result;
        }
        [HttpGet]
        public DocumentSearchResponse GetDocuments([FromQuery] DocumentQuery query)
        {
            // lấy tất cả theo kênh tìm kiếm
            var result = new DocumentSearchResponse();

            var documents = _documentRepository.Find(
                d =>
                d.IsApprove == true &&
                d.Status == DocumentStatus.Public &&
                (query.Type == null || d.DocumentType == query.Type) &&
                (query.GradeCode == null || query.GradeCode == d.Grade.Code) &&
                (query.SubjectCode == null || query.SubjectCode == d.Subject.Code) &&
                (EF.Functions.Like(d.Name, $"%{query.Key}%") || EF.Functions.Like(d.NameNomarlize, $"%{query.Key}%"))
            )
            .Include(i => i.Grade)
            .Include(i => i.Subject)
            .OrderByDescending(i => i.CreatedAt);
            
            result.Documents = documents.Skip(query.Skip)
            .Take(query.Take)
            .Select(d => new DocumentTitleDto
            {
                Id = d.Id,
                Description = d.Description,
                ImageUrl = d.ImageUrl,
                NumberDo = d.DocumentHistories.Count(),
                Name = d.Name,
                DocumentType = d.DocumentType,
                CreatedAt = d.CreatedAt
            })
            .ToList(); ;
            result.Total = documents.Count();
            return result;
        }
        [HttpPost("import-document")]
        public dynamic ImportDocument(DocumentImportRequestDto request)
        {
            if (request.GoogleDocId == "")
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
            var documentHistory = _documentHistoryRepository.FindOne(i => i.DocumentId == questionImport.DocumentId);
            if (document == null)
            {
                throw new KeyNotFoundException("Không tìm thấy tài liệu");
            }
            if (documentHistory != null)
            {
                throw new Exception("Tài liệu này đã được sử dụng");
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
                    uploadImages.Add(CloudinarySerivce.DownLoadImageFromDoc(cloundinaryService, inlineObject));
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
            await _questionSetService.RemoveByDocumentId(questionImport.DocumentId);
            // xóa các question đã tạo 
            _questionSetService.CreateMany(questionSets);
            // update document google Doc Id
            // cập nhật document
            _documentRepository.UpdateEntity(document);

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
        [HttpGet("getAll")]
        public async Task<DocumentGetAllDto> GetByGradeAndSubject([FromQuery] DocumentGetByGradeSubjectDto request)
        {
            var documentTask = _documentService.GetAll(request);
            var countTask = _documentService.CountAll(request);
            await Task.WhenAll(documentTask, countTask);

            return new DocumentGetAllDto {
                Documents = _mapper.Map<List<DocumentTitleDto>>(documentTask.Result),
                Total = countTask.Result
            }; 
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
        [HttpPatch("approve/{id}")]
        public void Approve(Guid id)
        {
            var document = _documentService.GetById(id);
            if(document == null)
            {
                throw new KeyNotFoundException("Không tìm thấy bản ghi");
            }
            document.IsApprove = true;
            _documentRepository.UpdateEntity(document);
        }
        [HttpGet("rank/{documentId}")]
        public List<DocumentHistoryRank> GetRanks(Guid documentId)
        {
            ApplicationUser user = (ApplicationUser)HttpContext.Items["User"];
            var histories = _documentHistoryService.GetRankInDocument(documentId);
            // lấy top 10
            var results = histories
                .Select((h,index) => new DocumentHistoryRank 
                {
                    User=_mapper.Map<UserTitleDto>(h.User),
                    NumberCorrect=h.NumberCorrect,
                    Rank = index + 1,
                    TimeDuration=h.TimeDuration
                }).ToList();
            if(user != null)
            {
                var userRank = histories.FirstOrDefault(h => h.CreatedBy == user.Id);
                if(userRank != null)
                {
                    var userRankIndex = histories.ToList().IndexOf(userRank);
                    if(userRankIndex >= 10)
                    {
                        results.Add(new DocumentHistoryRank {

                            User = _mapper.Map<UserTitleDto>(user),
                            NumberCorrect = userRank.NumberCorrect,
                            Rank = userRankIndex + 1,
                            TimeDuration = userRank.TimeDuration
                        });
                    }
                }
            }
            
            return results;
        }
        [HttpPut("update-matrix")]
        [Authorize(Role.Admin)]
        public void UpdateMatrix(DocumentUpdateMatrixRequest request)
        {
            // lấy tất cả question có trong documentId
            var questionSets = _questionSetService.GetByDocumentId(request.Id);
            var questions = questionSets.SelectMany(qs => qs.Questions);
            foreach(Question question in questions)
            {
                question.ChapterId = request.ChapterId;
                question.SubjectId = request.SubjectId;
                question.UnitId = request.UnitId;
                question.GradeId = request.GradeId;
                question.TemplateQuestionId = request.TemplateQuestionId;
                question.LevelId = request.LevelId;
            }
            questions = _questionService.UpdateMany(questions.ToList());  
        }
        
    }
}
