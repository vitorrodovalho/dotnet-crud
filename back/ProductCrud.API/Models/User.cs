using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ProductCrud.API.Models
{
    public class User
    {
        public int Id { get; set; }
        
        [Required (ErrorMessage = "O campo email é obrigatório.")]
        [StringLength(100)]
        public string Email { get; set; }

        [Required (ErrorMessage = "O campo senha é obrigatório.")]
        [StringLength(100)]
        public string Password { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}