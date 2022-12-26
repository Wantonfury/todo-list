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
        
        check.addEventListener('click', eventCheck.bind(this));
        
        if (!projects[projectActive].todos) projects[projectActive].todos = [ todo.id ];
        else projects[projectActive].todos.push(todo.id);
        
        storage.saveProjects(projects);
        storage.saveTODOS(todos);
    }
    
    const removeTODO = (id) => {
        const todo = todos.find(t => t.id == id);
        todos.splice(todos.indexOf(todo), 1);
        
        const todoID = projects[projectActive].todos.find(t => t == id);
        projects[projectActive].todos.splice(projects[projectActive].todos.indexOf(todoID), 1);
        
        storage.saveProjects(projects);
        storage.saveTODOS(todos);
    }
    
    const loadTODO = (projectID, todoID) => {
        const todo = todos.find(t => t.id === todoID);
        domManager.addTODO(todo);
        
        const checkAll = document.querySelectorAll('.todo-task-check');
        const check = checkAll[checkAll.length - 1];
        
        check.addEventListener('click', eventCheck.bind(this));
    }
    
    const loadTODOS = () => {
        todos = storage.loadTODOS();
        
        /*8projects.forEach((p, pID) => {
            if (p.todos) {
                p.todos.forEach(id => {
                    loadTODO(pID, id);
                });
            }
        });*/
        
        const project = projects[projectActive];
        
        if (project.todos) {
            project.todos.forEach(id => {
                loadTODO(projectActive, id);
            });
        }
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
            
            const todo = new TODO('Hello world! ' + todos.length, 'Just a description m\'lord.', '23 Dec', 1);
            addTODO(todo);
            
        });
    }
    
    const setActiveTab = (tab) => {
        for (const tab of tabs) domManager.setInactive(tab);
        
        domManager.setActive(tab);
        tabActive = tab;
        
        const tabName = tab.querySelector('span').textContent;
        const project = projects.find(p => p.name === tabName);
        projectActive = projects.indexOf(project);
        
        populateTODO();
        loadTODOS();
    }
    
    const eventSelectTab = (e) => {
        if (e.target.tagName.toLowerCase() === 'input') return;
        setActiveTab(e.currentTarget);
    }
    
    const eventCheck = (e) => {
        removeTODO(e.currentTarget.parentElement.dataset.id);
        e.currentTarget.parentElement.remove();
    }
    
    const setupSelection = () => {
        const inbox = document.querySelector('#inbox');
        inbox.addEventListener('click', eventSelectTab.bind(this));
        tabs.push(inbox);
        
        if (projects.find(p => p.name === 'Inbox')) return;
        
        const project = new Project('Inbox', '');
        projects.push(project);
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
        }
        
        if (projects.length > maxProjects) {
            projects.splice(maxProjects);
            storage.saveProjects(projects);
        }
        domManager.setMaxProjects(maxProjects);
        
        setupSelection();
        setActiveTab(tabs[0]);
        
        
        //loadTODOS();
        
        projects.forEach(project => {
            if (project.name === 'Inbox') return;
            
            const p = domManager.addProject(project.name, project.color);
            p.addEventListener('click', eventSelectTab.bind(this));
            tabs.push(p);
        });
        
    }
    
    return { init };
})();

domManager.init();
todoManager.init();