const task_categories = document.querySelectorAll(".task_category");
const to_do_projects_lists = document.querySelectorAll(".to_do_projects_list");


task_categories.forEach(task_category => {
    task_category.addEventListener("click", function () {
        remove_all_active_menu();
        this.classList.add("active")
    })
});

to_do_projects_lists.forEach(to_do_projects_list => {
    to_do_projects_list.addEventListener("click", function () {
        remove_all_active_menu();
        this.classList.add("active")
    })
});

/**
 * CETTE FONCTION ENLEVE TOUS LES ACTIVE DES MENUS 
 */
function remove_all_active_menu() {
    task_categories.forEach(tc => tc.classList.remove("active"));
    to_do_projects_lists.forEach(tdpl => tdpl.classList.remove("active"));
}