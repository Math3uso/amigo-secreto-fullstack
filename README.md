# Amigo Secreto - Fullstack App

Aplicação fullstack e responsiva criada para organizar e sortear participantes em grupos de amigo secreto. Este projeto utiliza tecnologias modernas como **Fastify (Node.js)** no back-end e **Next.js** no front-end.

---

## ✅ Funcionalidades (Requisitos Funcionais)

- Sistema de login e autenticação
- Criar grupos
- Entrar em grupos
- Adicionar participantes a um grupo
- Remover e editar grupos
- Expulsar participantes
- Criar links ou códigos de convite
- Sortear participantes de forma segura

---

## 📌 Regras de Negócio

- Somente o administrador (admin) pode excluir ou editar um grupo
- Somente o admin pode expulsar participantes
- Somente o admin pode realizar o sorteio
- Não é possível visualizar o resultado do sorteio de outros participantes
- Um usuário pode participar de quantos grupos quiser
- O sorteio só pode ser feito se houver no mínimo 2 participantes
- O usuário precisa estar autenticado para usar a plataforma

---

## 🛠 Tecnologias

### Front-end
- Next.js
- TailwindCSS
- TypeScript
- Shadcn/UI
- Zod
- Material UI

### Back-end
- Node.js (Fastify)
- Zod
- Prisma ORM
- Docker
- PostgreSQL

---

## 🚀 Rodando o Projeto

### 1. Clonando o repositório

```bash
git clone https://github.com/Math3uso/amigo-secreto-fullstack.git
```

Depois, navegue até a pasta do projeto:
```bash
cd ./amigo-secreto-fullstack
```


## 2. Iniciando Back-end

Iniciando o Back-end
Acesse a pasta da API:
```bash
cd ./api
```

Crie um arquivo .env na raiz da API com o seguinte conteúdo:

```bash
NODE_ENV=dev

# JWT
JWT_SECRET=secret
JWT_REFRESH_SECRET=SCRETREFRASH


# Database
DATABASE_URL="postgresql://docker:docker@localhost:5432/apipg?schema=public"
```
Depois, instale as dependências e inicie os containers:
```bash
npm install && docker compose up -d && npx prisma migrate dev
```

Por fim, inicie o servidor:
```base
npm run dev
```
O back-end estará rodando na porta 3001.

## Iniciando Front-end

na raiz do projeto, vá para:
```bash
cd ./web
```

Crie o arquivo .env com o seguinte conteúdo:
```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```
por fim, instale as dependencias e inicie o projeto
```bash
npm install
npm run dev
```
ou 
```bash
npm install --legacy-peer-deps
npm run dev
```
