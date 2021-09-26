using Google.Apis.Docs.v1;
using Luyenthi.Core;
using Luyenthi.Core.Dtos.Document;
using Luyenthi.Core.Dtos.GoogleDoc;
using Luyenthi.Services.GoolgeAPI;
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
        public DocumentService(FileService fileService)
        {
            _gdocService = GoogleDocApi.GetService();
            _fileService = fileService;
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
            var docData = new ParseQuestionDocService(doc.Body.Content.ToList(), images).Parse();

            return docData;
        }
        
    }
}
