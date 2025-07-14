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
import { renderAllTasks } from "./assets/js/dom.js"
import { refreshDom } from "./assets/js/dom.js"
import { taskModal, taskModalElement } from './assets/js/dom.js';


document.addEventListener('DOMContentLoaded', () => {
    const projects = initializeDefaultProject();
    renderAllTasks(projects)

    const submitBtn = taskModalElement.querySelector("#submitBtn");

    submitBtn.addEventListener("click", function () {
        const taskId = this.dataset.taskId

        taskModal.hide()
        refreshDom(projects)
    });
})


function initializeDefaultProject() {
    let today = new Date()
    today = formatDate(today)

    //Créer un tableau d'objets
    const projects = [];

    const defaultProject = new Project("Default")

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



