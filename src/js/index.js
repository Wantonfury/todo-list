import '../styles/index.css';
import domManager from '../js/dom.js';

const todo = (() => {
    let projects = [];
    
    const Project = (name) => {
        const project = {};
        
        project.name = name;
        
        return project;
    }
    
    const addProject = () => {
        
    }
    
    const init = () => {
        
    }
    
    return { init };
})();

domManager.init();
todo.init();