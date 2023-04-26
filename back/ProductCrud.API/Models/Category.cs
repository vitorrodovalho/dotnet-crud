using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductCrud.API.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        public int MasterCategoryId { get; set; }
        
        [ForeignKey("MasterCategoryId")]
        public Category MasterCategory { get; set; }

        public Category()
        {
            
        }
    }
}