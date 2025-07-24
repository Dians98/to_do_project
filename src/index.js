import "./assets/js/utils.js"
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
import { add_event_listener_on_to_do_category, add_event_listener_on_project_list, formatDate, renderAllTasks, renderAllProjects, add_event_listener_on_add_project_modal_btn, add_event_listener_on_add_task_modal_btn, add_event_listener_on_submit_btn } from "./assets/js/dom.js"
import { refreshDom } from "./assets/js/dom.js"
import { taskModal, taskModalElement, addProjectModal, addProjectModalInstance, addTaskModal, addTaskModalInstance, initializeProjectSelect } from './assets/js/dom.js';

let lastTaskId;

export function getNextTaskId() {
    return lastTaskId += 1;
}

document.addEventListener('DOMContentLoaded', () => {
    const { projects, taskLength } = initializeDefaultProject();
    lastTaskId = taskLength; // Initialiser lastTaskId avec le nombre de tâches

    renderAllTasks(projects)
    renderAllProjects(projects)

    const project_select = addTaskModal.querySelector("#project_select");

    initializeProjectSelect(project_select, projects)

    /**event sur le bouton d'ajout de project */
    const AddProjectModalBtn = addProjectModal.querySelector("#AddProjectModalBtn");

    add_event_listener_on_add_project_modal_btn(AddProjectModalBtn, projects, addProjectModalInstance, addProjectModal)

    const addTaskModalBtn = addTaskModal.querySelector("#addtaskModalBtn");
    add_event_listener_on_add_task_modal_btn(addTaskModalBtn, projects, addTaskModalInstance, addTaskModal);

    /**event sur le bouton d'ajout de modification de tache */
    const submitBtn = taskModalElement.querySelector("#submitBtn");

    add_event_listener_on_submit_btn(submitBtn, projects, taskModalElement, taskModal, project_select);

    add_event_listener_on_to_do_category(projects)

    add_event_listener_on_project_list(projects)

})


function initializeDefaultProject(lastTaskId) {
    let today = new Date()
    today = formatDate(today)

    //Créer un tableau d'objets
    const projects = [];

    const defaultProject = new Project(1, "Default")

    projects.push(defaultProject)


    const tasks = [
        new Task(1, 'Create Task component', 'Develop the task display UI', today),
        new Task(2, 'Implement project management', 'Associate tasks with projects', today, true),
        new Task(3, 'Add "mark as done" feature', 'Toggle done state', today),
        new Task(4, 'Build sidebar', 'Menu for categories and projects', today, true),
        new Task(5, 'Style integration', 'Responsive design and theming', today)
    ];

    const taskLength = tasks.length; // Initialiser lastTaskId avec le nombre de tâches

    tasks.forEach(task => defaultProject.addTask(task))

    return { projects, taskLength };
}



/**
 * 
 * @param {*} date 
 * @returns 
 * CETTE FONCTION RETOURNE LA DATE FORMATTEE DE TYPE yyyy-mm-dd
 */






