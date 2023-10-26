# Dummy Bank API

API do banco Dummy Bank

# Funcionalidades

- CRUD de contas
- Realização de depósitos, saques e PIX

# Testes

Não é necessário banco de dados para os testes pois o projeto utiliza o pg-mem.

## Executar testes

```bash
yarn test
```

## Executar teste com coleta de cobertura

```bash
yarn test:cov
```

# Executar

Para executar a API, siga as instruções abaixo:

1. Copie o arquivo .env.example para .env
2. Ajuste os valores do arquivo de acordo com o seu ambiente

## Modo de desenvolvimento

```bash
yarn start:dev
```

## Modo de produção

```bash
yarn build && yarn start:prod
```

# Docker

Caso prefira, existe um docker-compose no projeto que cria uma instância de PostgreSQL pronta para o projeto (Com as credenciais que constam no arquivo .docker/postgresql/.env). Basta executar o comando abaixo:

```bash
docker compose up -d
```

# Documentação

A documentação completa está disponível na rota /docs da API.
