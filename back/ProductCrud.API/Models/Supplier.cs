using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ProductCrud.API.Models
{
    public class Supplier
    {
        public int Id { get; set; }

        [Required (ErrorMessage = "O campo nome é obrigatório.")]
        [StringLength(100)]
        public string Name { get; set; }
        
        public Supplier()
        {
            
        }
    }
}