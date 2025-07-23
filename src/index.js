import "./assets/js/others.js"
import "./assets/css/style.css";

import '@fortawesome/fontawesome-free/css/all.min.css';
import flatpickr from "flatpickr";



// src/index.js
// Import de Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import passionImg from './assets/img/passion.jpg';
import websiteImg from './assets/img/website.jpg';
import * as bootstrap from 'bootstrap';

import Project from "./assets/js/Project.js";
import Task from "./assets/js/Task.js";
import { renderAllTasks, renderAllProjects } from "./assets/js/dom.js"
import { refreshDom } from "./assets/js/dom.js"
import { taskModal, taskModalElement, addProjectModal, addProjectModalInstance,addTaskModal,addTaskModalInstance , initializeProjectSelect} from './assets/js/dom.js';


document.addEventListener('DOMContentLoaded', () => {
    const projects = initializeDefaultProject();
    renderAllTasks(projects)
    renderAllProjects(projects)

    const project_select = addTaskModal.querySelector("#project_select");

    initializeProjectSelect(project_select, projects)

    /**event sur le bouton d'ajout de project */
    const AddProjectModalBtn = addProjectModal.querySelector("#AddProjectModalBtn");

    AddProjectModalBtn.addEventListener("click", function () {
        const name = addProjectModal.querySelector("#project_name").value
        const id = projects.length + 1
        if (name.trim() === "") {
            addProjectModal.querySelector(".project_name_error").style.display = "block";
            addProjectModal.querySelector(".project_name_error").textContent = "Please enter a project name";
            return;
        }

        if (projects.some(project => project.name === name)) {
            addProjectModal.querySelector(".project_name_error").style.display = "block";
            addProjectModal.querySelector(".project_name_error").textContent = "Project name already exists";
            return;
        }

        addProjectModal.querySelector(".project_name_error").style.display = "none";

        // Créer un nouvel objet Project et l'ajouter au tableau projects
        const newProject = new Project(id,name);
        projects.push(newProject);

        addProjectModalInstance.hide()

        refreshDom(projects)
    });

    /**event sur le bouton d'ajout de modification de tache */
    const submitBtn = taskModalElement.querySelector("#submitBtn");

    submitBtn.addEventListener("click", function () {
        const taskId = this.dataset.taskId
        const task = findTaskById(projects, taskId)

        task.title = taskModalElement.querySelector("#task_title").value
        task.description = taskModalElement.querySelector("#task_description").value
        task.isImportant = taskModalElement.querySelector("#task_importance").checked ? true : false
        task.dueDate = taskModalElement.querySelector("#task_due_date").value


        taskModal.hide()
        refreshDom(projects)
    });

    
})


function initializeDefaultProject() {
    let today = new Date()
    today = formatDate(today)

    //Créer un tableau d'objets
    const projects = [];

    const defaultProject = new Project(1,"Default")

    projects.push(defaultProject)


    const tasks = [
        new Task(1, 'Create Task component', 'Develop the task display UI', today),
        new Task(2, 'Implement project management', 'Associate tasks with projects', today, true),
        new Task(3, 'Add "mark as done" feature', 'Toggle done state', today),
        new Task(4, 'Build sidebar', 'Menu for categories and projects', today, true),
        new Task(5, 'Style integration', 'Responsive design and theming', today)
    ];

    tasks.forEach(task => defaultProject.addTask(task))

    return projects
}



/**
 * 
 * @param {*} date 
 * @returns 
 * CETTE FONCTION RETOURNE LA DATE FORMATTEE DE TYPE yyyy-mm-dd
 */
function formatDate(date) {
    const y = date.getFullYear()
    const m = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${y}-${m}-${day}`;
}

function findTaskById(projects, taskId) {
    /**
     * PERMETS DE SORITR DE LA BOUCLE UNE FOIS LA TACHE TROUVEE
     */
    for (const project of projects) {
        const task = project.getTaskById(taskId);
        if (task) return task;
    }
    return null;
}



