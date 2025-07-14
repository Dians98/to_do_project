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
import {renderAllTasks} from "./assets/js/dom.js"



document.addEventListener('DOMContentLoaded', () => {
    const projects = initializeDefaultProject();
    renderAllTasks(projects)
})


function initializeDefaultProject() {
    let today = new Date()
    today = formatDate(today)

    //Créer un tableau d'objets
    const projects = [];

    const defaultProject = new Project("Default")

    projects.push(defaultProject)


    const tasks = [
        new Task(1, 'Créer le composant Task', 'Développer l’affichage d’une tâche', today),
        new Task(2, 'Implémenter la gestion des projets', 'Associer les tâches aux projets', today),
        new Task(3, 'Ajouter la fonctionnalité "marquer comme fait"', 'Toggle état done', today),
        new Task(4, 'Construire la sidebar', 'Menu catégories et projets', today),
        new Task(5, 'Intégrer le style CSS', 'Responsive design et thèmes', today),
        new Task(6, 'Gérer le stockage local', 'Sauvegarder les tâches en localStorage', today),
        new Task(7, 'Ajouter les filtres Today / Week / Important', 'Filtrage dynamique', today),
        new Task(8, 'Développer les boutons CRUD', 'Créer, éditer, supprimer tâches', today),
        new Task(9, 'Tester le rendu dynamique des tâches', 'Vérifier la mise à jour du DOM', today),
        new Task(10, 'Préparer le déploiement GitHub Pages', 'Serveur statique avec Webpack', today)
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



