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
        [HttpPost]
        public UnitDto CreateUnit(UnitCreateDto unitCreate)
        {
            var unit = _mapper.Map<Unit>(unitCreate);
            unit = _unitService.Create(unit);
            return _mapper.Map<UnitDto>(unit);
        }
        [HttpGet("{id}")]
        public UnitDetailDto GetUnitById(Guid id)
        {
            var unit = _unitService.GetById(id);
            return _mapper.Map<UnitDetailDto>(unit);
        }
        [HttpDelete("{id}")]
        public void DeleteUnitById(Guid id)
        {
             _unitService.RemoveById(id);
        }
        [HttpPut]
        public UnitDto Update(UnitUpdateDto unitUpdate)
        {
            var unit = _unitService.Update(unitUpdate);
            return _mapper.Map<UnitDto>(unit);
        }
    }
}
