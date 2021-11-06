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
        public List<DocumentGradeDto> CountByGrades(bool IsApprove = true,
           DocumentStatus status = DocumentStatus.Public)
        {
            var grades = _gradeRepository.GetAll()
                .Include(x => x.Documents.Where(x => x.IsApprove == IsApprove && x.Status == status))
                .Include(x => x.Subjects)
                .OrderBy(x => x.OrderNumber)
                .Select(x => new DocumentGradeDto
                {
                    Id = x.Id,
                    Code = x.Code,
                    Name = x.Name,
                    Total = x.Documents.Count(x => x.IsApprove == IsApprove && x.Status == status),
                    Subjects = x.Subjects.Select(s => new SubjectDto { Code = s.Code, Id = s.Id }).ToList()
                })
                .ToList();
            return grades;
        }
        public List<Grade> GetAll()
        {
            var grades =  _gradeRepository.GetAll()
                .ToList();
            return grades;
        }
        
    }
}
