using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EzraDND.Models
{
    public class AuthorizedUsers
    {
        [Key]
        public int RecordId { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string UserId { get; set; }
    }
}
