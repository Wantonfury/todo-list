import '../styles/index.css';
import domManager from '../js/dom.js';
import Project from '../js/project.js';
import TODO from '../js/todo.js';
import storage from '../js/storage.js';

const todo = (() => {
    const maxProjects = 5;
    
    let tabs = [];
    let tabActive;
    
    let projects = [];
    let projectActive;
    
    const addProject = (name, color) => {
        const project = new Project(name, color);
        
        projects.push(project);
        storage.saveProjects(projects);
    }
    
    const removeProject = (name) => {
        const project = projects.find(p => p.name === name);
        
        projects.splice(projects.indexOf(project), 1);
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
    
    const setActiveTab = (tab) => {
        for (const tab of tabs) domManager.setInactive(tab);
        
        domManager.setActive(tab);
        tabActive = tab;
    }
    
    const eventSelectTab = (e) => {
        if (e.target.tagName.toLowerCase() === 'input') return;
        setActiveTab(e.currentTarget);
    }
    
    const setupSelection = () => {
        const inbox = document.querySelector('#inbox');
        const today = document.querySelector('#today');
        const upcoming = document.querySelector('#upcoming');
        
        inbox.addEventListener('click', eventSelectTab.bind(this));
        today.addEventListener('click', eventSelectTab.bind(this));
        upcoming.addEventListener('click', eventSelectTab.bind(this));
        
        tabs.push(inbox, today, upcoming);
    }
    
    const init = () => {
        const projectAdd = document.querySelector('#projects-add-form');
        const btnDelete = document.querySelector('#btn-delete');
        
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
        
        btnDelete.addEventListener('click', (e) => {
            const target = e.currentTarget.parentElement.dataset.project;
            
            domManager.removeProject(target);
            removeProject(target);
        });
        
        if (!loadProjects()) {
            // If no projects were saved create a Default project
            
            addProject('Default', '#fffffe');
            projectActive = projects[0];
        }
        
        if (projects.length > maxProjects) {
            //console.log(projects.splice(4));
            console.log("Length: " + projects.length);
            projects.splice(maxProjects);
            storage.saveProjects(projects);
        }
        domManager.setMaxProjects(maxProjects);
        
        setupSelection();
        domManager.setActive(tabs[0]);
        
        projects.forEach(project => {
            const p = domManager.addProject(project.name, project.color);
            p.addEventListener('click', eventSelectTab.bind(this));
            tabs.push(p);
        });
        
    }
    
    return { init };
})();

domManager.init();
todo.init();