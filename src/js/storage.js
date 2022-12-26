import Project from './project.js';

const storage = (() => {
    const loadProjects = () => {
        const projects = localStorage.getItem('projects');
        
        if (!projects) return [];
        return JSON.parse(projects);
    }
    
    const saveProjects = (projects) => {
        localStorage.clear();
        localStorage.setItem('projects', JSON.stringify(projects));
    }
    
    return { loadProjects, saveProjects };
})();

export default storage;