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
    public class UnitService
    {
        private readonly UnitRepository _unitRepository;
        public UnitService(
            UnitRepository unitRepository)
        {
            _unitRepository = unitRepository;
        }
        public Unit Create(Unit unit)
        {
            _unitRepository.Add(unit);
            return unit;
        }
        public Unit Update(UnitUpdateDto unitUpdate)
        {
            var unit = _unitRepository.Get(unitUpdate.Id);
            if(unit == null)
            {
                throw new KeyNotFoundException("Không tìm thấy bản ghi");
            }
            unit.Name = unitUpdate.Name;
            _unitRepository.UpdateEntity(unit);
            return unit;
        }
        public List<Unit> GetAllByChapter(Guid? chapterId)
        {
            var units = _unitRepository.Find(i => chapterId==Guid.Empty || i.ChapterId == chapterId).Include(u => u.TemplateQuestions).ToList();
            return units;
        }
        public Unit GetById(Guid id)
        {
            var unit = _unitRepository.Find(i => i.Id == id).Include(i => i.Chapter).FirstOrDefault();
            return unit;
        }
        public void RemoveById(Guid Id)
        {
            var unit = _unitRepository.Get(Id);
            if(unit == null)
            {
                throw new KeyNotFoundException("Không tìm thấy bản ghi");
            }
            _unitRepository.RemoveEntity(unit);
        }
        
    }
}
