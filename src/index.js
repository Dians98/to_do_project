import "./assets/js/others.js"
import "./assets/css/style.css";

import '@fortawesome/fontawesome-free/css/all.min.css';




// src/index.js
// Import de Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import passionImg from './assets/img/passion.jpg';
import websiteImg from './assets/img/website.jpg';
import * as bootstrap from 'bootstrap';

import Project from "./assets/js/Project.js";
import Task from "./assets/js/Task.js";



document.addEventListener('DOMContentLoaded', () => {
    renderAllTasks(projects)
})


let today = new Date()
today = formatDate(today)

//Créer un tableau d'objets
const projects = [];

const defaultProject = new Project("Default")

projects.push(defaultProject)


const tasks = [
    new Task(1, 'Acheter du lait', 'LOREM IPSUM DOLOR', today),
    new Task(2, 'Répondre aux emails', 'LSIT AMET', today)
];

tasks.forEach(task => defaultProject.addTask(task))


console.log(defaultProject)

function renderAllTasks(projects) {
    const tasks_list_container = document.querySelector(".tasks_list")

    tasks_list_container.innerHTML = '';


    projects.forEach(project => {
        const tasks = project.getAllTasks()

        tasks.forEach(task => {

            const taskDiv = document.createElement("div")
            taskDiv.className = "task_item";

            const taskInfo = document.createElement("div")
            taskInfo.className = "task_info";

            const doneBtn = document.createElement("button")
            doneBtn.className = "btn-done";
            doneBtn.style.border = "none";
            doneBtn.style.background = "transparent";
            doneBtn.style.cursor = "pointer";
            doneBtn.dataset.taskId = task.id;


            // fonction pour mettre à jour l'icône selon l'état done
            function updateIcon() {
                doneBtn.innerHTML = task.done
                    ? `<i class="fas fa-check-circle" style="color:green;"></i>`
                    : `<i class="far fa-circle" style="color:gray;"></i>`;
            }

            updateIcon()

            addEventListenerOnDoneBtn(doneBtn, task)


            const taskTitle = document.createElement("div")
            taskTitle.className = "task_title";
            taskTitle.textContent = task.title;

            const task_actions = document.createElement("div")
            task_actions.className = "task_actions";

            // date
            const dateDiv = document.createElement("div")
            dateDiv.className = "task_date";
            dateDiv.textContent = task.dueDate;  // tu peux formater la date si besoin




            task_actions.appendChild(dateDiv)
            taskInfo.appendChild(doneBtn)
            taskInfo.appendChild(taskTitle)

            taskDiv.appendChild(taskInfo)
            taskDiv.appendChild(task_actions)

            tasks_list_container.appendChild(taskDiv)

        })
    })
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


function addEventListenerOnDoneBtn(doneBtn, task) {
    doneBtn.addEventListener("click", function () {
        task.toggleDone()
        refreshDom(projects)

    })

}

function refreshDom(projects) {
    const tasks_list = document.querySelector(".tasks_list");
    tasks_list.innerHTML = ""; // ⬅️ Vider
    renderAllTasks(projects); // ⬅️ Recréer
}
