using AutoMapper;
using Luyenthi.Core;
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
           
            // question
            CreateMap<QuestionCreateDto, Question>();
            CreateMap<QuestionGdocDto, Question>();
            CreateMap<Question, QuestionDto>();
            // question set
            CreateMap<QuestionSetGdocDto, QuestionSet>();
            CreateMap<QuestionSet, QuestionSetDetailDto>();
            // subject
            CreateMap<Subject, SubjectDto>();
            //grade
            CreateMap<Grade, GradeDto>();
        }
    }
}
