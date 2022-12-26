import '../styles/index.css';
import domManager from '../js/dom.js';
import Project from '../js/project.js';
import TODO from '../js/todo.js';
import storage from '../js/storage.js';

const todoManager = (() => {
    const maxProjects = 5;
    
    let tabs = [];
    let tabActive;
    
    let projects = [];
    let projectActive;
    
    let todos = [];
    let todosMax = 6;
    
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
    
    const addTODO = (todo) => {
        todos.push(todo);
        domManager.addTODO(todo);
            
        const checkAll = document.querySelectorAll('.todo-task-check');
        const check = checkAll[checkAll.length - 1];
        
        check.addEventListener('click', (e) => {
            removeTODO(e.currentTarget.dataset.id);
            e.currentTarget.parentElement.remove();
        });
        
        
    }
    
    const removeTODO = (id) => {
        const todo = todos.find(t => t.id === id);
        todos.splice(todos.indexOf(todo), 1);
    }
    
    const loadProjects = () => {
        projects = storage.loadProjects();
        if (projects.length === 0) return false;
        return true;
    }
    
    const populateTODO = () => {
        domManager.populateTODO();
        
        const addTask = document.querySelector('#todo-add');
        addTask.addEventListener('click', () => {
            if (todos.length >= todosMax) return;
            
            const todo = new TODO('Hello world!', 'Just a description m\'lord.', '23 Dec', 1);
            addTODO(todo);
            
        });
    }
    
    const setActiveTab = (tab) => {
        for (const tab of tabs) domManager.setInactive(tab);
        
        domManager.setActive(tab);
        tabActive = tab;
        
        populateTODO();
    }
    
    const eventSelectTab = (e) => {
        if (e.target.tagName.toLowerCase() === 'input') return;
        setActiveTab(e.currentTarget);
    }
    
    const setupSelection = () => {
        const inbox = document.querySelector('#inbox');
        
        inbox.addEventListener('click', eventSelectTab.bind(this));
        const project = new Project('inbox', '');
        projects.push(project);
        
        tabs.push(inbox);
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
            projects.splice(maxProjects);
            storage.saveProjects(projects);
        }
        domManager.setMaxProjects(maxProjects);
        
        setupSelection();
        setActiveTab(tabs[0]);
        
        projects.forEach(project => {
            const p = domManager.addProject(project.name, project.color);
            p.addEventListener('click', eventSelectTab.bind(this));
            tabs.push(p);
        });
        
    }
    
    return { init };
})();

domManager.init();
todoManager.init();