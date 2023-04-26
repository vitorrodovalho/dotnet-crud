using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProductCrud.API.Data;
using ProductCrud.API.Models;

namespace ProductCrud.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SupplierController : ControllerBase
    {
        public DataContext _context;

        public SupplierController(DataContext context)
        {
            _context = context;            
        }

        /// <summary>
        /// Retorna todos os fornecedores cadastrados
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Suppliers);
            }
            catch (System.Exception e)
            {
                return BadRequest(new { message = "Erro ao buscar fornecedores", error = e.Message });
            }
        }

        /// <summary>
        /// Retorna um fornecedor referenciada pelo Id enviado na requisição
        /// </summary>
        /// <param name="id">Id fornecedor</param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var supplier = _context.Suppliers.FirstOrDefault(sup => sup.Id == id);
                if (supplier == null)
                    return NotFound(new { message = "Nenhum fornecedor encontrado para o Id informado"});
                return Ok(supplier);
            }
            catch (System.Exception e)
            {
                return BadRequest(new { message = "Erro ao buscar fornecedor", error = e.Message });
            }
        }

        /// <summary>
        /// Cadastra o fornecedor enviada no corpo da requisição
        /// </summary>
        /// <param name="supplier">Objeto fornecedor</param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Post (Supplier supplier)
        {
            try
            {
                _context.Suppliers.Add(supplier);
                if(_context.SaveChanges() > 0)                
                    return Ok(_context.Suppliers.FirstOrDefault(sup => sup.Id == supplier.Id));
                else
                    return BadRequest(new { message = "Erro ao cadastrar fornecedor"});
            }
            catch (System.Exception e)
            {                
                return BadRequest(new { message = "Erro ao cadastrar fornecedor", error = e.Message });
            }
        }

        /// <summary>
        /// Atualiza o fornecedor referenciado pelo Id informado
        /// </summary>
        /// <param name="id">Id fornecedor</param>
        /// <param name="supplier">Objeto fornecedor</param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public IActionResult Put (int id, Supplier supplier)
        {
            try
            {
                if(supplier.Id != id)
                    return BadRequest(new { message = "Voce esta tentando atualizar um fornecedor errado" });

                _context.Update(supplier);
                if(_context.SaveChanges() > 0)
                    return Ok(_context.Suppliers.FirstOrDefault(sup => sup.Id == id));
                else
                    return BadRequest(new { message = "Erro ao atualizar fornecedor" });
            }
            catch (System.Exception e)
            {
                return BadRequest(new { message = "Erro ao atualizar fornecedor", error = e.Message });
            }
        }

        /// <summary>
        /// Deleta fornecedor referenciado pelo Id informado
        /// </summary>
        /// <param name="id">Id fornecedor</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public IActionResult Delete (int id)
        {
            try
            {
                var supplier = _context.Suppliers.FirstOrDefault(sup => sup.Id == id);
                if(supplier == null)
                    return NotFound(new { message = "Voce esta tentando deletar um fornecedor que não existe"});
                    
                _context.Remove(supplier);
                if(_context.SaveChanges() > 0)
                    return Ok(new { message = "Fornecedor excluído com sucesso"});
                else
                    return BadRequest(new { message = "Erro ao excluir fornecedor"});
            }
            catch (System.Exception e)
            {
                return BadRequest(new { message = "Erro ao excluir fornecedor", error = e.Message });
            }
        }
    }
}