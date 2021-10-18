using Luyenthi.Core.Dtos;
using Luyenthi.Core.Enums;
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
    public class GradeService
    {
        private readonly GradeRepository _gradeRepository;
        public GradeService(
            GradeRepository gradeRepository)
        {
            _gradeRepository = gradeRepository;
        }
        public async Task<List<DocumentGradeDto>> CountByGrades(bool IsApprove = true,
           DocumentStatus status = DocumentStatus.Public)
        {
            var grades = await _gradeRepository.GetAll()
                .Include(x => x.Documents.Where(x => x.IsApprove == IsApprove && x.Status == status))
                .OrderBy(x => x.OrderNumber)
                .Select(x => new DocumentGradeDto
                { 
                    Id = x.Id,
                    Code = x.Code,
                    Name = x.Name,
                    Total = x.Documents.Count()
                })
                .ToListAsync();
            return grades;
        }
        public async Task<List<Grade>> GetAll()
        {
            var grades = await _gradeRepository.GetAll()
                .ToListAsync();
            return grades;
        }
    }
}
