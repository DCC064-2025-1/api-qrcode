# API de Geração de QR Code e Controle de Presença

Uma simples API REST construída com Node.js e Express para gerar QR Codes únicos para eventos e registrar a presença dos participantes.

## ✨ Tecnologias

Este projeto foi construído com as seguintes tecnologias:

* **Node.js**: Ambiente de execução JavaScript.
* **TypeScript**: Superset do JavaScript com tipagem estática.
* **Express.js**: Framework para construção da API REST.
* **Prisma**: ORM para interação com o banco de dados.
* **SQLite**: Banco de dados utilizado para desenvolvimento.
* **Nodemon**: Ferramenta para reiniciar a API automaticamente durante o desenvolvimento.

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
* [Node.js](https://nodejs.org/en/) (versão **v20.6.0 ou superior** é recomendada).
* [NPM](https://www.npmjs.com/) (geralmente instalado junto com o Node.js).
* Um editor de código de sua preferência, como o [VS Code](https://code.visualstudio.com/).

## 🚀 Instalação e Execução

Siga os passos abaixo para configurar e rodar o projeto localmente.

**1. Clone o repositório**
```bash
git clone <URL_DO_SEU_REPOSITORIO>
```

**2. Acesse a pasta do projeto**

```bash
cd qrcode-sd
```

**3. Instale as dependências**
Este comando irá instalar todos os pacotes listados no package.json.
```bash
npm install
```

**4. Configure as Variáveis de Ambiente**
Crie um arquivo chamado .env na raiz do projeto. Ele será usado pelo Prisma para se conectar ao banco de dados.
```env
DATABASE_URL="file:./dev.db"
```

**5. Aplique as Migrações do Banco de Dados**
Este comando essencial irá ler seu ```schema.prisma``` e criar o arquivo do banco de dados SQLite com todas as tabelas necessárias.

```bash
npx prisma migrate dev
npx prisma db seed
```
Ao ser perguntado, dê um nome para a migração (ex: init).

**6. Inicie a API**
Agora, inicie o servidor em modo de desenvolvimento. O Nodemon irá monitorar alterações nos arquivos e reiniciar o servidor automaticamente.

```bash
npm run dev
```