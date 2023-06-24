﻿// <auto-generated />
using EzraDND.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EzraDND.Migrations
{
    [DbContext(typeof(EzraDBContext))]
    [Migration("20211220052154_GoogleSignIn")]
    partial class GoogleSignIn
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("EzraDND.Models.Bubble", b =>
                {
                    b.Property<int>("RecordId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RecordId"), 1L, 1);

                    b.Property<int>("FormId")
                        .HasColumnType("int");

                    b.Property<string>("Html")
                        .HasColumnType("nvarchar(MAX)");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("RecordId");

                    b.ToTable("Bubble");
                });

            modelBuilder.Entity("EzraDND.Models.Form", b =>
                {
                    b.Property<int>("FormId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("FormId"), 1L, 1);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("Order")
                        .HasColumnType("int");

                    b.HasKey("FormId");

                    b.ToTable("Form");
                });

            modelBuilder.Entity("EzraDND.Models.Login", b =>
                {
                    b.Property<int>("RecordId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RecordId"), 1L, 1);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(MAX)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(MAX)");

                    b.Property<string>("Picture")
                        .HasColumnType("nvarchar(MAX)");

                    b.Property<string>("UserID")
                        .HasColumnType("nvarchar(MAX)");

                    b.HasKey("RecordId");

                    b.ToTable("Login");
                });

            modelBuilder.Entity("EzraDND.Models.Race", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"), 1L, 1);

                    b.Property<string>("description")
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("passives")
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("subRace")
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("traits")
                        .HasColumnType("nvarchar(500)");

                    b.HasKey("id");

                    b.ToTable("Race");
                });
#pragma warning restore 612, 618
        }
    }
}
