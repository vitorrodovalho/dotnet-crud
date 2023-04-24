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
    public class SupplierController
    {
        public DataContext _context;

        public SupplierController(DataContext context)
        {
            _context = context;            
        }

        [HttpGet]
        public IEnumerable<Supplier> Get()
        {
            return _context.Suppliers;
        }

        [HttpGet("{id}")]
        public Supplier Get (int id)
        {
            return _context.Suppliers.FirstOrDefault(sup => sup.Id == id);
        }

        [HttpPost]
        public Supplier Post (Supplier supplier)
        {
            _context.Suppliers.Add(supplier);
            if(_context.SaveChanges() > 0)
                return _context.Suppliers.FirstOrDefault(sup => sup.Id == supplier.Id);
            else
                throw new Exception("Voce nao conseguiu adicionar um fornecedor");
        }

        [HttpPut("{id}")]
        public Supplier Put (int id, Supplier supplier)
        {
            if(supplier.Id != id)
            throw new Exception("Voce esta tentando atualizar um fornecedor errado");

            _context.Update(supplier);
            if(_context.SaveChanges() > 0)
                return _context.Suppliers.FirstOrDefault(sup => sup.Id == id);
            else
                return new Supplier();
        }

        [HttpDelete("{id}")]
        public bool Delete (int id)
        {
            var supplier = _context.Suppliers.FirstOrDefault(sup => sup.Id == id);
            if(supplier == null)
                throw new Exception("Voce esta tentando deletar um fornecedor que nao existe");
                
            _context.Remove(supplier);
            return _context.SaveChanges() > 0;
        }
    }
}