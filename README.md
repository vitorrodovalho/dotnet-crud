# ProductCrud

Projeto para gerenciamento do cadastro de produtos, categorias e fornecedores com restrição de acesso mediante a cadastro de usuário.
Desenvolvido em dotnet 5 para o back-end e utilizado React para o front-end.
Disponibiliza o recurso gerenciamento dos cadastros por meio de API REST, possibilitando assim a busca, cadastro, atualização e deleção de cada elemento do sistema.
Todo ambiente front-end utiliza as API's disponibilizadas para realizar as operações, mantendo assim os controladores de forma centralizada.
Os cadastros são armazenados no arquivo "ProductCrud.db" para o banco de dados SQLite.

## Arquitetura

### Front-end

-   react: com react-bootstrap para criação de componentes e elementos utilizando o Bootstrap
-   node: servidor para aplicação front
-   npm: gerenciamento de depedências

### Back-end

-   dotnet: versão 5.0.408
-   Entity Framework: 5.0.10
-   IdentityModel: 5.6.0

## Login

![Alt Text](https://vitortoledo.com.br/gif/login.gif)

Realiza o login do usuário validando no sistema se o email e senha informados existem no banco de dados e são válidos.

## Cadastro

![Alt Text](https://vitortoledo.com.br/gif/cadastro.gif)

Realiza o cadastro do usuário com base no nome , email e senha informados no formulário.

## Produtos

![Alt Text](https://vitortoledo.com.br/gif/produto.gif)

Gerencia o cadastro de produtos, relacionado com categoria e fornecedor informado.

## Categorias

![Alt Text](https://vitortoledo.com.br/gif/categoria.gif)

Gerencia o cadastro de categorias, relacionando com outra cetegoria.

## Fornecedores

![Alt Text](https://vitortoledo.com.br/gif/fornecedor.gif)

Gerencia o cadastro de fornecedor.

## API

API para gerenciamento de recursos do sistema, o padrão de envio dos dados e as respostas no formato JSON.

Exemplo retorno GET produtos api.

````json
[
	{
		"id": 33,
		"name": "Produto 1",
		"categoryId": 4,
		"supplierId": 2,
		"description": "Descricacao Atualizada",
		"createdAt": "2023-04-27T00:35:18.2414574",
		"category": {
			"id": 4,
			"name": "Calçado",
			"masterCategoryId": 0,
			"masterCategory": null
		},
		"supplier": {
			"id": 2,
			"name": "Loja 1"
		}
	}
]
```

### Produtos

| Método | Path                 | Descrição                                                     |
| ------ | -------------------- | ------------------------------------------------------------- |
| GET    | /api​/Product        | Retorna todos os produtos cadastrados                         |
| POST   | /api​/Product        | Cadastra o produto enviada no corpo da requisição             |
| GET    | ​/api​/Product​/{id} | Retorna um produto referenciada pelo Id enviado na requisição |
| PUT    | ​/api​/Product​/{id} | Atualiza o produto referenciado pelo Id informado             |
| DELETE | ​/api​/Product​/{id} | Deleta produto referenciado pelo Id informado                 |

### Categorias

| Método | Path                  | Descrição                                                        |
| ------ | --------------------- | ---------------------------------------------------------------- |
| GET    | /api​/Category        | Retorna todos as categorias cadastrados                          |
| POST   | /api​/Category        | Cadastra a categoria enviada no corpo da requisição              |
| GET    | ​/api​/Category​/{id} | Retorna uma categoria referenciada pelo Id enviado na requisição |
| PUT    | ​/api​/Category​/{id} | Atualiza a categoria referenciado pelo Id informado              |
| DELETE | ​/api​/Category​/{id} | Deleta categoria referenciado pelo Id informado                  |

### Fornecedores

| Método | Path                  | Descrição                                                        |
| ------ | --------------------- | ---------------------------------------------------------------- |
| GET    | /api​/Supplier        | Retorna todos os fornecedores cadastrados                        |
| POST   | /api​/Supplier        | Cadastra o fornecedor enviado no corpo da requisição             |
| GET    | ​/api​/Supplier​/{id} | Retorna um fornecedor referenciada pelo Id enviado na requisição |
| PUT    | ​/api​/Supplier​/{id} | Atualiza o fornecedor referenciado pelo Id informado             |
| DELETE | ​/api​/Supplier​/{id} | Deleto fornecedor referenciado pelo Id informado                 |

### Auth

| Método | Path               | Descrição                                                                                                                    |
| ------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| POST   | /api/Auth/login    | Método que realiza o login do usuário, validando email e senha informados Gera o token para a seção e retorna o token gerado |
| POST   | /api/Auth/register | Método que realiza o cadastro do usuário no banco de dados Realiza a validação se já possui o email informado cadastrado     |

## Autenticação

Utiliza o JWT para validação e autentição do usuário, quando realizado o login o sistema gera o token válido e retorna na requisição.
O front-end armazena o token no navegador e utilizada para acessar páginas restritas que realizam a validação.
Para validar é feito a geração e comparação com uma chave utilizada para gerar o token.

## Banco de Dados

Foi utilizado o banco de dados SQLite junto com o Entity Framework para controlar e gerenciar os registros no banco.
Também utilizou o recurso de migrations do EF para realizar a criação dos modelos e campos no banco de dados.
````
