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
            try
            {
                return Ok(_context.Categories);
            }
            catch (System.Exception e)
            {
                return BadRequest(new { message = "Erro ao buscar categorias", error = e.Message });
            }            
        }

        [HttpGet("{id}")]
        public IActionResult Get (int id)
        {
            try
            {
                var category = _context.Products.FirstOrDefault(prod => prod.Id == id);
                if (category == null)
                    return NotFound(new {message = "Nenhum produto encontrado para o Id informado"});
                return Ok(category);
            }
            catch (System.Exception e)
            {
                return BadRequest(new { message = "Erro ao buscar categoria", error = e.Message });
            }
        }

        [HttpPost]
        public IActionResult Post (Category category)
        {
            try
            {
                _context.Categories.Add(category);
                if(_context.SaveChanges() > 0)
                    return Ok(_context.Categories.FirstOrDefault(cat => cat.Id == category.Id));
                else
                    return BadRequest(new { message = "Erro ao cadastrar categoria. " });
            }
            catch (System.Exception e)
            {
                return BadRequest(new { message = "Erro ao cadastrar categoria", error = e.Message });
            }

        }

        [HttpPut("{id}")]
        public IActionResult Put (int id, Category category)
        {
            try
            {
                if(category.Id != id)
                    return BadRequest(new { message = "Voce esta tentando atualizar uma categoria errada" });

                _context.Update(category);
                if(_context.SaveChanges() > 0)
                    return Ok(_context.Categories.FirstOrDefault(cat => cat.Id == id));
                else
                    return BadRequest(new { message = "Erro ao atualizar categoria" });
            }
            catch (System.Exception e)
            {
                return BadRequest(new { message = "Erro ao atualizar categoria", error = e.Message });
            }

        }

        [HttpDelete("{id}")]
        public IActionResult Delete (int id)
        {
            try
            {
                var category = _context.Categories.FirstOrDefault(cat => cat.Id == id);
                if(category == null)
                    return BadRequest(new { message = "Voce esta tentando deletar uma categoria que nao existe" });
                    
                _context.Remove(category);
                if(_context.SaveChanges() > 0)
                    return Ok("Categoria excluído com sucesso");
                else
                    return BadRequest(new { message = "Erro ao excluir categoria" });
            }
            catch (System.Exception e)
            {
                return BadRequest(new { message = "Erro ao excluir categoria", error = e.Message });
            }
        }
    }
}