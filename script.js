// Récupérer la liste des tâches depuis le stockage local ou initialiser une liste vide
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Fonction pour afficher un message
function showMessage(message, className) {
  const messagesContainer = document.getElementById('messages');
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  messageDiv.classList.add('message'); // Ajout de la classe générique "message"
  messageDiv.classList.add(className);
  messagesContainer.appendChild(messageDiv);

  // Supprimer le message après quelques secondes
  setTimeout(() => {
    messagesContainer.removeChild(messageDiv);
  }, 3000); // Le message disparaîtra après 3 secondes (3000 millisecondes)
}

// Fonction pour ajouter une nouvelle tâche
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    tasks.push({ text: taskText, completed: false });
    updateTaskList();
    taskInput.value = '';

    showMessage('Tâche ajoutée avec succès.', 'success-message');
  }
}


// Fonction pour supprimer une tâche
function removeTask(index) {
  tasks.splice(index, 1);
  updateTaskList();

  showMessage('Tâche supprimée avec succès.', 'delete-message');
}

// Fonction pour marquer une tâche comme terminée
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();

  if (tasks[index].completed) {
    showMessage('Tâche terminée avec succès.', 'success-message');
  } else {
    showMessage('Tâche annulée.', 'info-message');
  }
}

// Fonction pour mettre à jour la liste des tâches affichée
function updateTaskList() {
  const taskContainer = document.getElementById('taskContainer');
  taskContainer.innerHTML = '';

  tasks.sort((a, b) => a.text.localeCompare(b.text));
  
  tasks.forEach((task, index) => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    if (task.completed) {
      taskDiv.classList.add('completed');
    }

    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskDiv.appendChild(taskText);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Supprimer';
    removeButton.addEventListener('click', () => removeTask(index));
    taskDiv.appendChild(removeButton);

    const toggleButton = document.createElement('button');
    toggleButton.textContent = task.completed ? 'Annuler' : 'Terminé';
    toggleButton.addEventListener('click', () => toggleComplete(index));
    taskDiv.appendChild(toggleButton);

    taskContainer.appendChild(taskDiv);
  });

  // Sauvegarder la liste des tâches dans le stockage local
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Mettre à jour la liste des tâches affichée au chargement de la page
window.onload = function () {
  updateTaskList();
};
