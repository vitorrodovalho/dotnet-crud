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
    public class CategoryController : ControllerBase
    {
        public DataContext _context;

        public CategoryController(DataContext context)
        {
            _context = context;            
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Categories);
        }

        [HttpGet("{id}")]
        public IActionResult Get (int id)
        {
            var category = _context.Products.FirstOrDefault(prod => prod.Id == id);
            if (category == null)
                return NotFound("Nenhum produto encontrado para o Id informado");
            return Ok(category);
        }

        [HttpPost]
        public IActionResult Post (Category category)
        {
            _context.Categories.Add(category);
            if(_context.SaveChanges() > 0)
                return Ok(_context.Categories.FirstOrDefault(cat => cat.Id == category.Id));
            else
                return BadRequest("Erro ao adicionar categoria");
        }

        [HttpPut("{id}")]
        public IActionResult Put (int id, Category category)
        {
            if(category.Id != id)
                return BadRequest("Voce esta tentando atualizar uma categoria errada");

            _context.Update(category);
            if(_context.SaveChanges() > 0)
                return Ok(_context.Categories.FirstOrDefault(cat => cat.Id == id));
            else
                return BadRequest("Erro ao atualizar categoria");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete (int id)
        {
            var category = _context.Categories.FirstOrDefault(cat => cat.Id == id);
            if(category == null)
                return BadRequest("Voce esta tentando deletar uma categoria que nao existe");
                
            _context.Remove(category);
            if(_context.SaveChanges() > 0)
                return Ok("Categoria excluído com sucesso");
            else
                return BadRequest("Erro ao excluir categoria");
        }
    }
}