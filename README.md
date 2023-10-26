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

Se preferir, pode executar a API em container Docker. Para isso, siga as instruções abaixo:

1. Copie o arquivo .env.example para .env
2. Ajuste os valores do arquivo de acordo com o seu ambiente

## Build

```bash
docker build . -t dummybank-api:1.0.0
```

## Executar

```bash
docker run -d -p 8080:8080 --name dummybank-api --env-file .env dummybank-api:1.0.0
```

# Docker Compose

Você também tem a possibilidade de executar a API sem ter que realizar nenhuma configuração prévia. Nem mesmo criar uma instância de PostgreSQL. Para isso, existe um docker-compose.yml com todos os recursos necessários para a execução da API, bem como o build da imagem e criação do seu container. Basta executar o comando abaixo:

```bash
docker compose up -d
```

# Documentação

A documentação completa está disponível na rota /docs da API.

Exemplo: Se você optou por executar a API via Docker Compose, a documentação está acessível em http://localhost:8080/docs.
