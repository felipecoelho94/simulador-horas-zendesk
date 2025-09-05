# Simulador de Horas Zendesk

Este projeto é um scaffold de uma aplicação SaaS simples para simular horas de projetos Zendesk, utilizando Node.js (Express), React e PostgreSQL.

## Estrutura do Projeto

```
simulador-horas-zendesk/
 ├─ backend/             # Aplicação Node.js com Express
 │   ├─ src/
 │   │   ├─ index.js         # Servidor Express e API
 │   │   ├─ routes.js        # Definição de rotas
 │   │   ├─ db.js            # Configuração do pool de conexão com PostgreSQL
 │   │   └─ simulations.js   # Lógica de simulação de horas
 │   ├─ package.json
 │   └─ .env.example
 ├─ frontend/            # Aplicação React
 │   ├─ src/
 │   │   ├─ App.jsx          # Componente principal com formulário de simulação
 │   │   └─ index.js
 │   ├─ package.json
 ├─ sql/                 # Scripts SQL para o banco de dados
 │   └─ schema.sql           # Definição do esquema do banco de dados
 ├─ README.md            # Este arquivo
 └─ .gitignore
```

## Setup Local

Siga os passos abaixo para configurar e rodar o projeto localmente.

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend/` baseado no `.env.example`:

```bash
cp backend/.env.example backend/.env
```

Edite o arquivo `backend/.env` e configure a variável `DATABASE_URL` com a string de conexão do seu banco de dados PostgreSQL. Exemplo:

```
DATABASE_URL=postgresql://user:password@host:port/database
```

### 2. Banco de Dados

Certifique-se de ter um servidor PostgreSQL rodando. Você pode usar o Supabase para um setup rápido e gratuito.

Execute o script `schema.sql` para criar as tabelas necessárias no seu banco de dados. Você pode usar um cliente PostgreSQL (como `psql` ou DBeaver) para isso:

```bash
psql -h <seu_host> -U <seu_usuario> -d <seu_banco> -f sql/schema.sql
```

### 3. Backend

Navegue até a pasta `backend/` e instale as dependências:

```bash
cd backend
npm install
```

Para iniciar o servidor backend:

```bash
npm start
# ou para desenvolvimento com hot-reload:
npm run dev
```

O backend estará rodando em `http://localhost:3001` (ou na porta definida pela variável de ambiente `PORT`).

### 4. Frontend

Navegue até a pasta `frontend/` e instale as dependências:

```bash
cd frontend
npm install
```

Para iniciar a aplicação React:

```bash
npm start
```

O frontend estará rodando em `http://localhost:3000`.

## Deploy

### Backend (Render)

1. Crie uma nova Web Service no Render.
2. Conecte seu repositório GitHub.
3. Configure o `Build Command` como `npm install`.
4. Configure o `Start Command` como `npm start`.
5. Adicione a variável de ambiente `DATABASE_URL` com o valor do seu banco de dados Supabase (ou outro PostgreSQL).

### Frontend (Vercel)

1. Crie um novo projeto na Vercel.
2. Conecte seu repositório GitHub.
3. A Vercel detectará automaticamente que é um projeto React (Create React App).
4. Certifique-se de que o `Build Command` e `Output Directory` estão corretos (geralmente `npm run build` e `build/`).

### Banco de Dados (Supabase)

1. Crie um novo projeto no Supabase.
2. Obtenha a string de conexão do seu banco de dados (Settings -> Database -> Connection String).
3. Use esta string de conexão na variável `DATABASE_URL` do seu backend.
4. Execute o `schema.sql` no SQL Editor do Supabase para criar as tabelas.

## Exemplo de Payload para `/api/simulate`

Consulte o arquivo `example_simulation_payload.json` na raiz do projeto para um exemplo de como enviar dados para o endpoint de simulação.