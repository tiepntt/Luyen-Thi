using AutoMapper;
using Luyenthi.Core.Dtos;
using Luyenthi.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Luyenthi.HttpApi.Host
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            // document
            CreateMap<DocumentCreateDto, Document>();
            CreateMap<Document, DocumentDto>();
            CreateMap<Document, DocumentGetDto>();
            CreateMap<Document, DocumentTitleDto>();
            CreateMap<Grade, GradeDto > ();
            // questin
            CreateMap<QuestionCreateDto, Question>();
            CreateMap<Question, QuestionDto>();
            CreateMap<Subject, SubjectDto>();
        }
    }
}
