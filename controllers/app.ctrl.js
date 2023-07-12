const { resolve } = require('path');
const { randomUUID } = require('crypto');

// DECLARATIONS
const { todos,users } = require('../db/data.json');
const { writeFileSync } = require('fs');

exports.homeCtrl = (req, res) => {
  console.log(`homectrl`);
  res.sendFile( resolve('public', 'home.html') );
};

exports.servicesCtrl = (req, res) => {
  // Connexion à la BDD
  // Récupération des livres
  // Vérification de la cnx
  res.end('Services');
};

exports.contactCtrl = (req, res) => res.end('Contact');

exports.postTask = (req, res) => {
        const newTodo = req.body;
        console.log(`req.body`,req);
        newTodo.id = randomUUID();
        console.log(`body`,newTodo);
        newTodo.done = false;
        todos.push(newTodo);
        updateJSON();
        res.redirect('/home');
      };

      exports.usersCtrl = (req, res) => {
        console.log("appel users ctrl");
        console.log("users :", users);
        //console.log('body :', req.body);
        res.json(users);
      };
      
      exports.tasksCtrl = (req, res) => {
        console.log('tasksCtrl id :', req.params.id);
        const filteredTasks = tasks.filter(t => t.idUtil == req.params.id);
        res.json(filteredTasks);
      }
      
function updateJSON() {
    writeFileSync(
      resolve('db', 'data.json'),
      JSON.stringify({ todos }, null, 2)
    );
  }