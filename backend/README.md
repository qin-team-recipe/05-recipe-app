# 環境構築手順
## Install packages
プロジェクトルートで実行
```bash
$ npm install
```

## Add dotenv
backendディレクトリで実行
```bash
$ cd backend
$ cp .env.example .env
```

## Build Docker Containers

```bash
$ docker compose up -d
```

## Emulate S3
localstackにS3がモックされるまで少し時間がかかる。

localstackコンテナのログに`Ready`と表示されるか、`.docker/localstack`ディレクトリにpemファイルが生成されるまで待ってから以下を実行。

```bash
$ docker exec localstack aws --endpoint-url=http://localhost:4572 s3 mb s3://recipe-app/
```

`localhost:8000`にアクセスして、`recipe-app`バケットが作成されていればOK

## Migration
```bash
$ npm run migrate
```
## Init PrismaClient
```bash
$ npx prisma generate
```

## Others
backendディレクトリに`.git`が存在する場合は、削除する。
```bash
$ ls -a
.git

$ rm -rf .git
```

# Commands

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
