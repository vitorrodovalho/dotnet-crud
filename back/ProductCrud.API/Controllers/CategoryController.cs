using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductCrud.API.Data;
using ProductCrud.API.Models;

namespace ProductCrud.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController
    {
        public DataContext _context;

        public CategoryController(DataContext context)
        {
            _context = context;            
        }

        [HttpGet]
        public IEnumerable<Category> Get()
        {
            return _context.Categories;
        }

        [HttpGet("{id}")]
        public Category Get (int id)
        {
            return _context.Categories.FirstOrDefault(cat => cat.Id == id);
        }

        [HttpPost]
        public Category Post (Category category)
        {
            _context.Categories.Add(category);
            if(_context.SaveChanges() > 0)
                return _context.Categories.FirstOrDefault(cat => cat.Id == category.Id);
            else
                throw new Exception("Voce nao conseguiu adicionar uma categoria");
        }

        [HttpPut("{id}")]
        public Category Put (int id, Category category)
        {
            if(category.Id != id)
            throw new Exception("Voce esta tentando atualizar uma categoria errada");

            _context.Update(category);
            if(_context.SaveChanges() > 0)
                return _context.Categories.FirstOrDefault(cat => cat.Id == id);
            else
                return new Category();
        }

        [HttpDelete("{id}")]
        public bool Delete (int id)
        {
            var category = _context.Categories.FirstOrDefault(cat => cat.Id == id);
            if(category == null)
                throw new Exception("Voce esta tentando deletar uma categoria que nao existe");
                
            _context.Remove(category);
            return _context.SaveChanges() > 0;
        }
    }
}