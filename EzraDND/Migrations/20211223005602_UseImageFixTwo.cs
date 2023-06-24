using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EzraDND.Migrations
{
    public partial class UseImageFixTwo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UseBubbleImage",
                table: "Bubble");

            migrationBuilder.RenameColumn(
                name: "UseTabImage",
                table: "Bubble",
                newName: "UseImage");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UseImage",
                table: "Bubble",
                newName: "UseTabImage");

            migrationBuilder.AddColumn<bool>(
                name: "UseBubbleImage",
                table: "Bubble",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
