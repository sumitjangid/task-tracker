// Simple in-memory store. Swap this out for a real DB later if you want
// to practice a "migration" task branch too.

let tasks = [];
let nextId = 1;

function reset() {
  tasks = [];
  nextId = 1;
}

function all() {
  return tasks;
}

function find(id) {
  return tasks.find((t) => t.id === id);
}

function create({ title }) {
  const task = {
    id: nextId++,
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

function remove(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

module.exports = { reset, all, find, create, remove };
