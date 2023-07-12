$(document).ready(function() {
  // Charger les utilisateurs et les tâches lors du chargement de la page
  loadUsers();
  loadTasks();

  // Lorsqu'un utilisateur est sélectionné
  $('#selectUser').change(function() {
    var selectedUser = $(this).val();
    filterTasksByUser(selectedUser);
  });

  // Lorsqu'une tâche est créée
  $('#createTaskBtn').click(function() {
    var taskText = $('#taskText').val();
    var taskCategory = $('#selectCategory').val();
    var selectedUser = $('#selectUser').val();

    if (taskText && taskCategory && selectedUser) {
      createTask(taskText, taskCategory, selectedUser);
      $('#taskText').val('');
      $('#selectCategory').val('');
    }
  });
});

function loadUsers() {
  $.ajax({
    url: '/user',
    type: 'GET',
    success: function(data) {
      var selectUsers = $('#selectUser');
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
  var newTask = {
    id: 'task' + (new Date()).getTime(),
    userId: userId,
    text: text,
    category: category,
    done: false
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

function displayTasks(tasks) {
  var todoList = $('#todoList');
  var doneList = $('#doneList');
  todoList.empty();
  doneList.empty();

  $.each(tasks, function(index, task) {
    var taskItem = $('<li class="list-group-item"></li>');
    var taskText = $('<span></span>').text(task.text);
    var taskCategory = $('<span class="badge"></span>').text(task.category);
    taskItem.append(taskText).append(taskCategory);

    if (task.done) {
      doneList.append(taskItem);
    } else {
      todoList.append(taskItem);
    }
  });
}
