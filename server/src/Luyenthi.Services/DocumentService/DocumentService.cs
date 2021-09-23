using Google.Apis.Docs.v1;
using Luyenthi.Core.Dtos.Document;
using Luyenthi.Core.Dtos.GoogleDoc;
using Luyenthi.Services.GoolgeAPI;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Services
{
    public class DocumentService
    {
        private readonly DocsService _gdocService;
        public DocumentService()
        {
            _gdocService = GoogleDocApi.GetService();
        }
        public async Task<dynamic> ImportDocument(DocumentImportRequestDto documentRequest) {
            var doc = await GoogleDocApi.GetDocument(_gdocService, documentRequest.GoogleDocId);
            var structuralElements = doc.Body.Content;
            var docParseService = new ParseDoc(structuralElements, new List<ImageDto>());
            var docResult = docParseService.Parse();
            // parse google doc
            return docResult;
        }
    }
}
