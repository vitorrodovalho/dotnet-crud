using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ProductCrud.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController
    {
        public DbContext _context;

        public ProductController(DbContext context)
        {
            _context = context;            
        }

        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return _context.Products;
        }

        [HttpGet("{id}")]
        public Product Get (int id)
        {
            return _context.Products.FirstOrDefault(prod => prod.Id == id);
        }

        [HttpPost]
        public Product Post (Product product)
        {
            _context.Products.Add(product);
            if(_context.SaveChanges() > 0)
                return _context.Products.FirstOrDefault(prod => prod.Id == product.Id);
            else
                throw new Exception("Voce nao conseguiu adicionar um produto");
        }

        [HttpPut("{id}")]
        public Product Put (int id, Product product)
        {
            if(product.Id != id)
            throw new Exception("Voce esta tentando atualizar um produto errado");

            _context.Update(product);
            if(_context.SaveChanges() > 0)
                return _context.Products.FirstOrDefault(prod => prod.Id == id);
            else
                return new Product();
        }

        [HttpDelete("{id}")]
        public bool Delete (int id)
        {
            var product = _context.Products.FirstOrDefault(prod => prod.Id == id);
            if(product == null)
                throw new Exception("Voce esta tentando deletar um produto que nao existe");

            _context.Remove(product);
            return _context.SaveChanges() > 0;
        }
    }
}