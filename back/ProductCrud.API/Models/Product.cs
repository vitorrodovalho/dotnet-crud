using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductCrud.API.Models
{
    public class Product
    {
        public int Id { get; set; }
                
        [Required (ErrorMessage = "O campo nome é obrigatório.")]
        [StringLength(100)]
        public string Name { get; set; }

        [Required (ErrorMessage = "O campo categoria é obrigatório.")]
        public int CategoryId { get; set; }

        [Required (ErrorMessage = "O campo fornecedor é obrigatório.")]
        public int SupplierId { get; set; }

        [Required (ErrorMessage = "O campo descrição é obrigatório.")]
        [StringLength(300)]
        public string Description { get; set; }

        public DateTime CreatedAt { get; set; }

        [ForeignKey("CategoryId")]
        public Category Category { get; set; }

        [ForeignKey("SupplierId")]
        public Supplier Supplier { get; set; }
        
        public Product()
        {
            
        }
    }
}