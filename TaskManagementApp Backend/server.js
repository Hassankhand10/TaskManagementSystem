const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { tasks, users } =require('./mockData');
const e = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const groups = [
  { id: 'group1', name: 'Group 1' },
  { id: 'group2', name: 'Group 2' }
];

app.use(cors());
app.use(bodyParser.json());

app.post('/login' , (request , response , next) => {
  const {username , password} = request.body;
  const user = users.filter(user => user.username == username)
  if (user.length && password == user[0].password ) {
    response.status(200).json({message: "Login Succesful" , user: {username: user[0].username , groupId: user[0].groupId }})

  }
  else {
    response.status(403).json({message: "Login Unsuccessful"})
  }
})

app.post('/task', (request, response, next) => {
  const { title, description, createdBy } = request.body;

  if (title && description && createdBy) {
    tasks.push({ ...request.body });
    console.log(tasks)
    response.status(201).json({ message: "Task succesfully added!" });
  } else {
    response.status(400).json({ message: "Please provide correct values." });
  }
})

app.get('/task/:groupId', (request, response) => {
  const groupId = request.params.groupId;

  if(groupId) {
    const groupUsers = users.filter(user => user.groupId == groupId).map(user => user.username);
    const groupTasks = tasks.filter(task => groupUsers.includes(task.createdBy));
    response.json({ message: "Successfully fetched tasks!", tasks: groupTasks });
  } else {
    response.status(404).json({ message: "Could not fetch tasks for group!" })
  }
});

app.patch('/task/:id/mark', (request, response) => {
  const { id } = request.params;

  if (id) {
    const task = tasks.filter(task => task.id == id);

    if (task[0]) {
      task[0].isCompleted = !task[0].isCompleted
      response.json({ message: "Successfully marked task." })
    } else  {
      response.status(404).json({ message: "Could not find task for provided id." })
    }

  } else {
    response.status(400).json({ message: "No id provided for task." })
  }
})

app.delete('/task/:taskId', (request, response) => {
  const taskId = request.params.taskId;
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    response.json({ message: "Task deleted successfully" });
  } else {
    response.status(404).json({ message: "Task not found" });
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
