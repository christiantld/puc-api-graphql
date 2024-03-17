Exemplo de um CRUD com Node.js e GraphQl com Apollo Server.

## Requisitos
- Node.js
- NPM

## Instalação



```bash
git clone git@github.com:christiantld/puc-api-graphql.git
npm install
```

## Execução
```bash
npm run dev
```

## Rotas

A aplicação estará disponível em `http://localhost:4000/` onde será possível acessar o playground do GraphQl.

As Querys disponíveis para consulta são
- `users` - Retorna todos os usuários
- `user` - Retorna um usuário específico pelo ID
- `tasks` - Retorna todas as tarefas
- `task` - Retorna uma tarefa específica pelo ID
- `completedTasks` - Retorna todas as tarefas concluídas
- `pendingTasks` - Retorna todas as tarefas pendentes

As Mutations disponíveis para manipulação são:
- `createUser` - Cria um novo usuário recebendo um nome e email
- `createTask` - Cria uma nova tarefa recebendo um título, descrição e o id do usuário que a criou
- `completeTask` - Completa uma tarefa recebendo o id da tarefa
- `updateTask` - Atualiza uma tarefa recebendo o id da tarefa e os novos dados
- `deleteTask` - Deleta uma tarefa recebendo o id da tarefa

### Exemplo de uso
```graphql
mutation {
  createUser({
    name: "Joe Doe",
    email: "joedoe@email.com"
  })
}
```