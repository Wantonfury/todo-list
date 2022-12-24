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
        const overlay = document.querySelector('#projects-add-form-overlay');
        const form = document.querySelector('#projects-add-form');
        const btnCancel = document.querySelector('#form-btn-cancel');
        
        const toggle = document.querySelector('#projects-toggle');
        
        toggle.addEventListener('click', (e) => {
            e.currentTarget.classList.toggle('projects-add-close');
            
            const list = document.querySelector('#projects-list');
            list.classList.toggle('projects-list-hide');
        });
        
        add.addEventListener('click', () => {
            const formContainer = document.querySelector('#projects-add-form-cnt');
            
            formContainer.classList.remove('form-hide');
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.currentTarget === e.target) {
                const formContainer = document.querySelector('#projects-add-form-cnt');
                formContainer.classList.add('form-hide');
            }
        });
        
        const formReset = (formContainer) => {
            const name = document.querySelector('#form-add');
            const colorCode = document.querySelector('#form-color-picker .color-picker-color');
            const colorName = document.querySelector('#form-color-picker .color-picker-name');
            
            name.value = '';
            colorCode.style.backgroundColor = '#fffffe';
            colorName.textContent = 'White';
        }
        
        btnCancel.addEventListener('click', (e) => {
            const formContainer = document.querySelector('#projects-add-form-cnt');
            formContainer.classList.add('form-hide');
            
            formReset(formContainer);
            
            e.preventDefault();
        });
        
        form.addEventListener('submit', (e) => {
            const formContainer = document.querySelector('#projects-add-form-cnt');
            formContainer.classList.add('form-hide');
            
            formReset(formContainer);
            
            e.preventDefault();
        });
    }
    
    const setupProjectsTabColor = () => {
        const colorPicker = document.querySelector('#form-color-picker');
        const list = document.querySelector('#color-picker-list');
        
        window.addEventListener('click', (e) => {
            if (e.target.matches('li.color-picker-item') || e.target.matches('#form-color-picker')) {
                list.classList.toggle('hide-color');
                
                if (e.target.matches('li.color-picker-item')) {
                    const colorCode = e.target.querySelector('.color-picker-color');
                    const colorName = e.target.querySelector('.color-picker-name');
                    
                    colorPicker.querySelector('.color-picker-color').style.backgroundColor = colorCode.style.backgroundColor;
                    colorPicker.querySelector('.color-picker-name').textContent = colorName.textContent;
                }
            } else
                list.classList.add('hide-color');
        })
    }
    
    const addProject = () => {
        
    }
    
    const init = () => {
        setupHeaderButtons();
        setupProjectsTab();
        setupProjectsTabColor();
    }
    
    return { init, addProject };
})();

export default domManager;