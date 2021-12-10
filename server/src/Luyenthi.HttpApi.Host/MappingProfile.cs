using AutoMapper;
using Luyenthi.Core;
using Luyenthi.Core.Dtos;
using Luyenthi.Domain;
using Luyenthi.Domain.User;
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
            CreateMap<Document, DocumentPreviewDto>();
            // documentHistory
            CreateMap<DocumentHistory, DocumentHistoryDto>();

            // question
            CreateMap<QuestionCreateDto, Question>();
            CreateMap<QuestionGdocDto, Question>();
            CreateMap<Question, QuestionDto>();
            CreateMap<Question, QuestionMatrixDto>();
            CreateMap<Question, QuestionCorrectAnswerDto>();
            CreateMap<QuestionHistory, QuestionHistoryDto>();
            CreateMap<QuestionHistoryRequestDto, QuestionHistory>();
            // question set
            CreateMap<QuestionSetGdocDto, QuestionSet>();
            CreateMap<QuestionSetCreateDto, QuestionSet>();
            CreateMap<QuestionSet, QuestionSetDetailDto>();
            CreateMap<QuestionSet, QuestionMatrixDto>();
            CreateMap<QuestionSet, QuestionSetDto>();
            // subject
            CreateMap<Subject, SubjectDto>();
            //grade
            CreateMap<Grade, GradeDto>();
            // chapter
            CreateMap<Chapter, ChapterDto>();
            CreateMap<Chapter, ChapterDetailDto>();
            CreateMap<ChapterCreateDto, Chapter>();
            // unit 
            CreateMap<Unit, UnitDetailDto>();
            CreateMap<Unit, UnitDto>();
            CreateMap<UnitCreateDto, Unit>();
            CreateMap<UnitUpdateDto, Unit>();
            // tempalteQuestion
            CreateMap<TemplateQuestion, TemplateQuestionDto>();
            CreateMap<TemplateQuestion, TemplateQuestionDetailDto>();
            CreateMap<TemplateCreateDto, TemplateQuestion>();
            // user
            CreateMap<ApplicationUser, UserInfoDto>();
            CreateMap<UserRequestRegister, ApplicationUser>();
            CreateMap<UserCreateRequest, ApplicationUser>();
            CreateMap<ApplicationUser, UserTitleDto>();
            // tempalte
            CreateMap<TemplateDocument, TemplateDocumentDto>();
            CreateMap<TemplateQuestionSet, TemplateQuestionSetDto>();
            CreateMap<TemplateQuestionGenerate, TemplateQuestionGenerateDto>();
        }
    }
}
