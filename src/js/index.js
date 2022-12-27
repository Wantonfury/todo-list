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
        const task = domManager.addTODO(todo);
        
        task.querySelector('.todo-task-delete').addEventListener('click', () => {
            removeTODO(task.dataset.id);
            task.remove();
        });
            
        const checkAll = document.querySelectorAll('.todo-task-check');
        const check = checkAll[checkAll.length - 1];
        
        check.addEventListener('click', eventCheck.bind(this));
        
        if (!projects[projectActive].todos) projects[projectActive].todos = [ todo.id ];
        else projects[projectActive].todos.push(todo.id);
        
        storage.saveProjects(projects);
        storage.saveTODOS(todos, TODO._idsGenerated);
    }
    
    const removeTODO = (id) => {
        const todo = todos.find(t => t.id == id);
        todos.splice(todos.indexOf(todo), 1);
        
        const todoID = projects[projectActive].todos.find(t => t == id);
        projects[projectActive].todos.splice(projects[projectActive].todos.indexOf(todoID), 1);
        TODO._idsGenerated.splice(TODO._idsGenerated.indexOf(todoID), 1); // Remove ids from list of generated ids
        
        storage.saveProjects(projects);
        storage.saveTODOS(todos, TODO._idsGenerated);
    }
    
    const loadTODO = (projectID, todoID) => {
        const todo = todos.find(t => t.id === todoID);
        const task = domManager.addTODO(todo);
        
        task.querySelector('.todo-task-delete').addEventListener('click', () => {
            removeTODO(task.dataset.id);
            task.remove();
        });
        
        const checkAll = document.querySelectorAll('.todo-task-check');
        const check = checkAll[checkAll.length - 1];
        
        check.addEventListener('click', eventCheck.bind(this));
    }
    
    const loadTODOS = () => {
        todos = storage.loadTODOS();
        let id = storage.loadTODOSIDs();
        TODO._idsGenerated = id;
        
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
            if (projects[projectActive].todos.length >= todosMax) return;
            domManager.toggleModalTaskAdd();
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
    
    const setupModalTaskAdd = () => {
        const form = document.querySelector('#modal-add-task');
        const cancel = document.querySelector('#modal-add-task .modal-btns-cancel');
        const overlay = document.querySelector('#modal-add-task .modal-overlay');
        
        cancel.addEventListener('click', () => {
            domManager.toggleModalTaskAdd();
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                domManager.toggleModalTaskAdd();
            }
        });
        
        form.addEventListener('submit', (e) => {
            const title = document.querySelector('#modal-task-title').value;
            const desc = document.querySelector('#modal-task-desc').value;
            const date = document.querySelector('#modal-task-date').value;
            const priority = document.querySelector('#modal-task-priority').value;
            
            if (projects[projectActive].todos.length < todosMax) {
                const todo = new TODO(title, desc, date, priority);
                addTODO(todo);
            }
            
            domManager.toggleModalTaskAdd();
            e.preventDefault();
        });
    }
    
    const setupModalTaskEdit = () => {
        const form = document.querySelector('#modal-edit-task');
        const cancel = document.querySelector('#modal-edit-task .modal-btns-cancel');
        const overlay = document.querySelector('#modal-edit-task .modal-overlay');
        
        cancel.addEventListener('click', () => {
            domManager.toggleModalTaskEdit();
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                domManager.toggleModalTaskEdit();
            }
        });
        
        form.addEventListener('submit', (e) => {
            const title = document.querySelector('#modal-edit-title').value;
            const desc = document.querySelector('#modal-edit-desc').value;
            const date = document.querySelector('#modal-edit-date').value;
            const number = document.querySelector('#modal-edit-priority').value;
            
            const todo = todos.find(t => t.id == form.dataset.id);
            todo.title = title;
            todo.description = desc;
            todo.date = date;
            todo.number = number;
            
            domManager.editTODO(todo);
            storage.saveTODOS(todos, TODO._idsGenerated);
            
            domManager.toggleModalTaskEdit();
            e.preventDefault();
        });
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
        
        setupModalTaskAdd();
        setupModalTaskEdit();
        
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

window.checkTODOS = function() {
    return TODO._idsGenerated;
}