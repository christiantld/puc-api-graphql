export let database = {
  users: [
    {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@email.com'
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'janedoe@emai.com'
    }
  ],
  tasks: [
    {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      completed: false,
      createdBy: {
        id: '1',
        name: 'John Doe',
        email: 'johndoe@email.com'
      }
    }
  ],
}