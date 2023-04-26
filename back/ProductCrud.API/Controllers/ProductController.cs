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
    public class ProductController : ControllerBase
    {
        public DataContext _context;

        public ProductController(DataContext context)
        {
            _context = context;            
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Products
                        .Include(p => p.Category)
                        .Include(p => p.Supplier)
                        .ToList());
        }

        [HttpGet("{id}")]
        public IActionResult Get (int id)
        {
            var product = _context.Products.Include(p => p.Category)
                        .Include(p => p.Supplier)
                        .ToList()
                        .FirstOrDefault(prod => prod.Id == id);
            if (product == null)
                return NotFound("Nenhum produto encontrado para o Id informado");
            return Ok(product);
        }

        [HttpPost]
        public IActionResult Post (Product product)
        {
            product.CreatedAt = DateTime.Now;
            _context.Products.Add(product);
            if(_context.SaveChanges() > 0)
                return Ok(_context.Products.FirstOrDefault(prod => prod.Id == product.Id));
            else
                return BadRequest("Erro ao cadastrar produto");
        }

        [HttpPut("{id}")]
        public IActionResult Put (int id, Product product)
        {
            if(product.Id != id)
                return BadRequest("Voce esta tentando atualizar um produto errado");

            _context.Update(product);
            if(_context.SaveChanges() > 0)
                return Ok(_context.Products.FirstOrDefault(prod => prod.Id == id));
            else
                return BadRequest("Erro ao atualizar produto");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete (int id)
        {
            var product = _context.Products.FirstOrDefault(prod => prod.Id == id);
            if(product == null)
                return NotFound("Voce esta tentando deletar um produto que nao existe");

            _context.Remove(product);
            if(_context.SaveChanges() > 0)
                return Ok("Produto excluído com sucesso");
            else
                return BadRequest("Erro ao excluir produto");
        }
    }
}