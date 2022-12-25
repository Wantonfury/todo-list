import '../styles/index.css';
import domManager from '../js/dom.js';
import Project from '../js/project.js';
import storage from '../js/storage.js';

const todo = (() => {
    let projects = [];
    
    const addProject = (name, color) => {
        const project = new Project(name, color);
        
        projects.push(project);
        storage.saveProjects(projects);
    }
    
    const loadProjects = () => {
        projects = storage.loadProjects();
    }
    
    const init = () => {
        const projectAdd = document.querySelector('#projects-add-form');
        
        projectAdd.addEventListener('submit', (e) => {
            const formContainer = document.querySelector('#projects-add-modal');
            formContainer.classList.add('form-hide');
            
            const name = document.querySelector('#form-add').value;
            const color = document.querySelector('#form-color-picker .color-picker-color').style.backgroundColor;
            
            addProject(name, color);
            domManager.addProject(name, color);
            e.preventDefault();
        });
        
        loadProjects();
        
        projects.forEach(project => {
            domManager.addProject(project.name, project.color);
        });
    }
    
    return { init };
})();

domManager.init();
todo.init();