using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EzraDND.Models
{
    public class EzraDBContext:DbContext
    {
        public EzraDBContext(DbContextOptions<EzraDBContext> options):base(options)
        {


        }

        public DbSet<Form> Form { get; set; }

        public DbSet<Bubble> Bubble { get; set; }

        public DbSet<Login> Login { get; set; }

        public DbSet<AuthorizedUsers> AuthorizedUsers { get; set; }
    }
}
