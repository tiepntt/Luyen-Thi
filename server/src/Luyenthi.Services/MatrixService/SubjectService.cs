using AutoMapper;
using Luyenthi.Core.Dtos;
using Luyenthi.Core.Enums;
using Luyenthi.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Luyenthi.Services
{
    public class SubjectService
    {
        private readonly SubjectRepository _subjectRepository;
        public SubjectService(
            SubjectRepository subjectRepository)
        {
            _subjectRepository = subjectRepository;
        }
        public List<DocumentSubjectDto> CountBySubject(bool IsApprove = true,
           DocumentStatus status = DocumentStatus.Public)
        {
            var grades =  _subjectRepository.GetAll()
                .Include(x => x.Documents.Where(x => x.IsApprove == IsApprove && x.Status == status))
                .OrderBy( x=> x.OrderNumber)
                .Select(x => new DocumentSubjectDto
                {
                    Id = x.Id,
                    Code = x.Code,
                    Name = x.Name,
                    Total = x.Documents.Count(x => x.IsApprove == IsApprove && x.Status == status),
                    Grades = x.Grades.Select(g => new GradeDto { Code =g.Code, Id =g.Id}).ToList()
                })
                .ToList();
            return grades;
        }
    }
}
