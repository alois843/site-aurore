// Sélection des éléments HTML
const addButton = document.getElementById("add-task-btn");
const inputField = document.getElementById("task-input");
const todoList = document.getElementById("todo-list");

// Fonction pour charger les tâches depuis le localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log('Tâches chargées depuis localStorage:', tasks); // Pour le débogage

    // Réinitialiser la liste avant de la recharger
    todoList.innerHTML = "";

    // Créer les éléments de la liste avec les tâches enregistrées
    tasks.forEach((task) => {
        // S'assurer que la tâche a un texte valide avant de l'ajouter
        if (task.text && task.text.trim()) {
            const newTask = document.createElement("li");

            // Ajouter la classe 'done' uniquement si la tâche est terminée
            if (task.done) {
                newTask.classList.add("done");
            }

            newTask.innerHTML = `
                ${task.text}
                <button class="validate-task">Valider</button>
                <button class="remove-task">Supprimer</button>
            `;
            
            // Ajouter la tâche à la liste
            todoList.appendChild(newTask);

            // Ajouter l'événement de suppression pour la tâche
            const removeButton = newTask.querySelector(".remove-task");
            removeButton.addEventListener("click", () => {
                removeTask(task.text); // Supprimer la tâche depuis le stockage
                todoList.removeChild(newTask);
            });

            // Ajouter l'événement de validation pour la tâche
            const validateButton = newTask.querySelector(".validate-task");
            validateButton.addEventListener("click", () => {
                toggleTaskDone(task.text); // Modifier le statut de la tâche
                newTask.classList.toggle("done");
            });
        }
    });
}

// Fonction pour ajouter une tâche
function addTask(taskText) {
    if (!taskText.trim()) {
        alert('Veuillez entrer une tâche valide!');
        return;
    }

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTask = { text: taskText, done: false };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    console.log('Nouvelle tâche ajoutée:', newTask); // Pour le débogage
    loadTasks(); // Recharger les tâches après l'ajout
}

// Fonction pour supprimer une tâche
function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== taskText);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    console.log('Tâche supprimée:', taskText); // Pour le débogage
    loadTasks(); // Recharger les tâches après la suppression
}

// Fonction pour marquer une tâche comme terminée ou non
function toggleTaskDone(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            task.done = !task.done; // Changer l'état de la tâche
        }
        return task;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    console.log('Tâche modifiée:', taskText); // Pour le débogage
    loadTasks(); // Recharger les tâches après la modification
}

// Ajouter une tâche au clic sur le bouton "Ajouter"
addButton.addEventListener("click", () => {
    const taskText = inputField.value.trim();
    
    if (taskText) {
        addTask(taskText);
        inputField.value = ""; // Réinitialiser le champ de saisie
    } else {
        alert('Veuillez entrer une tâche!');
    }
});

// Optionnel : ajouter la fonctionnalité de "Entrée" pour ajouter une tâche
inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addButton.click();
    }
});

// Charger les tâches au démarrage
window.onload = loadTasks;
