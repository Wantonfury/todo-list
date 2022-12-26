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
    
    const saveTODOS = (todos) => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    return { loadProjects, saveProjects, loadTODOS, saveTODOS };
})();

export default storage;