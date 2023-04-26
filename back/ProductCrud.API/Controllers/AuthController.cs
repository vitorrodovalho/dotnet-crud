using Microsoft.AspNetCore.Mvc;
using ProductCrud.API.Models;

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
        public IActionResult Login([FromBody] User user)
        {
            try
            {
                var userResponse = _authService.GetUserFromDatabase(user.Email, user.Password);
                if (userResponse == null)
                {
                    return BadRequest(new { message = "E-mail ou senha inválidos." });
                }

                var token = _authService.GenerateJwtToken(user);
                return Ok(new { message = "Login realizado com sucesso", token });
            }
            catch (System.Exception e)
            {
                return BadRequest(new { message = "Erro ao realizar login", error = e.Message });
            }
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            try
            {
                if (_authService.GetUserByEmail(user.Email) != null)
                {
                    return BadRequest(new { message = "O e-mail informado já está em uso." });
                }

                _authService.CreateUser(user);
                return Ok(new { message = "Usuário cadastrado com sucesso" });
            }
            catch (System.Exception e)
            {
                return BadRequest(new { message = "Erro ao cadastar usuário", error = e.Message });
            }
        }
    }
}