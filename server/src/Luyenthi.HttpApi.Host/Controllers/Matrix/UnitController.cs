using AutoMapper;
using Luyenthi.Core.Dtos;
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
    public class UnitController : Controller
    {
        private readonly UnitService _unitService;
        private readonly IMapper _mapper;
        public UnitController(
            UnitService unitService,
            IMapper mapper
            )
        {
            _unitService = unitService;
            _mapper = mapper;
        }
        [HttpGet]
        public List<UnitDto> GetUnit([FromQuery(Name ="chapterId")] Guid? chapterId)
        {
            var units = _unitService.GetAllByChapter(chapterId);
            return _mapper.Map<List<UnitDto>>(units);
        }
    }
}
