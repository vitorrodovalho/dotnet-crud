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

        /// <summary>
        /// Retorna todos os produtos cadastrados
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Products
                    .Include(p => p.Category)
                    .Include(p => p.Supplier)
                    .ToList());
            }
            catch (System.Exception e)
            {
                return BadRequest(new { message = "Erro ao buscar produtos", error = e.Message });
            }
        }

        /// <summary>
        /// Retorna um produto referenciada pelo Id enviado na requisição
        /// </summary>
        /// <param name="id">Id produto</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public IActionResult Get (int id)
        {
            try
            {
                var product = _context.Products.Include(p => p.Category)
                    .Include(p => p.Supplier)
                    .ToList()
                    .FirstOrDefault(prod => prod.Id == id);
                if (product == null)
                    return NotFound(new { message = "Nenhum produto encontrado para o Id informado" });
                return Ok(product);
            }
            catch (System.Exception e)
            {
                return BadRequest(new { message = "Erro ao buscar produto", error = e.Message });
            }
        }

        /// <summary>
        /// Cadastra o produto enviada no corpo da requisição
        /// </summary>
        /// <param name="product">Objeto produto</param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Post (Product product)
        {
            try
            {
                product.CreatedAt = DateTime.Now;
                _context.Products.Add(product);
                if(_context.SaveChanges() > 0)
                    return Ok(_context.Products.FirstOrDefault(prod => prod.Id == product.Id));
                else
                    return BadRequest(new { message = "Erro ao cadastrar produto" });
            }
            catch (System.Exception e)
            {
                return BadRequest(new { message = "Erro ao cadastrar produto", error = e.Message });
            }
        }

        /// <summary>
        /// Atualiza o produto referenciado pelo Id informado
        /// </summary>
        /// <param name="id">Id produto</param>
        /// <param name="product">Objeto produto</param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public IActionResult Put (int id, Product product)
        {
            try
            {
                if(product.Id != id)
                    return BadRequest(new { message = "Voce esta tentando atualizar um produto errado" });

                _context.Update(product);
                if(_context.SaveChanges() > 0)
                    return Ok(_context.Products.FirstOrDefault(prod => prod.Id == id));
                else
                    return BadRequest(new { message = "Erro ao atualizar produto" });
            }
            catch (System.Exception e)
            {
                return BadRequest(new { message = "Erro ao atualizar produto", error = e.Message });
            }
        }

        /// <summary>
        /// Deleta produto referenciado pelo Id informado
        /// </summary>
        /// <param name="id">Id produto</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public IActionResult Delete (int id)
        {
            try
            {
                var product = _context.Products.FirstOrDefault(prod => prod.Id == id);
                if(product == null)
                    return NotFound(new { message = "Voce esta tentando deletar um produto que nao existe"});

                _context.Remove(product);
                if(_context.SaveChanges() > 0)
                     return Ok(new { message = "Produto excluído com sucesso"});
                else
                    return BadRequest(new { message = "Erro ao excluir produto"});
            }
            catch (System.Exception e)
            {
                return BadRequest(new { message = "Erro ao excluir produto", error = e.Message });
            }
        }
    }
}