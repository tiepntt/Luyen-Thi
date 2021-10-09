using Luyenthi.Core.Dtos;
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
                .Find(i => ( i.GradeId == gradeId) &&
                    ( i.SubjectId == subjectId))
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
        public Chapter Update(ChapterDto chapterUpdate)
        {
            var chapter = _chapterRepository.Get(chapterUpdate.Id);
            chapter.Name = chapterUpdate.Name;
            chapter.SubjectId = chapterUpdate.SubjectId;
            chapter.GradeId = chapterUpdate.GradeId;
            _chapterRepository.UpdateEntity(chapter);
            return chapter;
        }
        public void Remove(Guid id)
        {
            var chapter = _chapterRepository.Get(id);
            if(chapter == null)
            {
                throw new KeyNotFoundException("Không tìm thấy bản ghi");
            }
            _chapterRepository.RemoveEntity(chapter);
        }
    }
}
