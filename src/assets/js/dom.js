import * as bootstrap from 'bootstrap';
import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';

export function renderAllTasks(projects) {
    const tasks_list_container = document.querySelector(".tasks_list")

    tasks_list_container.innerHTML = ''

    let taskNumber = 0

    const taskDueDate = document.querySelector("#task_due_date");
    let datePicker;
    datePicker = new Pikaday({
        field: taskDueDate,
        format: "YYYY-MM-DD",
        setDefaultDate: false,
    });

    projects.forEach(project => {
        const tasks = project.getAllTasks()


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

            viewTaskAddEventListener(viewTask, task,)


            const editTask = document.createElement("div")
            editTask.className = "edit_task"
            editTask.dataset.taskId = task.id
            editTask.innerHTML = `<i class="far fa-edit" style="color : #f6d365;"></i>`

            editTaskAddEventListener(editTask, task, datePicker)

            const deleteTask = document.createElement("div")
            deleteTask.className = "delete_task"
            deleteTask.dataset.taskId = task.id
            deleteTask.innerHTML = `<i class="fas fa-trash-alt" style="color : #fda085;"></i>`


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

function addEventListenerOnDoneBtn(doneBtn, task, projects) {
    doneBtn.addEventListener("click", function () {
        task.toggleDone()
        refreshDom(projects)
    })
}

function refreshDom(projects) {
    const tasks_list = document.querySelector(".tasks_list")
    tasks_list.innerHTML = "" // ⬅️ Vider
    renderAllTasks(projects) // ⬅️ Recréer
}

function viewTaskAddEventListener(viewTask, task) {
    viewTask.addEventListener("click", function () {
        const taskId = this.dataset.taskId
        const taskModalElement = document.querySelector("#taskModal")
        const taskModal = new bootstrap.Modal(document.querySelector('#taskModal'));

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



        taskModal.show();
    });
}


function editTaskAddEventListener(editTask, task,  datePicker) {
    editTask.addEventListener("click", function () {
        const taskId = this.dataset.taskId
        const taskModalElement = document.querySelector("#taskModal")
        const taskModal = new bootstrap.Modal(document.querySelector('#taskModal'));

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


        taskModal.show();
    });
}