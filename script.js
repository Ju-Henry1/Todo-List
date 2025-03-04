document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.button-add');
    const inputField = document.querySelector('.task-add');
    const taskList = document.querySelector('.task-list');
  
    // Fonction pour ajouter une tâche
    function addTask() {
      const taskText = inputField.value.trim();
  
      if (taskText !== '') {
        // Création de l'élément de la tâche
        const newTask = document.createElement('li');
        newTask.textContent = taskText;
  
        // Création du bouton "Supprimer"
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️';
        deleteButton.classList.add('delete-button');
  
        // Ajouter l'événement de suppression à ce bouton
        deleteButton.addEventListener('click', () => {
          newTask.remove();  // Supprimer la tâche de la liste
          saveTasks();       // Mettre à jour le localStorage après suppression
        });
  
        // Ajouter le bouton à la tâche
        newTask.appendChild(deleteButton);
  
        // Ajout de la tâche à la liste
        taskList.appendChild(newTask);
  
        // Sauvegarder les tâches dans le localStorage
        saveTasks();
  
        // Réinitialisation du champ de saisie
        inputField.value = '';
      }
    }
  
    // Fonction pour sauvegarder les tâches dans le localStorage
    function saveTasks() {
      const tasks = [];
      const taskItems = taskList.querySelectorAll('li');
  
      taskItems.forEach(item => {
        tasks.push(item.firstChild.textContent);  // Sauvegarder seulement le texte sans le bouton
      });
  
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    // Fonction pour charger les tâches depuis le localStorage
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
  
      if (tasks && tasks.length > 0) {
        tasks.forEach(taskText => {
          const newTask = document.createElement('li');
          newTask.textContent = taskText;
  
          // Création du bouton "Supprimer"
          const deleteButton = document.createElement('button');
          deleteButton.textContent = '🗑️';
          deleteButton.classList.add('delete-button');
  
          // Ajouter l'événement de suppression à ce bouton
          deleteButton.addEventListener('click', () => {
            newTask.remove();  // Supprimer la tâche de la liste
            saveTasks();       // Mettre à jour le localStorage après suppression
          });
  
          // Ajouter le bouton à la tâche
          newTask.appendChild(deleteButton);
  
          // Ajout de la tâche à la liste
          taskList.appendChild(newTask);
        });
      }
    }
  
    // Ajouter la tâche lorsque l'utilisateur clique sur le bouton "Ajouter"
    addButton.addEventListener('click', addTask);
  
    // Ajouter la tâche lorsque l'utilisateur appuie sur la touche "Entrée"
    inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        addTask();
      }
    });
  
    // Charger les tâches au démarrage
    loadTasks();
  });
  