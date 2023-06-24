using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EzraDND.Migrations
{
    public partial class UseImageFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "useImage",
                table: "Bubble",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "useImage",
                table: "Bubble");
        }
    }
}
