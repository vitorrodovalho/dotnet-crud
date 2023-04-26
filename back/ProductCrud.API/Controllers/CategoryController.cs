using System.Linq;
using Microsoft.AspNetCore.Mvc;
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

        /// <summary>
        /// Retorna todos as categorias cadastradas
        /// </summary>
        /// <returns></returns>
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

        /// <summary>
        /// Retorna uma categoria referenciada pelo Id enviado na requisição
        /// </summary>
        /// <param name="id">Id categoria</param>
        /// <returns></returns>
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

        /// <summary>
        /// Cadastra a categoria enviada no corpo da requisição
        /// </summary>
        /// <param name="category">Objeto categoria</param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Post (Category category)
        {
            try
            {
                _context.Categories.Add(category);
                if(_context.SaveChanges() > 0)
                    return Created($"/api/category/{category.Id}", _context.Categories.FirstOrDefault(cat => cat.Id == category.Id));
                else
                    return BadRequest(new { message = "Erro ao cadastrar categoria. " });
            }
            catch (System.Exception e)
            {
                return BadRequest(new { message = "Erro ao cadastrar categoria", error = e.Message });
            }

        }

        /// <summary>
        /// Atualiza a categoria referenciada pelo Id informado
        /// </summary>
        /// <param name="id">Id categoria</param>
        /// <param name="category">Objeto categoria</param>
        /// <returns></returns>
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

        /// <summary>
        /// Deleta categoria referenciada pelo Id informado
        /// </summary>
        /// <param name="id">Id categoria</param>
        /// <returns></returns>
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
                    return Ok(new { message = "Categoria excluído com sucesso" });
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