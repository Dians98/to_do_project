import * as bootstrap from 'bootstrap';
import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';
import Project from './Project.js';
import Task from './Task.js';
import { getNextTaskId } from '../../index.js';

const taskDueDate = document.querySelector("#task_due_date");

const addTaskDueDate = document.querySelector("#add_task_due_date");



let datePicker1;
datePicker1 = new Pikaday({
    field: taskDueDate,
    format: "YYYY-MM-DD",
    setDefaultDate: false,
});

let datePicker2;
datePicker2 = new Pikaday({
    field: addTaskDueDate,
    format: "YYYY-MM-DD",
    setDefaultDate: true,
    defaultDate: new Date(),
    minDate: new Date(),
});

export const taskModalElement = document.querySelector("#taskModal")
export const taskModal = new bootstrap.Modal(document.querySelector('#taskModal'))

export const addProjectModal = document.querySelector("#addProjectModal")
export const addProjectModalInstance = new bootstrap.Modal(document.querySelector('#addProjectModal'))

export const addTaskModal = document.querySelector("#addTaskModal")

export const addTaskModalInstance = new bootstrap.Modal(document.querySelector('#addTaskModal'))


export function renderAllTasks(projects) {
    const tasks_list_container = document.querySelector(".tasks_list")

    tasks_list_container.innerHTML = ''

    document.querySelector("#dynamic_to_do_title").textContent = "All";

    let taskNumber = 0


    projects.forEach(project => {
        const tasks = project.tasks

        tasks.forEach((task, index) => {

            const taskItem = document.createElement("div")
            taskItem.className = "task_item"

            if (task.done) {
                taskItem.classList.add("done")
            } else {
                taskItem.classList.remove("done")
            }

            const taskInfo = document.createElement("div")
            taskInfo.className = "task_info"

            const doneBtn = document.createElement("button")
            doneBtn.className = "btn-done"
            doneBtn.style.border = "none"
            doneBtn.style.background = "transparent"
            doneBtn.style.cursor = "pointer"
            doneBtn.dataset.taskId = task.id


            // fonction pour mettre à jour l'icône selon l'état done
            function updateIcon() {
                doneBtn.innerHTML = task.done
                    ? `<i class="fas fa-check-circle" style="color:#f6d365"></i>`
                    : `<i class="far fa-circle" style="color:#fda085"></i>`
            }

            updateIcon()

            addEventListenerOnDoneBtn(doneBtn, task, projects)

            const taskTitle = document.createElement("div")
            taskTitle.className = "task_title"
            taskTitle.textContent = task.title

            const task_actions = document.createElement("div")
            task_actions.className = "task_actions"

            // date
            const dateDiv = document.createElement("div")
            dateDiv.className = "task_date"
            dateDiv.textContent = task.dueDate

            const viewTask = document.createElement("div")
            viewTask.className = "view_task"
            viewTask.dataset.taskId = task.id
            viewTask.innerHTML = `<i class="fas fa-info-circle" style="color : lightblue;"></i>`

            viewTaskAddEventListener(viewTask, task)

            const editTask = document.createElement("div")
            editTask.className = "edit_task"
            editTask.dataset.taskId = task.id
            editTask.innerHTML = `<i class="far fa-edit" style="color : #f6d365;"></i>`

            editTaskAddEventListener(editTask, task, datePicker1)

            const deleteTask = document.createElement("div")
            deleteTask.className = "delete_task"
            deleteTask.dataset.taskId = task.id
            deleteTask.innerHTML = `<i class="fas fa-trash-alt" style="color : #fda085;"></i>`

            deleteTaskAddEventListener(deleteTask, task.id, projects)


            task_actions.appendChild(dateDiv)
            task_actions.appendChild(viewTask)
            task_actions.appendChild(editTask)
            task_actions.appendChild(deleteTask)

            taskInfo.appendChild(doneBtn)
            taskInfo.appendChild(taskTitle)

            taskItem.appendChild(taskInfo)
            taskItem.appendChild(task_actions)

            tasks_list_container.appendChild(taskItem)

            taskNumber++


        })
    })

    const taskNumberElement = document.querySelector("#task_number")
    taskNumberElement.textContent = taskNumber

}

function renderTodayTask(projects) {
    const tasks_list_container = document.querySelector(".tasks_list")
    const today = formatDate(new Date());

    tasks_list_container.innerHTML = ''

    document.querySelector("#dynamic_to_do_title").textContent = "Today";

    let taskNumber = 0

    projects.forEach(project => {
        const tasks = project.tasks
        const todayTasks = tasks.filter(task => task.dueDate === today);
        todayTasks.forEach((task, index) => {

            const taskItem = document.createElement("div")
            taskItem.className = "task_item"

            if (task.done) {
                taskItem.classList.add("done")
            } else {
                taskItem.classList.remove("done")
            }

            const taskInfo = document.createElement("div")
            taskInfo.className = "task_info"

            const doneBtn = document.createElement("button")
            doneBtn.className = "btn-done"
            doneBtn.style.border = "none"
            doneBtn.style.background = "transparent"
            doneBtn.style.cursor = "pointer"
            doneBtn.dataset.taskId = task.id


            // fonction pour mettre à jour l'icône selon l'état done
            function updateIcon() {
                doneBtn.innerHTML = task.done
                    ? `<i class="fas fa-check-circle" style="color:#f6d365"></i>`
                    : `<i class="far fa-circle" style="color:#fda085"></i>`
            }

            updateIcon()

            addEventListenerOnDoneBtn(doneBtn, task, projects)

            const taskTitle = document.createElement("div")
            taskTitle.className = "task_title"
            taskTitle.textContent = task.title

            const task_actions = document.createElement("div")
            task_actions.className = "task_actions"

            // date
            const dateDiv = document.createElement("div")
            dateDiv.className = "task_date"
            dateDiv.textContent = task.dueDate

            const viewTask = document.createElement("div")
            viewTask.className = "view_task"
            viewTask.dataset.taskId = task.id
            viewTask.innerHTML = `<i class="fas fa-info-circle" style="color : lightblue;"></i>`

            viewTaskAddEventListener(viewTask, task)

            const editTask = document.createElement("div")
            editTask.className = "edit_task"
            editTask.dataset.taskId = task.id
            editTask.innerHTML = `<i class="far fa-edit" style="color : #f6d365;"></i>`

            editTaskAddEventListener(editTask, task, datePicker1)

            const deleteTask = document.createElement("div")
            deleteTask.className = "delete_task"
            deleteTask.dataset.taskId = task.id
            deleteTask.innerHTML = `<i class="fas fa-trash-alt" style="color : #fda085;"></i>`

            deleteTaskAddEventListener(deleteTask, task.id, projects)


            task_actions.appendChild(dateDiv)
            task_actions.appendChild(viewTask)
            task_actions.appendChild(editTask)
            task_actions.appendChild(deleteTask)

            taskInfo.appendChild(doneBtn)
            taskInfo.appendChild(taskTitle)

            taskItem.appendChild(taskInfo)
            taskItem.appendChild(task_actions)

            tasks_list_container.appendChild(taskItem)

            taskNumber++


        })
    })

    const taskNumberElement = document.querySelector("#task_number")
    taskNumberElement.textContent = taskNumber

}

function renderImportantTask(projects) {
    const tasks_list_container = document.querySelector(".tasks_list")
    const today = formatDate(new Date());

    tasks_list_container.innerHTML = ''

    document.querySelector("#dynamic_to_do_title").textContent = "Important";

    let taskNumber = 0

    projects.forEach(project => {
        const tasks = project.tasks
        const importantTasks = tasks.filter(task => task.isImportant == true);
        importantTasks.forEach((task, index) => {

            const taskItem = document.createElement("div")
            taskItem.className = "task_item"

            if (task.done) {
                taskItem.classList.add("done")
            } else {
                taskItem.classList.remove("done")
            }

            const taskInfo = document.createElement("div")
            taskInfo.className = "task_info"

            const doneBtn = document.createElement("button")
            doneBtn.className = "btn-done"
            doneBtn.style.border = "none"
            doneBtn.style.background = "transparent"
            doneBtn.style.cursor = "pointer"
            doneBtn.dataset.taskId = task.id


            // fonction pour mettre à jour l'icône selon l'état done
            function updateIcon() {
                doneBtn.innerHTML = task.done
                    ? `<i class="fas fa-check-circle" style="color:#f6d365"></i>`
                    : `<i class="far fa-circle" style="color:#fda085"></i>`
            }

            updateIcon()

            addEventListenerOnDoneBtn(doneBtn, task, projects)

            const taskTitle = document.createElement("div")
            taskTitle.className = "task_title"
            taskTitle.textContent = task.title

            const task_actions = document.createElement("div")
            task_actions.className = "task_actions"

            // date
            const dateDiv = document.createElement("div")
            dateDiv.className = "task_date"
            dateDiv.textContent = task.dueDate

            const viewTask = document.createElement("div")
            viewTask.className = "view_task"
            viewTask.dataset.taskId = task.id
            viewTask.innerHTML = `<i class="fas fa-info-circle" style="color : lightblue;"></i>`

            viewTaskAddEventListener(viewTask, task)

            const editTask = document.createElement("div")
            editTask.className = "edit_task"
            editTask.dataset.taskId = task.id
            editTask.innerHTML = `<i class="far fa-edit" style="color : #f6d365;"></i>`

            editTaskAddEventListener(editTask, task, datePicker1)

            const deleteTask = document.createElement("div")
            deleteTask.className = "delete_task"
            deleteTask.dataset.taskId = task.id
            deleteTask.innerHTML = `<i class="fas fa-trash-alt" style="color : #fda085;"></i>`

            deleteTaskAddEventListener(deleteTask, task.id, projects)


            task_actions.appendChild(dateDiv)
            task_actions.appendChild(viewTask)
            task_actions.appendChild(editTask)
            task_actions.appendChild(deleteTask)

            taskInfo.appendChild(doneBtn)
            taskInfo.appendChild(taskTitle)

            taskItem.appendChild(taskInfo)
            taskItem.appendChild(task_actions)

            tasks_list_container.appendChild(taskItem)

            taskNumber++


        })
    })

    const taskNumberElement = document.querySelector("#task_number")
    taskNumberElement.textContent = taskNumber

}
function renderCompletedTask(projects) {
    const tasks_list_container = document.querySelector(".tasks_list")
    const today = formatDate(new Date());

    tasks_list_container.innerHTML = ''

    document.querySelector("#dynamic_to_do_title").textContent = "Important";

    let taskNumber = 0

    projects.forEach(project => {
        const tasks = project.tasks
        const completedTasks = tasks.filter(task => task.done == true);
        completedTasks.forEach((task, index) => {

            const taskItem = document.createElement("div")
            taskItem.className = "task_item"

            if (task.done) {
                taskItem.classList.add("done")
            } else {
                taskItem.classList.remove("done")
            }

            const taskInfo = document.createElement("div")
            taskInfo.className = "task_info"

            const doneBtn = document.createElement("button")
            doneBtn.className = "btn-done"
            doneBtn.style.border = "none"
            doneBtn.style.background = "transparent"
            doneBtn.style.cursor = "pointer"
            doneBtn.dataset.taskId = task.id


            // fonction pour mettre à jour l'icône selon l'état done
            function updateIcon() {
                doneBtn.innerHTML = task.done
                    ? `<i class="fas fa-check-circle" style="color:#f6d365"></i>`
                    : `<i class="far fa-circle" style="color:#fda085"></i>`
            }

            updateIcon()

            addEventListenerOnDoneBtn(doneBtn, task, projects)

            const taskTitle = document.createElement("div")
            taskTitle.className = "task_title"
            taskTitle.textContent = task.title

            const task_actions = document.createElement("div")
            task_actions.className = "task_actions"

            // date
            const dateDiv = document.createElement("div")
            dateDiv.className = "task_date"
            dateDiv.textContent = task.dueDate

            const viewTask = document.createElement("div")
            viewTask.className = "view_task"
            viewTask.dataset.taskId = task.id
            viewTask.innerHTML = `<i class="fas fa-info-circle" style="color : lightblue;"></i>`

            viewTaskAddEventListener(viewTask, task)

            const editTask = document.createElement("div")
            editTask.className = "edit_task"
            editTask.dataset.taskId = task.id
            editTask.innerHTML = `<i class="far fa-edit" style="color : #f6d365;"></i>`

            editTaskAddEventListener(editTask, task, datePicker1)

            const deleteTask = document.createElement("div")
            deleteTask.className = "delete_task"
            deleteTask.dataset.taskId = task.id
            deleteTask.innerHTML = `<i class="fas fa-trash-alt" style="color : #fda085;"></i>`

            deleteTaskAddEventListener(deleteTask, task.id, projects)


            task_actions.appendChild(dateDiv)
            task_actions.appendChild(viewTask)
            task_actions.appendChild(editTask)
            task_actions.appendChild(deleteTask)

            taskInfo.appendChild(doneBtn)
            taskInfo.appendChild(taskTitle)

            taskItem.appendChild(taskInfo)
            taskItem.appendChild(task_actions)

            tasks_list_container.appendChild(taskItem)

            taskNumber++


        })
    })

    const taskNumberElement = document.querySelector("#task_number")
    taskNumberElement.textContent = taskNumber

}
function renderWeekTask(projects) {
    const tasks_list_container = document.querySelector(".tasks_list")
    const today = formatDate(new Date());

    const lastSunday = new Date();
    //tout simplement, je recule de combien de jour pour avoir dimanche
    lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay()); // Trouver le dimanche de la semaine en cours


    //pour pouvoir comparer les dates, le meilleur moyen c'est d'utiliser un timestamp
    const lastSundayTimestamp = lastSunday.getTime();


    const nextSunday = new Date();
    const nbDaysToNextSunday = 7 - nextSunday.getDay();

    nextSunday.setDate(nextSunday.getDate() + nbDaysToNextSunday); // Trouver le dimanche de la semaine prochaine
    const nextSundayTimestamp = nextSunday.getTime();

    tasks_list_container.innerHTML = ''

    document.querySelector("#dynamic_to_do_title").textContent = "Important";

    let taskNumber = 0

    projects.forEach(project => {
        const tasks = project.tasks
        const weekTask = tasks.filter(task => {
            const taskDate = new Date(task.dueDate);
            const taskTimestamp = taskDate.getTime();

            return taskTimestamp >= lastSundayTimestamp && taskTimestamp < nextSundayTimestamp;
        });
        weekTask.forEach((task, index) => {

            const taskItem = document.createElement("div")
            taskItem.className = "task_item"

            if (task.done) {
                taskItem.classList.add("done")
            } else {
                taskItem.classList.remove("done")
            }

            const taskInfo = document.createElement("div")
            taskInfo.className = "task_info"

            const doneBtn = document.createElement("button")
            doneBtn.className = "btn-done"
            doneBtn.style.border = "none"
            doneBtn.style.background = "transparent"
            doneBtn.style.cursor = "pointer"
            doneBtn.dataset.taskId = task.id


            // fonction pour mettre à jour l'icône selon l'état done
            function updateIcon() {
                doneBtn.innerHTML = task.done
                    ? `<i class="fas fa-check-circle" style="color:#f6d365"></i>`
                    : `<i class="far fa-circle" style="color:#fda085"></i>`
            }

            updateIcon()

            addEventListenerOnDoneBtn(doneBtn, task, projects)

            const taskTitle = document.createElement("div")
            taskTitle.className = "task_title"
            taskTitle.textContent = task.title

            const task_actions = document.createElement("div")
            task_actions.className = "task_actions"

            // date
            const dateDiv = document.createElement("div")
            dateDiv.className = "task_date"
            dateDiv.textContent = task.dueDate

            const viewTask = document.createElement("div")
            viewTask.className = "view_task"
            viewTask.dataset.taskId = task.id
            viewTask.innerHTML = `<i class="fas fa-info-circle" style="color : lightblue;"></i>`

            viewTaskAddEventListener(viewTask, task)

            const editTask = document.createElement("div")
            editTask.className = "edit_task"
            editTask.dataset.taskId = task.id
            editTask.innerHTML = `<i class="far fa-edit" style="color : #f6d365;"></i>`

            editTaskAddEventListener(editTask, task, datePicker1)

            const deleteTask = document.createElement("div")
            deleteTask.className = "delete_task"
            deleteTask.dataset.taskId = task.id
            deleteTask.innerHTML = `<i class="fas fa-trash-alt" style="color : #fda085;"></i>`

            deleteTaskAddEventListener(deleteTask, task.id, projects)


            task_actions.appendChild(dateDiv)
            task_actions.appendChild(viewTask)
            task_actions.appendChild(editTask)
            task_actions.appendChild(deleteTask)

            taskInfo.appendChild(doneBtn)
            taskInfo.appendChild(taskTitle)

            taskItem.appendChild(taskInfo)
            taskItem.appendChild(task_actions)

            tasks_list_container.appendChild(taskItem)

            taskNumber++


        })
    })

    const taskNumberElement = document.querySelector("#task_number")
    taskNumberElement.textContent = taskNumber

}

export function renderAllProjects(projects) {

    const to_do_projects_list_container = document.querySelector(".to_do_projects_list_container")
    to_do_projects_list_container.innerHTML = '' // Vider la liste des projets

    projects.forEach(project => {
        const to_do_projects_list = document.createElement("div")
        to_do_projects_list.className = "project_list side_menu"
        to_do_projects_list.id = project.id

        const projectIcon = document.createElement("i")
        projectIcon.className = "fas fa-project-diagram"

        const projectName = document.createElement("span")
        projectName.textContent = project.name

        to_do_projects_list.appendChild(projectIcon)
        to_do_projects_list.appendChild(projectName)

        to_do_projects_list_container.appendChild(to_do_projects_list)
    })

}


function addEventListenerOnDoneBtn(doneBtn, task, projects) {
    doneBtn.addEventListener("click", function () {
        task.toggleDone()
        refreshDom(projects)
    })
}

export function refreshDom(projects) {

    const tasks_list = document.querySelector(".tasks_list")
    tasks_list.innerHTML = "" // ⬅️ Vider
    renderAllTasks(projects) // ⬅️ Recréer

    const to_do_projects_list_container = document.querySelector(".to_do_projects_list_container")
    to_do_projects_list_container.innerHTML = "" // ⬅️ Vider
    renderAllProjects(projects) // ⬅️ Recréer

    const project_select = addTaskModal.querySelector("#project_select")
    initializeProjectSelect(project_select, projects)



}

function viewTaskAddEventListener(viewTask, task) {
    viewTask.addEventListener("click", function () {
        const taskId = this.dataset.taskId


        taskModalElement.querySelector('.modal-title').textContent = "Task Infos"

        taskModalElement.querySelector('#task_title').value = task.title
        taskModalElement.querySelector('#task_title').disabled = true

        taskModalElement.querySelector('#task_description').value = task.description
        taskModalElement.querySelector('#task_description').disabled = true

        taskModalElement.querySelector('#task_importance').checked = task.isImportant
        taskModalElement.querySelector('#task_importance').disabled = true

        const switchLabel = taskModalElement.querySelector('.form-check-label');
        switchLabel.textContent = task.isImportant ? "Yes" : "No";

        taskModalElement.querySelector('#task_due_date').disabled = true
        taskModalElement.querySelector('#task_due_date').value = task.dueDate


        taskModalElement.querySelector("#submitBtn").hidden = true;
        taskModal.show();
    });
}


function editTaskAddEventListener(editTask, task, datePicker) {
    editTask.addEventListener("click", function () {
        const taskId = this.dataset.taskId

        taskModalElement.querySelector('.modal-title').textContent = "Task Infos"

        taskModalElement.querySelector('#task_title').value = task.title
        taskModalElement.querySelector('#task_title').disabled = false

        taskModalElement.querySelector('#task_description').value = task.description
        taskModalElement.querySelector('#task_description').disabled = false

        taskModalElement.querySelector('#task_importance').checked = task.isImportant
        taskModalElement.querySelector('#task_importance').disabled = false

        const switchLabel = taskModalElement.querySelector('.form-check-label');
        switchLabel.textContent = task.isImportant ? "Yes" : "No";


        const taskDueDate = document.querySelector("#task_due_date")
        datePicker.setDate(new Date(task.dueDate), true);
        taskModalElement.querySelector('#task_due_date').disabled = false

        taskModalElement.querySelector("#submitBtn").dataset.taskId = task.id
        taskModalElement.querySelector("#submitBtn").hidden = false


        taskModal.show();
    });
}

function deleteTaskAddEventListener(deleteTask, taskId, projects) {

    deleteTask.addEventListener("click", function () {

        const taskId = this.dataset.taskId

        if (taskId) {

            const project = projects.find(project =>
                project.tasks.some(task => task.id == taskId)
            );

            console.log(project)
            if (project) {
                project.removeTask(taskId);
                console.log("apres remove")
                console.log(project)
                refreshDom(projects);
            } else {
                console.error(`Task with ID ${taskId} not found in any project.`);
            }
        }
    });
}

export function initializeProjectSelect(project_select, projects) {
    project_select.innerHTML = ""
    projects.forEach(project => {
        const option = document.createElement("option");
        option.value = project.id;
        option.textContent = project.name;
        project_select.appendChild(option);
    }
    );
}

export function add_event_listener_on_add_project_modal_btn(AddProjectModalBtn, projects, addProjectModalInstance, addProjectModal) {
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
        const newProject = new Project(id, name);
        projects.push(newProject);

        addProjectModalInstance.hide()

        refreshDom(projects)
    });

}

export function add_event_listener_on_add_task_modal_btn(addTaskModalBtn, projects, addTaskModalInstance, addTaskModal) {
    addTaskModalBtn.addEventListener("click", function () {

        const title = addTaskModal.querySelector("#add_task_title").value;
        const description = addTaskModal.querySelector("#add_task_desc").value;
        const dueDate = addTaskModal.querySelector("#add_task_due_date").value;
        const isImportant = addTaskModal.querySelector("#add_task_importance").checked;

        const projectSelect = addTaskModal.querySelector("#project_select");
        const projectId = projectSelect.value;



        let project = projects.find(project => project.id == projectId)


        let taskId = getNextTaskId()

        const task = new Task(taskId, title, description, dueDate, isImportant);
        project.addTask(task);


        addTaskModalInstance.hide()
        refreshDom(projects)

    })
}

export function add_event_listener_on_submit_btn(submitBtn, projects, taskModalElement, taskModal) {
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

export function formatDate(date) {
    const y = date.getFullYear()
    const m = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${y}-${m}-${day}`;
}


export function remove_all_active_menu() {
    document.querySelectorAll(".side_menu").forEach(side_menu => side_menu.classList.remove("active"));
}



export function add_event_listener_on_to_do_category(project) {
    document.querySelector(".to_do_categories").addEventListener("click", function (e) {
        const target = e.target.closest(".task_category");
        if (target) {
            remove_all_active_menu();
            target.classList.add("active");
            const id = target.id;

            renderDynamicView(id, project);
        }
    });
}

export function add_event_listener_on_project_list(projects) {
    document.querySelector(".to_do_projects_list_container").addEventListener("click", function (e) {
        const target = e.target.closest(".side_menu");
        if (target) {
            remove_all_active_menu();
            target.classList.add("active");
            const id = target.id;
            renderDynamicProjectView(id, projects);

        }
    });
}

function renderDynamicView(id, projects) {
    switch (id) {
        case "all":
            renderAllTasks(projects);
            break;
        case "today":
            renderTodayTask(projects);
            break;
        case "important":
            renderImportantTask(projects);
            break;
        case "completed":
            renderCompletedTask(projects);
            break;
        case "week":
            renderWeekTask(projects);
            break;
    }
}

function renderDynamicProjectView(id, projects) {
    const tasks_list_container = document.querySelector(".tasks_list")
    const project = projects.find(project => project.id == id);

    tasks_list_container.innerHTML = ''

    let taskNumber = 0
    if (project) {
        const tasks = project.tasks
        document.querySelector("#dynamic_to_do_title").textContent = project.name;
        tasks.forEach((task, index) => {

            const taskItem = document.createElement("div")
            taskItem.className = "task_item"

            if (task.done) {
                taskItem.classList.add("done")
            } else {
                taskItem.classList.remove("done")
            }

            const taskInfo = document.createElement("div")
            taskInfo.className = "task_info"

            const doneBtn = document.createElement("button")
            doneBtn.className = "btn-done"
            doneBtn.style.border = "none"
            doneBtn.style.background = "transparent"
            doneBtn.style.cursor = "pointer"
            doneBtn.dataset.taskId = task.id


            // fonction pour mettre à jour l'icône selon l'état done
            function updateIcon() {
                doneBtn.innerHTML = task.done
                    ? `<i class="fas fa-check-circle" style="color:#f6d365"></i>`
                    : `<i class="far fa-circle" style="color:#fda085"></i>`
            }

            updateIcon()

            addEventListenerOnDoneBtn(doneBtn, task, projects)

            const taskTitle = document.createElement("div")
            taskTitle.className = "task_title"
            taskTitle.textContent = task.title

            const task_actions = document.createElement("div")
            task_actions.className = "task_actions"

            // date
            const dateDiv = document.createElement("div")
            dateDiv.className = "task_date"
            dateDiv.textContent = task.dueDate

            const viewTask = document.createElement("div")
            viewTask.className = "view_task"
            viewTask.dataset.taskId = task.id
            viewTask.innerHTML = `<i class="fas fa-info-circle" style="color : lightblue;"></i>`

            viewTaskAddEventListener(viewTask, task)

            const editTask = document.createElement("div")
            editTask.className = "edit_task"
            editTask.dataset.taskId = task.id
            editTask.innerHTML = `<i class="far fa-edit" style="color : #f6d365;"></i>`

            editTaskAddEventListener(editTask, task, datePicker1)

            const deleteTask = document.createElement("div")
            deleteTask.className = "delete_task"
            deleteTask.dataset.taskId = task.id
            deleteTask.innerHTML = `<i class="fas fa-trash-alt" style="color : #fda085;"></i>`

            deleteTaskAddEventListener(deleteTask, task.id, projects)


            task_actions.appendChild(dateDiv)
            task_actions.appendChild(viewTask)
            task_actions.appendChild(editTask)
            task_actions.appendChild(deleteTask)

            taskInfo.appendChild(doneBtn)
            taskInfo.appendChild(taskTitle)

            taskItem.appendChild(taskInfo)
            taskItem.appendChild(task_actions)

            tasks_list_container.appendChild(taskItem)

            taskNumber++

            console.log("taskNumber", taskNumber)

        })
    }
    const taskNumberElement = document.querySelector("#task_number")
    taskNumberElement.textContent = taskNumber
}


