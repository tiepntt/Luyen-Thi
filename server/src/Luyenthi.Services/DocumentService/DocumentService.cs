using Google.Apis.Docs.v1;
using Luyenthi.Core;
using Luyenthi.Core.Dtos;
using Luyenthi.Core.Enums;
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
                .FirstOrDefault();
            return document;
        }
        public async Task<Document> GetDetailById(Guid Id)
        {
            var document =  await _documentRepository.Find(s => s.Id == Id)
                .Select(d => new Document
                {
                    Id = d.Id,
                    Name = d.Name,
                    Description = d.Description,
                    DocumentType = d.DocumentType,
                    QuestionSets = d.QuestionSets
                                    .Select(qs => new QuestionSet { 
                                        Show = qs.Show,
                                        Name = qs.Name,
                                        Questions = qs.Questions.Select(q => new Question
                                        {
                                            Id = q.Id,
                                            Introduction = q.Introduction,
                                            Content = q.Content,
                                            SubQuestions = q.SubQuestions.Select(sq => new Question {
                                                Id = q.Id,
                                                Introduction = q.Introduction,
                                                Content = q.Content,
                                                ParentId = q.ParentId,
                                            }).ToList()
                                        }).ToList()
                                    }).ToList()
                })
                .FirstOrDefaultAsync();
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
        public async Task<List<Document>> GetAll( DocumentGetByGradeSubjectDto request)
        {
            var documents = await _documentRepository.Find(d =>
                                            (request.GradeId == Guid.Empty || d.GradeId == request.GradeId) &&
                                            (request.SubjectId == Guid.Empty || d.SubjectId ==request.SubjectId)&&
                                            (EF.Functions.Like(d.Name, $"%{request.Key}%")||EF.Functions.Like(d.NameNomarlize, $"%{request.Key}%"))&&
                                            (request.Status ==d.Status||request.Status ==null)&&
                                            (request.Type == d.DocumentType || request.Type == null)
                                            )
                .OrderByDescending(i => i.CreatedAt)
                .Skip(request.Skip)
                .Take(request.Take).ToListAsync();
            return documents;
        }
        public async Task<int> CountAll(DocumentGetByGradeSubjectDto request)
        {
            var count = await _documentRepository.Find(d =>
                                            (request.GradeId == Guid.Empty || d.GradeId == request.GradeId) &&
                                            (request.SubjectId == Guid.Empty || d.SubjectId == request.SubjectId) &&
                                            (EF.Functions.Like(d.Name, $"%{request.Key}%") || EF.Functions.Like(d.NameNomarlize, $"%{request.Key}%")) &&
                                            (request.Status == d.Status || request.Status == null) &&
                                            (request.Type == d.DocumentType || request.Type == null)
                                            ).CountAsync();
            return count;
        }
        public Document Update(DocumentUpdateDto documentUpdate) {

            var document = _documentRepository.Get(documentUpdate.Id);
            if(document == null)
            {
                throw new KeyNotFoundException("Không tìm thấy tài liệu");
            }
            document.GradeId = documentUpdate.GradeId;
            document.SubjectId = documentUpdate.SubjectId;
            document.GoogleDocId = documentUpdate.GoogleDocId;
            document.ImageUrl = documentUpdate.ImageUrl;
            document.Name = documentUpdate.Name;
            document.ShuffleType = documentUpdate.ShuffleType;
            document.Status = documentUpdate.Status;
            document.Times = documentUpdate.Times;
            document.Form = documentUpdate.Form;
            document.Description = documentUpdate.Description;
            document.DocumentType = documentUpdate.DocumentType;
            _documentRepository.UpdateEntity(document);
            return document;
        }
        
        
    }
}
