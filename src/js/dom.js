const domManager = (() => {
    const setupHeaderButtons = () => {
        const btnMenu = document.querySelector('#icon-menu');
        const btnHome = document.querySelector('#icon-home');
        
        // Setup the menu button
        btnMenu.addEventListener('click', (e) => {
            const dash = document.querySelector('#dashboard');
            const todo = document.querySelector('#todo-content');
            
            if (dash.classList.contains('dashboard-hide')) {
                dash.classList.remove('dashboard-hide');
                todo.classList.remove('todo-expand');
            }
            else {
                dash.classList.add('dashboard-hide');
                todo.classList.add('todo-expand');
            }
        });
        
        // Setup the home button
        btnHome.addEventListener('click', () => {
            
        });
    }
    
    const init = () => {
        setupHeaderButtons();
    }
    
    return { init };
})();

export default domManager;