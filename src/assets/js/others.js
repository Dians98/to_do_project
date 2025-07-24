document.querySelector(".sidebar_menus").addEventListener("click", function (e) {
    const target = e.target.closest(".side_menu");
    if (target) {
        remove_all_active_menu();
        target.classList.add("active");
    }
});



/**
 * CETTE FONCTION ENLEVE TOUS LES ACTIVE DES MENUS 
 */
function remove_all_active_menu() {
    document.querySelectorAll(".side_menu").forEach( side_menu => side_menu.classList.remove("active"));
}

document.querySelector(".to_do_projects_list_container").addEventListener("click", function (e) {
    const target = e.target.closest(".side_menu");
    if (target) {
        remove_all_active_menu();
        target.classList.add("active");
    }
});