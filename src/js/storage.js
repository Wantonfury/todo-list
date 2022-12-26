import Project from './project.js';

const storage = (() => {
    const loadProjects = () => {
        const projects = localStorage.getItem('projects');
        
        if (!projects) return [];
        return JSON.parse(projects);
    }
    
    const saveProjects = (projects) => {
        localStorage.setItem('projects', JSON.stringify(projects));
    }
    
    const loadTODOS = () => {
        const todos = localStorage.getItem('todos');
        
        if (!todos) return [];
        return JSON.parse(todos);
    }
    
    const loadTODOSIDs = () => {
        return JSON.parse(localStorage.getItem('todosIDs'));
    }
    
    const saveTODOS = (todos, ids) => {
        localStorage.setItem('todos', JSON.stringify(todos));
        localStorage.setItem('todosIDs', JSON.stringify(ids));
    }
    
    return { loadProjects, saveProjects, loadTODOS, loadTODOSIDs, saveTODOS };
})();

export default storage;