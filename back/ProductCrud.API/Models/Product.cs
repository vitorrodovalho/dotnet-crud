using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ProductCrud.API.Models
{
    public class Product
    {
        public int Id { get; set; }
                
        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        public int CategoryId { get; set; }

        public int SupplierId { get; set; }

        [Required]
        [StringLength(300)]
        public string Description { get; set; }

        public DateTime CreatedAt { get; set; }
        
        public Product()
        {
            
        }
    }
}