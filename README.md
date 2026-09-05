# Product Manager

Sistema web para gerenciamento de produtos desenvolvido como teste técnico.

A aplicação permite cadastrar, visualizar, editar e excluir produtos, utilizando uma API REST com Node.js e Express, banco de dados MySQL e frontend desenvolvido com HTML, CSS e JavaScript puro.

## Tecnologias

* Node.js
* Express
* MySQL
* mysql2
* HTML5
* CSS3
* JavaScript

## Funcionalidades

* Um bom, velho e atual crud de produtos (cadastro, listagem geral, listagem por BYD, edição BYD e remoção BYD de produtos)
* Persistência dos dados em MySQL
* Data de cadastro gerada automaticamente pelo banco de dados
* Interface web responsiva

## Estrutura do projeto

```text
crud-produto-teste/
├── controllers/
│   └── productController.js
├── database/
│   ├── connection.js
│   └── schema.sql
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── routes/
│   └── productRoutes.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## Pré-requisitos

Para executar o projeto, é necessário ter instalado:

* [Node.js (versão LTS)](https://nodejs.org/pt-br/download)
* [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

O Node.js inclui o npm, utilizado para instalar as dependências do projeto.

O MySQL é utilizado como banco de dados da aplicação.


## Configuração do banco de dados

O projeto utiliza o banco de dados MySQL.

### 1. Criar o banco e a tabela

Execute o script localizado em:

```text
database/schema.sql
```

O script cria o banco de dados `product_crud` e a tabela `products`.

### 2. Configurar as credenciais

Na raiz do projeto, crie um arquivo chamado:

```text
.env
```

Utilize o arquivo `.env.example` como referência:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=product_crud
```

Substitua `sua_senha` pela senha configurada no seu MySQL.

> O arquivo `.env` não deve ser versionado, pois contém informações de configuração e credenciais locais.

## Instalação

Na pasta do projeto, execute:

```bash
npm install
```

## Executando a aplicação

Após configurar o banco de dados e o arquivo `.env`, execute:

```bash
node server.js
```

O servidor será iniciado em:

```text
http://localhost:3000
```

Acesse esse endereço pelo navegador para utilizar a aplicação.

## API

A API utiliza a rota base:

```text
/api/products
```

### Listar produtos

```http
GET /api/products
```

### Buscar produto por ID

```http
GET /api/products/:id
```

### Criar produto

```http
POST /api/products
```

Exemplo de corpo:

```json
{
    "user": "Lulurinho",
    "description": "BYD seal",
    "quantity": 1,
    "price": 245000.00
}
```

### Atualizar produto

```http
PUT /api/products/:id
```

Exemplo de corpo:

```json
{
    "user": "Lulurinho",
    "description": "BYD seal com motor de uno mille",
    "quantity": 1,
    "price": 1555000.00
}
```

### Excluir produto

```http
DELETE /api/products/:id
```

## Observações

A aplicação utiliza uma conexão com MySQL através do pacote `mysql2`.

As credenciais do banco são carregadas através de variáveis de ambiente utilizando o arquivo `.env`.

O frontend é servido diretamente pelo Express e não depende de frameworks externos.

## Git

O projeto foi desenvolvido utilizando Git, mantendo commits separados por etapas de desenvolvimento e evolução das funcionalidades.
