using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ProductCrud.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            var user = GetUserFromDatabase(model.Email, model.Password);
            if (user == null)
            {
                return BadRequest(new { message = "E-mail ou senha inválidos." });
            }

            var token = _authService.GenerateJwtToken(user);

            return Ok(new { token });
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterModel model)
        {
            // Adicione código para criar um novo usuário no banco de dados
            return Ok();
        }

        [HttpPost("refresh-token")]
        public IActionResult RefreshToken([FromBody] RefreshTokenModel model)
        {
            // Adicione código para renovar o token JWT
            return Ok();
        }

        [Authorize]
        [HttpGet("protected")]
        public IActionResult Protected()
        {
            // Adicione código para retornar recursos protegidos
            return Ok();
        }

        private User GetUserFromDatabase(string email, string password)
        {
            // Adicione código para buscar um usuário no banco de dados com base no e-mail e senha
            return new User
            {
                Id = 1,
                Name = "Usuário de Exemplo",
                Email = email,
                Password = password
            };
        }
    }
}