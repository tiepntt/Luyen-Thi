using Luyenthi.Domain;
using Luyenthi.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Services
{
    public class TemplateDocumentService
    {
        private readonly TemplateDocumentRepository _templateDocumentRepository;
        private readonly TemplateQuestionSetRepository _templateQuestionSetRepository;
        public TemplateDocumentService(
            TemplateDocumentRepository templateDocumentRepository,
            TemplateQuestionSetRepository templateQuestionSetRepository)
        {
            _templateDocumentRepository = templateDocumentRepository;
            _templateQuestionSetRepository = templateQuestionSetRepository;
        }
        public TemplateDocument GetTemplate(Guid GradeId, Guid SubjectId) {
            var template = _templateDocumentRepository.Find(t => t.GradeId == GradeId && t.SubjectId == SubjectId)
                 .Take(1)
                 .Select(s => new TemplateDocument {
                     Id = s.Id,
                     BackgroundUrl = s.BackgroundUrl,
                     BannerUrl = s.BannerUrl,
                     GradeId = s.GradeId,
                     SubjectId = s.SubjectId,
                     Name=s.Name,
                     TemplateQuestionSets = s.TemplateQuestionSets.Select(tqs => new TemplateQuestionSet {
                         Id = tqs.Id,
                         Name = tqs.Name,
                         Show = tqs.Show,
                         TemplateDocumentId = tqs.TemplateDocumentId,
                         QuestionGenerates = tqs.QuestionGenerates.Select(q => new TemplateQuestionGenerate
                         {
                             Id = q.Id,
                             GradeId = q.GradeId,
                             ChapterId = q.ChapterId,
                             UnitId = q.UnitId,
                             TemplateQuestionId = q.TemplateQuestionId,
                             TemplateLevelGenarates = q.TemplateLevelGenarates.Select(tq =>
                                                        new TemplateLevelGenerate {
                                                            Id = tq.Id,
                                                            LevelQuestionId = tq.LevelQuestionId,
                                                            OrderNumber = tq.OrderNumber,
                                                            Count = tq.Count,
                                                            LevelQuestion=tq.LevelQuestion
                                                        }).ToList()

                         }).ToList()

                     }).ToList()
                 })
                .FirstOrDefault();
            return template;
        }
        public TemplateDocument Create(TemplateDocument template)
        {
            _templateDocumentRepository.Add(template);
            return template;
        }
        public TemplateDocument GetById(Guid Id)
        {
            return _templateDocumentRepository.Find(i => i.Id == Id).Take(1)
                .Include(t => t.TemplateQuestionSets)
                .FirstOrDefault();
            
        }
        public TemplateDocument Update(TemplateDocument template)
        {
            _templateDocumentRepository.UpdateEntity(template);
            return template;
        }
        
    }
}
