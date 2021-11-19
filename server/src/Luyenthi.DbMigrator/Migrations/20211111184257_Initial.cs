using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Luyenthi.DbMigrator.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionHistories_DocumentHistories_DocumentHistoryId",
                table: "QuestionHistories");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestionSetQuestion_Questions_QuestionSetId",
                table: "QuestionSetQuestion");

            migrationBuilder.DropForeignKey(
                name: "FK_TemplateQuestionGenerates_Chapters_ChapterId",
                table: "TemplateQuestionGenerates");

            migrationBuilder.DropForeignKey(
                name: "FK_TemplateQuestionGenerates_TemplateQuestions_TemplateQuestion~",
                table: "TemplateQuestionGenerates");

            migrationBuilder.DropForeignKey(
                name: "FK_TemplateQuestionGenerates_Units_UnitId",
                table: "TemplateQuestionGenerates");

            migrationBuilder.AlterColumn<Guid>(
                name: "TemplateDocumentId",
                table: "TemplateQuestionSets",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci",
                oldClrType: typeof(Guid),
                oldType: "char(36)",
                oldNullable: true)
                .OldAnnotation("Relational:Collation", "ascii_general_ci");

            migrationBuilder.AlterColumn<Guid>(
                name: "UnitId",
                table: "TemplateQuestionGenerates",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci",
                oldClrType: typeof(Guid),
                oldType: "char(36)",
                oldNullable: true)
                .OldAnnotation("Relational:Collation", "ascii_general_ci");

            migrationBuilder.AlterColumn<Guid>(
                name: "TemplateQuestionId",
                table: "TemplateQuestionGenerates",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci",
                oldClrType: typeof(Guid),
                oldType: "char(36)",
                oldNullable: true)
                .OldAnnotation("Relational:Collation", "ascii_general_ci");

            migrationBuilder.AlterColumn<Guid>(
                name: "ChapterId",
                table: "TemplateQuestionGenerates",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci",
                oldClrType: typeof(Guid),
                oldType: "char(36)",
                oldNullable: true)
                .OldAnnotation("Relational:Collation", "ascii_general_ci");

            migrationBuilder.AddColumn<string>(
                name: "BackgroundUrl",
                table: "TemplateDocuments",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "BannerUrl",
                table: "TemplateDocuments",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<Guid>(
                name: "CreatedBy",
                table: "DocumentHistories",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci",
                oldClrType: typeof(Guid),
                oldType: "char(36)")
                .OldAnnotation("Relational:Collation", "ascii_general_ci");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "DocumentHistories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "TimeDuration",
                table: "DocumentHistories",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateIndex(
                name: "IX_QuestionSetQuestion_QuestionId",
                table: "QuestionSetQuestion",
                column: "QuestionId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionHistories_DocumentHistories_DocumentHistoryId",
                table: "QuestionHistories",
                column: "DocumentHistoryId",
                principalTable: "DocumentHistories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionSetQuestion_Questions_QuestionId",
                table: "QuestionSetQuestion",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TemplateQuestionGenerates_Chapters_ChapterId",
                table: "TemplateQuestionGenerates",
                column: "ChapterId",
                principalTable: "Chapters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TemplateQuestionGenerates_TemplateQuestions_TemplateQuestion~",
                table: "TemplateQuestionGenerates",
                column: "TemplateQuestionId",
                principalTable: "TemplateQuestions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TemplateQuestionGenerates_Units_UnitId",
                table: "TemplateQuestionGenerates",
                column: "UnitId",
                principalTable: "Units",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionHistories_DocumentHistories_DocumentHistoryId",
                table: "QuestionHistories");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestionSetQuestion_Questions_QuestionId",
                table: "QuestionSetQuestion");

            migrationBuilder.DropForeignKey(
                name: "FK_TemplateQuestionGenerates_Chapters_ChapterId",
                table: "TemplateQuestionGenerates");

            migrationBuilder.DropForeignKey(
                name: "FK_TemplateQuestionGenerates_TemplateQuestions_TemplateQuestion~",
                table: "TemplateQuestionGenerates");

            migrationBuilder.DropForeignKey(
                name: "FK_TemplateQuestionGenerates_Units_UnitId",
                table: "TemplateQuestionGenerates");

            migrationBuilder.DropIndex(
                name: "IX_QuestionSetQuestion_QuestionId",
                table: "QuestionSetQuestion");

            migrationBuilder.DropColumn(
                name: "BackgroundUrl",
                table: "TemplateDocuments");

            migrationBuilder.DropColumn(
                name: "BannerUrl",
                table: "TemplateDocuments");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "DocumentHistories");

            migrationBuilder.DropColumn(
                name: "TimeDuration",
                table: "DocumentHistories");

            migrationBuilder.AlterColumn<Guid>(
                name: "TemplateDocumentId",
                table: "TemplateQuestionSets",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci",
                oldClrType: typeof(Guid),
                oldType: "char(36)")
                .OldAnnotation("Relational:Collation", "ascii_general_ci");

            migrationBuilder.AlterColumn<Guid>(
                name: "UnitId",
                table: "TemplateQuestionGenerates",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci",
                oldClrType: typeof(Guid),
                oldType: "char(36)")
                .OldAnnotation("Relational:Collation", "ascii_general_ci");

            migrationBuilder.AlterColumn<Guid>(
                name: "TemplateQuestionId",
                table: "TemplateQuestionGenerates",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci",
                oldClrType: typeof(Guid),
                oldType: "char(36)")
                .OldAnnotation("Relational:Collation", "ascii_general_ci");

            migrationBuilder.AlterColumn<Guid>(
                name: "ChapterId",
                table: "TemplateQuestionGenerates",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci",
                oldClrType: typeof(Guid),
                oldType: "char(36)")
                .OldAnnotation("Relational:Collation", "ascii_general_ci");

            migrationBuilder.AlterColumn<Guid>(
                name: "CreatedBy",
                table: "DocumentHistories",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci",
                oldClrType: typeof(Guid),
                oldType: "char(36)",
                oldNullable: true)
                .OldAnnotation("Relational:Collation", "ascii_general_ci");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionHistories_DocumentHistories_DocumentHistoryId",
                table: "QuestionHistories",
                column: "DocumentHistoryId",
                principalTable: "DocumentHistories",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionSetQuestion_Questions_QuestionSetId",
                table: "QuestionSetQuestion",
                column: "QuestionSetId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TemplateQuestionGenerates_Chapters_ChapterId",
                table: "TemplateQuestionGenerates",
                column: "ChapterId",
                principalTable: "Chapters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TemplateQuestionGenerates_TemplateQuestions_TemplateQuestion~",
                table: "TemplateQuestionGenerates",
                column: "TemplateQuestionId",
                principalTable: "TemplateQuestions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TemplateQuestionGenerates_Units_UnitId",
                table: "TemplateQuestionGenerates",
                column: "UnitId",
                principalTable: "Units",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
