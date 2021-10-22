using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Luyenthi.DbMigrator.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionSetQuestion_Questions_QuestionSetId",
                table: "QuestionSetQuestion");

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

            migrationBuilder.CreateIndex(
                name: "IX_QuestionSetQuestion_QuestionId",
                table: "QuestionSetQuestion",
                column: "QuestionId");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionSetQuestion_Questions_QuestionId",
                table: "QuestionSetQuestion",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionSetQuestion_Questions_QuestionId",
                table: "QuestionSetQuestion");

            migrationBuilder.DropIndex(
                name: "IX_QuestionSetQuestion_QuestionId",
                table: "QuestionSetQuestion");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "DocumentHistories");

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
                name: "FK_QuestionSetQuestion_Questions_QuestionSetId",
                table: "QuestionSetQuestion",
                column: "QuestionSetId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
