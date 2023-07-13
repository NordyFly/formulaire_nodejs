$(document).ready(function() {
  // Charger les utilisateurs et les tâches lors du chargement de la page
  loadUsers();
  loadTasks();

  // Lorsqu'un utilisateur est sélectionné
  $('#selectUser').change(function() {
    let selectedUser = $(this).val();
    filterTasksByUser(selectedUser);
  });

  // Lorsqu'une tâche est créée
  $('#createTaskBtn').click(function() {
    let taskText = $('#taskText').val();
    let taskCategory = $('#selectCategory').val();
    let selectedUser = $('#selectUser').val();

    if (taskText && taskCategory && selectedUser) {
      createTask(taskText, taskCategory, selectedUser);
      $('#taskText').val('');
      $('#selectCategory').val('');
    }
  });

  // Lorsqu'un filtre de catégorie est sélectionné
  $('#selectCategory').change(function() {
    let selectedCategory = $(this).val();
    filterTasksByCategory(selectedCategory);
  });
});

function loadUsers() {
  $.ajax({
    url: '/user',
    type: 'GET',
    success: function(data) {
      let selectUsers = $('#selectUser');
      selectUsers.empty();

      if (data.length > 0) {
        selectUsers.append('<option value="">Tous les utilisateurs</option>');
        $.each(data, function(index, user) {
          selectUsers.append('<option value="' + user.id + '">' + user.name + '</option>');
        });
      } else {
        selectUsers.append('<option value="">Aucun utilisateur trouvé</option>');
      }
    },
    error: function(error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  });
}

function loadTasks() {
  $.ajax({
    url: '/task',
    type: 'GET',
    success: function(data) {
      displayTasks(data);
    },
    error: function(error) {
      console.error('Erreur lors de la récupération des tâches:', error);
    }
  });
}

function createTask(text, category, userId) {
  let newTask = {
    id: 'task' + new Date().getTime(),
    text: text,
    category: category,
    done: false,
    userId: userId
  };

  $.ajax({
    url: '/todos/create',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(newTask),
    success: function() {
      loadTasks();
    },
    error: function(error) {
      console.error('Erreur lors de la création de la tâche:', error);
    }
  });
}

function filterTasksByUser(userId) {
  if (userId) {
    $.ajax({
      url: '/task?userId=' + userId,
      type: 'GET',
      success: function(data) {
        displayTasks(data);
      },
      error: function(error) {
        console.error('Erreur lors de la récupération des tâches de l\'utilisateur:', error);
      }
    });
  } else {
    loadTasks();
  }
}

function filterTasksByCategory(category) {
  if (category) {
    $.ajax({
      url: '/task?category=' + category,
      type: 'GET',
      success: function(data) {
        displayTasks(data);
      },
      error: function(error) {
        console.error('Erreur lors de la récupération des tâches de la catégorie:', error);
      }
    });
  } else {
    loadTasks();
  }
}

function displayTasks(tasks) {
  let todoList = $('#todoList');
  let doneList = $('#doneList');
  todoList.empty();
  doneList.empty();

  $.each(tasks, function(index, task) {
    let taskItem = $('<li class="list-group-item"></li>');
    let taskText = $('<span></span>').text(task.text);
    let taskCategory = $('<span class="badge"></span>').text(task.category);
    taskItem.append(taskText).append(taskCategory);

    if (task.done) {
      doneList.append(taskItem);
    } else {
      todoList.append(taskItem);
    }
  });
}
