# API de Controle Financeiro (dindin)

Esta é uma RESTful API construída para gerenciar um sistema de controle financeiro. A API permite que os usuários realizem as seguintes operações:

- Cadastrar Usuário
- Fazer Login
- Detalhar Perfil do Usuário Logado
- Editar Perfil do Usuário Logado
- Listar Categorias
- Listar Transações
- Detalhar Transação
- Cadastrar Transação
- Editar Transação
- Remover Transação
- Obter Extrato de Transações
- [Extra] Filtrar Transações por Categoria
  
## Tecnologias / Bibliotecas Utilizadas
- Node.js
- Express.js
- PostgreSQL
- bcrypt
- JSON Web Tokens (JWT)
- nodemon

## Banco de Dados

A API utiliza um banco de dados PostgreSQL com as seguintes tabelas e colunas:

### Tabela "usuarios"

- id
- nome
- email (campo único)
- senha

### Tabela "categorias"

- id
- descricao

### Tabela "transacoes"

- id
- descricao
- valor
- data
- categoria_id
- usuario_id
- tipo

## Princípios Incorporados

- Validação de campos obrigatórios
- Criptografia de senha antes de salvar no banco de dados
- Manipulação de dados de usuários, categorias e transações no banco de dados
- Utilização de status codes adequados nas respostas da API
- Validação de token de autenticação em todas as funcionalidades

## Endpoints

Aqui estão os principais endpoints da API:

### Cadastrar Usuário

`POST /usuario`

Permite cadastrar um novo usuário no sistema. O corpo da requisição deve incluir nome, email e senha. Em caso de sucesso, a resposta inclui o ID do usuário cadastrado.

### Fazer Login

`POST /login`

Permite que um usuário cadastrado faça login no sistema. O corpo da requisição deve incluir email e senha. Em caso de sucesso, a resposta inclui um token de autenticação e informações do usuário logado.

### Detalhar Perfil do Usuário Logado

`GET /usuario`

Retorna informações detalhadas do perfil do usuário logado.

### Editar Perfil do Usuário Logado

`PUT /usuario`

Permite que o usuário logado edite seu perfil, incluindo nome, email e senha.

### Listar Categorias

`GET /categoria`

Lista todas as categorias cadastradas no sistema.

### Listar Transações do Usuário Logado

`GET /transacao`

Lista todas as transações associadas ao usuário logado.

### Detalhar uma Transação do Usuário Logado

`GET /transacao/:id`

Retorna detalhes de uma transação específica do usuário logado.

### Cadastrar Transação para o Usuário Logado

`POST /transacao`

Permite que o usuário logado cadastre uma nova transação. O corpo da requisição deve incluir descrição, valor, data, categoria e tipo.

### Atualizar Transação do Usuário Logado

`PUT /transacao/:id`

Permite que o usuário logado atualize uma transação existente.

### Excluir Transação do Usuário Logado

`DELETE /transacao/:id`

Permite que o usuário logado exclua uma transação existente.

### Obter Extrato de Transações

`GET /transacao/extrato`

Retorna um extrato das transações do usuário logado, incluindo a soma das transações de entrada e saída.

### Filtrar Transações por Categoria

Na funcionalidade de listagem de transações do usuário logado (GET /transacao), é possível filtrar as transações por categoria, utilizando o parâmetro de consulta "filtro".

#### Exemplo de Filtro por Categoria

`GET /transacao?filtro[]=roupas&filtro[]=salários`

Lista transações apenas das categorias "Roupas" e "Salários" do usuário logado.

Lembre-se de que todos os endpoints requerem autenticação através de token Bearer Token.

Esta é uma visão geral da API de Controle Financeiro (Dindin). Para mais detalhes sobre cada endpoint e suas funcionalidades, consulte a documentação da API.

## Status Codes

Aqui estão os principais status codes utilizados na API:

- 200 (OK): Requisição bem sucedida
- 201 (Created): Requisição bem sucedida e algo foi criado
- 204 (No Content): Requisição bem sucedida, sem conteúdo no corpo da resposta
- 400 (Bad Request): Erro de sintaxe/formato na requisição
- 401 (Unauthorized): Usuário não autenticado (não logado)
- 403 (Forbidden): Usuário não tem permissão para acessar o recurso
- 404 (Not Found): Recurso não encontrado
