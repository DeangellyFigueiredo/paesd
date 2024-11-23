# Plataforma de Atendimento em Saúde Digital

A **Plataforma de Atendimento em Saúde Digital** é uma aplicação que gerencia consultas, médicos e pacientes, facilitando o agendamento e acompanhamento médico de forma digital.

## Instruções para Configuração e Execução

### 1. Clone o repositório

Faça o clone do repositório para sua máquina local:

```bash
git clone <URL_DO_REPOSITORIO>
```

### 2. Entre na pasta do projeto

Acesse a pasta raiz do projeto:

```bash
cd paesd
```

### 3. Instale as dependências

Utilize o Yarn para instalar todas as dependências necessárias:

```bash
yarn
```

### 4. Gere o cliente do Prisma

Gere os arquivos do cliente Prisma com o seguinte comando:

```bash
npx prisma generate
```

### 5. Configure o banco de dados

Aplique as migrações para preparar o banco de dados:

```bash
npx prisma migrate dev
```

### 6. Inicie o servidor

Execute o servidor no modo de desenvolvimento:

```bash
yarn start:dev
```

Pronto!
O servidor estará rodando e acessível em: http://localhost:3000.

Comandos Resumidos

```bash
git clone <URL_DO_REPOSITORIO>
cd plataforma-saude-digital
yarn
npx prisma generate
npx prisma migrate dev
yarn start:dev
```
