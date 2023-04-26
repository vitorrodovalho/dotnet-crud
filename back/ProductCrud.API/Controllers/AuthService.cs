using System;
using System.Text;
using ProductCrud.API.Models;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using ProductCrud.API.Data;
using System.Linq;

namespace ProductCrud.API.Controllers
{
    public class AuthService
    {
        private readonly DataContext _context;

        public AuthService(DataContext context)
        {
            _context = context;
        }
        
        /// <summary>
        /// Gera o token para realizar o token utilizando o token informado
        /// O token será utilizada também para validar se o login é válido
        /// </summary>
        /// <param name="user">Objeto usuário</param>
        /// <returns></returns>
        public string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("asdv234234^&%&^%&^hjsdfb2%%%");

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.Email)
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        /// <summary>
        /// Retorna o usuário através do email informado
        /// </summary>
        /// <param name="email">Email usuário</param>
        /// <returns></returns>
        public User GetUserByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email);
        }

        /// <summary>
        /// Retorna se possui um usuário com o email e senha informado
        /// Utilizado no processo de login para validar cadastro
        /// </summary>
        /// <param name="email">Email usuário</param>
        /// <param name="password">Senha usuário</param>
        /// <returns></returns>
        public User GetUserFromDatabase(string email, string password)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email && u.Password == password);
        }

        /// <summary>
        /// Cria um usuário no banco de dados
        /// </summary>
        /// <param name="user"></param>
        public void CreateUser(User user)
        {
            user.CreatedAt = DateTime.Now;
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        /// <summary>
        /// Atualiza o usuário no banco de dados
        /// </summary>
        /// <param name="user"></param>
        public void UpdateUser(User user)
        {
            _context.Users.Update(user);
            _context.SaveChanges();
        }

        /// <summary>
        /// Deleta o usuário do banco de dados
        /// </summary>
        /// <param name="user"></param>
        public void DeleteUser(User user)
        {
            _context.Users.Remove(user);
            _context.SaveChanges();
        }
    }
}