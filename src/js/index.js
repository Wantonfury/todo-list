import '../styles/index.css';
import domManager from '../js/dom.js';
import Project from '../js/project.js';
import storage from '../js/storage.js';

const todo = (() => {
    let projects = [];
    let projectActive;
    
    const addProject = (name, color) => {
        const project = new Project(name, color);
        
        projects.push(project);
        storage.saveProjects(projects);
    }
    
    const loadProjects = () => {
        projects = storage.loadProjects();
        if (projects.length === 0) return false;
        return true;
    }
    
    const selectProject = (e) => {
        const name = e.currentTarget.querySelector('.dash-text').textContent;
        
        projectActive = projects.find(p => p.name === name);
        domManager.setActive(e.currentTarget);
    }
    
    const init = () => {
        const projectAdd = document.querySelector('#projects-add-form');
        
        projectAdd.addEventListener('submit', (e) => {
            if (document.querySelector('#form-btn-add').classList.contains('disabled')) {
                e.preventDefault();
                return;
            }
            
            const formContainer = document.querySelector('#projects-add-modal');
            formContainer.classList.add('form-hide');
            
            const name = document.querySelector('#form-add').value;
            const color = document.querySelector('#form-color-picker .color-picker-color').style.backgroundColor;
            
            addProject(name, color);
            domManager.addProject(name, color);
            e.preventDefault();
        });
        
        if (!loadProjects()) {
            addProject('Default', '#fffffe');
            projectActive = projects[0];
        }
        
        projects.forEach(project => {
            domManager.addProject(project.name, project.color);
        });
    }
    
    return { init };
})();

domManager.init();
todo.init();