const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const todos = [
  { id: 1, title: "Musab", description: "I am a computer programmer" },
  { id: 2, title: "Hassan", description: "I am a computer engineering" },
];

app.get("/todo", (req, res) => {
  res.status(200).json(todos);
});

app.get("/todo/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id === parseInt(req.params.id));
  console.log(todo);
  if (todo === undefined) {
    res.status(404).send();
  } else {
    res.json(todo);
  }
});

app.post("/todo", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    description: req.body.description,
  };
  res.status(201).json(newTodo);
});

app.put("/todo/:id", (req, res) => {
  const todoIndex = todos.findIndex(
    (todo) => todo.id === parseInt(req.params.id)
  );
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos[todoIndex].title = req.body.title;
    todos[todoIndex].description = req.body.description;
    res.json(todos[todoIndex]);
  }
});

app.delete("/todo/:id", (req, res) => {
  const todoIndex = todos.findIndex(
    (todo) => todo.id === parseInt(req.params.id)
  );
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos.splice(todoIndex, 1);
    res.status(200).send();
  }
});

app.listen(3000);
