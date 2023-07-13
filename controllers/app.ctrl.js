const { resolve } = require('path');
const { randomUUID } = require('crypto');
const { writeFileSync } = require('fs');
const data = require('../db/data.json');

exports.homeCtrl = (req, res) => {
  res.sendFile(resolve('public', 'home.html'));
};

exports.postTask = (req, res) => {
  const { text, category, userId } = req.body;

  const newTask = {
    id: 'task' + new Date().getTime(),
    text: text,
    category: category,
    done: false
  };

  const user = data.users.find(user => user.id === userId);

  if (user) {
    user.tasks.push(newTask);

    writeFileSync('db/data.json', JSON.stringify(data, null, 2));

    res.json(newTask);
  } else {
    res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
};

exports.usersCtrl = (req, res) => {
  res.json(data.users);
};

exports.tasksCtrl = (req, res) => {
  let tasks = data.users.reduce((acc, user) => {
    return acc.concat(user.tasks);
  }, []);

  const userId = req.query.userId;
  if (userId) {
    tasks = tasks.filter(task => task.userId === userId);
  }

  const category = req.query.category;
  if (category) {
    tasks = tasks.filter(task => task.category === category);
  }

  res.json(tasks);
};
