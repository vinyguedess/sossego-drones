# Sossego Drones

## 1. Introdução
Aplicação teste responsável pelo Gerencimanto de Drones.

## 2. Instalação
De preferência mantenha dois terminais abertos.

### 2.1. Instalando a API
Copie o arquivo .env.default para .env e preencha os acessos ao banco de dados, logo após:
```bash
    cd api
    npm install
    npm run build
```

### 2.2. Instalando o Cliente
```
    cd client
    npm install
```

### 3. Executando aplicativos
Ambos os aplicativos executam ao digitar o comando abaixo no terminal na respectiva pasta de cada um:
```bash
    npm run start
```

### 4. Dockerfile
Ambos os aplicativos tem Dockerfile configurados. Apenas gere uma build e execute o projeto para testar.
A API expõe a porta 3001 e o Cliente expõe a porta 3000.