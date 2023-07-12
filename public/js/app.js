const axios = require('axios');

function loadUsers() {
  axios.get('/user')
    .then(response => {
      const selectUsers = document.getElementById('selectUser');
      selectUsers.innerHTML = '';

      if (response.data.length > 0) {
        const allUsersOption = document.createElement('option');
        allUsersOption.value = '';
        allUsersOption.textContent = 'Tous les utilisateurs';
        selectUsers.appendChild(allUsersOption);

        response.data.forEach(user => {
          const option = document.createElement('option');
          option.value = user.id;
          option.textContent = user.name;
          selectUsers.appendChild(option);
        });
      } else {
        const noUsersOption = document.createElement('option');
        noUsersOption.value = '';
        noUsersOption.textContent = 'Aucun utilisateur trouvé';
        selectUsers.appendChild(noUsersOption);
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    });
}

function loadTasks() {
  axios.get('/task')
    .then(response => {
      displayTasks(response.data);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des tâches:', error);
    });
}

function createTask(text, category, userId) {
  const newTask = {
    id: 'task' + Date.now(),
    userId: userId,
    text: text,
    category: category,
    done: false
  };

  axios.post('/todos/create', newTask)
    .then(() => {
      loadTasks();
    })
    .catch(error => {
      console.error('Erreur lors de la création de la tâche:', error);
    });
}

function filterTasksByUser(userId) {
  if (userId) {
    axios.get('/task', { params: { userId: userId } })
      .then(response => {
        displayTasks(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des tâches de l\'utilisateur:', error);
      });
  } else {
    loadTasks();
  }
}

function displayTasks(tasks) {
  const todoList = document.getElementById('todoList');
  const doneList = document.getElementById('doneList');
  todoList.innerHTML = '';
  doneList.innerHTML = '';

  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('list-group-item');
    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    const taskCategory = document.createElement('span');
    taskCategory.classList.add('badge');
    taskCategory.textContent = task.category;
    taskItem.appendChild(taskText);
    taskItem.appendChild(taskCategory);

    if (task.done) {
      doneList.appendChild(taskItem);
    } else {
      todoList.appendChild(taskItem);
    }
  });
}

// Charger les utilisateurs et les tâches lors du démarrage du serveur
loadUsers();
loadTasks();

// Exportez les fonctions si vous souhaitez les utiliser dans d'autres modules
module.exports = {
  loadUsers,
  loadTasks,
  createTask,
  filterTasksByUser,
  displayTasks
};
