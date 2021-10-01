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
            document.NameNomarlize = DocumentHelper.ConvertToUnSign(document.Name);
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
        public List<Document> GetAll( DocumentGetByGradeSubjectDto request)
        {
            var documents = _documentRepository.Find(d =>
                                            (request.GradeId == Guid.Empty || d.GradeId == request.GradeId) &&
                                            (request.SubjectId == Guid.Empty || d.SubjectId ==request.SubjectId)&&
                                            (EF.Functions.Like(d.Name, $"%{request.Key}%")||EF.Functions.Like(d.NameNomarlize, $"%{request.Key}%"))&&
                                            (request.Status ==d.Status||request.Status ==null)&&
                                            (request.Type == d.DocumentType || request.Type == null)
                                            ).Take(request.Take).Skip(request.Skip).ToList();
            return documents;
        }
        
    }
}
