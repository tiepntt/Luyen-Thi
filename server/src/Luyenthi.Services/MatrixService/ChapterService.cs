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
    public class ChapterService
    {
        private readonly ChapterRepository _chapterRepository;
        public ChapterService(
            ChapterRepository chapterRepository
            )
        {
            _chapterRepository = chapterRepository;
        }
        public List<Chapter> GetAll(Guid? gradeId, Guid? subjectId )
        {
            var chapters = _chapterRepository
                .Find(i => (gradeId == Guid.Empty || i.GradeId == gradeId) &&
                    (subjectId == Guid.Empty || i.SubjectId == subjectId))
                .Include(i => i.Subject)
                .Include(i => i.Grade).ToList();
            return chapters;
        }
        public Chapter GetById (Guid id)
        {

            var chapter =  _chapterRepository.Find(i => i.Id == id).Include(i => i.Subject).Include(i=> i.Grade).FirstOrDefault();
            if(chapter == null)
            {
                throw new KeyNotFoundException("Không tìm thấy bản ghi");
            }
            return chapter;
        }
        public Chapter Create(Chapter chapter)
        {
            _chapterRepository.Add(chapter);
            return chapter;
        }
        public Chapter Update(Chapter chapter)
        {
            _chapterRepository.UpdateEntity(chapter);
            return chapter;
        }
        public void Remove(Guid id)
        {
            _chapterRepository.RemoveById(id);
        }
    }
}
