using Google.Apis.Docs.v1;
using Luyenthi.Core;
using Luyenthi.Core.Dtos;
using Luyenthi.Core.Dtos.Document;
using Luyenthi.Core.Dtos.GoogleDoc;
using Luyenthi.Domain;
using Luyenthi.EntityFrameworkCore;
using Luyenthi.Services.GoolgeAPI;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Services
{
    public class DocumentService
    {
        private readonly DocsService _gdocService;
        private readonly FileService _fileService;
        private readonly DocumentRepository _documentRepository;
        public DocumentService(
            FileService fileService, 
            DocumentRepository documentRepository)
        {
            _gdocService = GoogleDocApi.GetService();
            _fileService = fileService;
            _documentRepository = documentRepository;
        }
        public Document Create(Document document)
        {
            _documentRepository.Add(document);
            return document;
        } 
        public Document GetById(Guid Id)
        {
            var document = _documentRepository.Find(s => s.Id == Id)
                .Include(d => d.Subject)
                .Include(d => d.Grade)
                .Include(d => d.Parent)
                .FirstOrDefault();
            return document;
        }
        public void RemoveById(Guid id)
        {
            var document = _documentRepository.Get(id);
            if(document == null)
            {
                 throw new KeyNotFoundException("Không tìm thấy tài liệu");
            }
            _documentRepository.Remove(document);
        }

        public async Task<dynamic> ImportDocument(QuestionImportDto questionImport, string webRootPath) {
            if (questionImport.DocumentId == Guid.Empty || questionImport.GoogleDocId == "")
            {
                throw new Exception("Dữ liệu không hợp lệ");
            }
            var docService = GoogleDocApi.GetService();
            var doc = await GoogleDocApi.GetDocument(docService, questionImport.GoogleDocId);
            // download image
            List<Task<ImageDto>> uploadImages = new List<Task<ImageDto>>();
            var folderPath = Path.Combine(webRootPath, "uploads/questions");
            if (doc.InlineObjects != null)
            {
                for (int i = 0; i < doc.InlineObjects.Count; i++)
                {
                    var inlineObject = doc.InlineObjects.Values.ToList()[i];
                    uploadImages.Add(_fileService.DownLoadImageFromDoc(inlineObject, folderPath, "uploads/questions"));
                }
            }
            var tasks = uploadImages.ToArray();
            var imageResults = await Task.WhenAll(tasks);
            var images = imageResults.ToList();
            // parse doc
            var questionSetDatas = new ParseQuestionDocService(doc.Body.Content.ToList(), images).Parse();
            var questionSets = questionSetDatas.Select(questionSetData => {
                // add questions
                
                // return questionSet
                return questionSetData;
            });

            return questionSetDatas;
        }
        
    }
}
