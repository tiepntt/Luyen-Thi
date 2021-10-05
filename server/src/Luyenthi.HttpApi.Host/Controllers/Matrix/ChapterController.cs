using AutoMapper;
using Luyenthi.Core.Dtos;
using Luyenthi.Domain;
using Luyenthi.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Luyenthi.HttpApi.Host.Controllers.Matrix
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChapterController : Controller
    {
        private readonly ChapterService _chapterService;
        private readonly IMapper _mapper;
        public ChapterController(
            ChapterService chapterService,
            IMapper mapper
            )
        {
            _chapterService = chapterService;
            _mapper = mapper;
        }
        [HttpGet]
        public List<ChapterDto> GetAll([FromQuery(Name ="gradeId")] Guid? gradeId, [FromQuery(Name = "subjectId")] Guid? subjectId)
        {
            var chapters = _chapterService.GetAll(gradeId, subjectId);
            return _mapper.Map<List<ChapterDto>>(chapters);
        }
        [HttpGet("{id}")]
        public ChapterDetailDto GetById(Guid id)
        {
            var chapter = _chapterService.GetById(id);
            if(chapter == null)
            {
                throw new KeyNotFoundException("Không tìm thấy bản ghi");
            }
            return _mapper.Map<ChapterDetailDto>(chapter);
        }
        [HttpPost]
        public ChapterDto Create(ChapterCreateDto chapterCreate)
        {
            var chapter = _mapper.Map<Chapter>(chapterCreate);
            chapter = _chapterService.Create(chapter);
            return _mapper.Map<ChapterDto>(chapter);
        }
        [HttpDelete("{id}")] 
        public void RemoveById(Guid id)
        {
            _chapterService.Remove(id);
        }
        [HttpPut]
        public ChapterDto Update(ChapterDto chapterUpadte)
        {
            var chapter = _chapterService.Update(chapterUpadte);
            return _mapper.Map<ChapterDto>(chapter);
        }
    }
}
