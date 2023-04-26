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

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Suppliers);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var supplier = _context.Suppliers.FirstOrDefault(sup => sup.Id == id);
            if (supplier == null)
                return NotFound("Nenhum fornecedor encontrado para o Id informado");
            return Ok(supplier);
        }

        [HttpPost]
        public IActionResult Post (Supplier supplier)
        {
            _context.Suppliers.Add(supplier);
            if(_context.SaveChanges() > 0)                
                return Ok(_context.Suppliers.FirstOrDefault(sup => sup.Id == supplier.Id));
            else
                return BadRequest("Erro ao cadastrar fornecedor");
        }

        [HttpPut("{id}")]
        public IActionResult Put (int id, Supplier supplier)
        {
            if(supplier.Id != id)
                return BadRequest("Voce esta tentando atualizar um fornecedor errado");

            _context.Update(supplier);
            if(_context.SaveChanges() > 0)
                return Ok(_context.Suppliers.FirstOrDefault(sup => sup.Id == id));
            else
                return BadRequest("Erro ao atualizar fornecedor");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete (int id)
        {
            var supplier = _context.Suppliers.FirstOrDefault(sup => sup.Id == id);
            if(supplier == null)
                return NotFound("Voce esta tentando deletar um fornecedor que não existe");
                
            _context.Remove(supplier);
            if(_context.SaveChanges() > 0)
                return Ok("Fornecedor excluído com sucesso");
            else
                return BadRequest("Erro ao excluir fornecedor");
        }
    }
}