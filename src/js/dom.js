const domManager = (() => {
    const setupHeaderButtons = () => {
        const btnMenu = document.querySelector('#icon-menu');
        const btnHome = document.querySelector('#icon-home');
        
        // Setup the menu button
        btnMenu.addEventListener('click', (e) => {
            const dash = document.querySelector('#dashboard');
            const todo = document.querySelector('#todo-content');
            
            dash.classList.toggle('dashboard-hide');
            todo.classList.toggle('todo-expand');
        });
        
        // Setup the home button
        btnHome.addEventListener('click', () => {
            
        });
    }
    
    const setupProjectsTab = () => {
        const add = document.querySelector('#projects-add');
        const toggle = document.querySelector('#projects-toggle');
        
        toggle.addEventListener('click', (e) => {
            e.currentTarget.classList.toggle('projects-add-close');
            
            const list = document.querySelector('#projects-list');
            list.classList.toggle('projects-list-hide');
        })
    }
    
    const addProject = (name) => {
        
    }
    
    const init = () => {
        setupHeaderButtons();
        setupProjectsTab();
    }
    
    return { init, addProject };
})();

export default domManager;