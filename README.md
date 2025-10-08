# 🎬 Golden Raspberry Web (Frontend Angular)

Este projeto é um frontend desenvolvido em Angular 20 utilizando Angular Material para a avaliação **Golden Raspberry Awards**. A aplicação exibe uma listagem de filmes com filtros e paginação, além de um dashboard com estatísticas extraídas de uma API REST.

---

## 📋 Funcionalidades

### 🔍 Lista de Filmes
- Paginação
- Filtro por ano
- Filtro por vencedores

### 📊 Dashboard
- Anos com múltiplos vencedores
- Top 3 estúdios com mais vitórias
- Produtores com maior e menor intervalo entre vitórias
- Filmes vencedores por ano (filtro dinâmico)

---

## 🚀 Tecnologias Utilizadas

- Angular 20
- Angular Material
- Standalone Components
- TypeScript
- RxJS
- SCSS/CSS
- HttpClient com `provideHttpClient`

---

## 📁 Estrutura de Pastas

```bash
src/
├── app/
│   ├── modules/
│   │   ├── list/                # Lista de filmes
│   │   ├── dashboard/           # Dashboard com estatísticas
│   │   └── service/             # Serviços de comunicação com API
│   ├── admin/                   # Layout base (toolbar + sidenav)
│   ├── model/                   # Interfaces e tipos globais
│   ├── app.routes.ts            # Rotas principais
│   └── main.ts                  # Bootstrap com standalone
```

---

## 🛠️ Como instalar e rodar o projeto

### 📦 Pré-requisitos

- [Node.js](https://nodejs.org/) v20 ou superior
- [Angular CLI](https://angular.io/cli) (global) – opcional: `npm install -g @angular/cli`

### 🧰 Instalação

```bash
# Clone o repositório
git clone https://github.com/HendrewMartins/golden-raspberry-web.git

# Acesse a pasta do projeto
cd golden-raspberry-web

# Instale as dependências
npm install
```

---

### ▶️ Rodando o Projeto

```bash
# Inicie o servidor de desenvolvimento
npm start
# ou
ng serve
```

O app estará disponível em: [http://localhost:4200/#](http://localhost:4200/#)

---

## 🌐 Navegação

| Página         | Rota              | Descrição                          |
|----------------|-------------------|------------------------------------|
| Dashboard      | `/admin/dashboard`| Painel com estatísticas dos filmes |
| Lista de Filmes| `/admin/list`     | Tabela com filtros e paginação     |

---

## 🔗 Endpoints usados (Mock API ou Backend)

- `/movies?page=1&size=10&year=2020&winner=true`
- `/yearsWithMultipleWinners`
- `/studiosWithWinCount`
- `/maxMinWinIntervalForProducers`
- `/winnersByYear?year=2018`

> ✅ Os dados são carregados automaticamente ao iniciar o sistema.

---

## 🧪 Testes

Para rodar os testes unitários do projeto, utilize o comando abaixo. O Angular utiliza o Karma e Jasmine por padrão.

```bash
npm test
# ou
ng test
```
---

## 👨‍💻 Autor

- Nome: Hendrew Martins
- GitHub: [@hendrewmartins](https://github.com/HendrewMartins)

---
