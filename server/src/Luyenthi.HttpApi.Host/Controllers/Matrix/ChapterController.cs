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
        [HttpPost]
        public ChapterDto Create(ChapterCreateDto chapterCreate)
        {
            var chapter = _mapper.Map<Chapter>(chapterCreate);
            chapter = _chapterService.Create(chapter);
            return _mapper.Map<ChapterDto>(chapter);
        }
    }
}
