import Project from './project.js';

const storage = (() => {
    const loadProjects = () => {
        const projects = localStorage.getItem('projects');
        
        if (!projects) return [];
        return JSON.parse(projects);
        /*let projectsFinal = [];
        for (const project of projects) {
            const p = Object.assign(new Project(), JSON.parse(project));
            projectsFinal.push(p);
        }
        return projectsFinal;*/
    }
    
    const saveProjects = (projects) => {
        console.log("Project " + projects[0].name + " will be saved as: ");
        console.log(JSON.stringify(projects[0]));
        
        localStorage.setItem('projects', JSON.stringify(projects));
    }
    
    return { loadProjects, saveProjects };
})();

export default storage;