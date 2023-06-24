using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EzraDND.Models
{
    public class Bubble
    {
        [Key]
        public int RecordId { get; set; }

        public int FormId { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string Html { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Name { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string Image { get; set; }

        [Column(TypeName = "bit")]
        public bool UseImage { get; set;}

    }
}
