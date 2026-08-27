const express = require('express');
const store = require('./store');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/tasks', (req, res) => {
  res.json(store.all());
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'title is required' });
  }
  const task = store.create({ title });
  res.status(201).json(task);
});

app.get('/tasks/:id', (req, res) => {
  const task = store.find(Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'not found' });
  res.json(task);
});

app.patch('/tasks/:id/complete', (req, res) => {
  const task = store.find(Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'not found' });
  task.completed = true;
  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const removed = store.remove(Number(req.params.id));
  if (!removed) return res.status(404).json({ error: 'not found' });
  res.status(204).send();
});

module.exports = app;
