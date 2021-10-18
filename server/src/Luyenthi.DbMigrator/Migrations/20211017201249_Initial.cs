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
