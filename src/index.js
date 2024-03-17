import { ApolloServer, gql } from "apollo-server";
import { database } from "./seeds/data.js";
import {randomUUID} from 'node:crypto';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    tasks: [Task]
  }

  type Task {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
    createdBy: User!
    createdAt: String!
    completedAt: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
    tasks: [Task]
    task(id: ID!): Task
    completedTasks: [Task]
    pendingTasks: [Task]
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    createTask(title: String!, description: String, userId: ID!): Task
    completeTask(id: ID!): Task
    updateTask(id: ID!, title: String, description: String): Task
    deleteTask(id: ID!): Task
  }
`;

const resolvers = {
  Query: {
    users: () => database.users,
    user: (_, { id }) => database.users.find(user => user.id === id),
    tasks: () => database.tasks,
    task: (_, { id }) => database.tasks.find(task => task.id === id),
    completedTasks: () => database.tasks.filter(task => task.completed),
    pendingTasks: () => database.tasks.filter(task => !task.completed)
  },

  Mutation: {
    createUser: (_, { name, email }) => {
      const user = {
        id:  randomUUID(),
        name,
        email,
        tasks: []
      };
      database.users.push(user);
      return user;
    },
    createTask: (_, { title, description, userId }) => {
      const task = {
        id: randomUUID(),
        title,
        description,
        completed: false,
        createdBy: database.users.find(user => user.id === userId),
        createdAt: new Date().toISOString()
      };
      database.tasks.push(task);
      return task;
    },
    completeTask: (_, { id }) => {
      const task = database.tasks.find(task => task.id === id);
      task.completed = true;
      task.completedAt = new Date().toISOString();
      return task;
    },
    updateTask: (_, { id, title, description }) => {
      const task = database.tasks.find(task => task.id === id);
      if (title) task.title = title;
      if (description) task.description = description;
      return task;
    },
    deleteTask: (_, { id }) => {
      const taskIndex = database.tasks.findIndex(task => task.id === id);
      const task = database.tasks[taskIndex];
      database.tasks.splice(taskIndex, 1);
      return task;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server
  .listen({
    port: 4000
  })
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
