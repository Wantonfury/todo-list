const domManager = (() => {
    const addProject = (name, color) => {
        const list = document.querySelector('#projects-list');
        
        list.innerHTML += `
        <div class="project">
        <div class="color-picker-color" style="background-color:` + color +`;"></div>
            <span class="dash-text">` + name + `</span>
            <span class="dash-tasks"></span>
        </div>`;
    }
    
    const setActive = (project) => {
        
    }
    
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
    
    // Empty name field and reset color choice to default
    const formReset = (formContainer) => {
        const name = document.querySelector('#form-add');
        const colorCode = document.querySelector('#form-color-picker .color-picker-color');
        const colorName = document.querySelector('#form-color-picker .color-picker-name');
        const btn = document.querySelector('#form-btn-add');
        
        btn.classList.add('disabled');
        name.value = '';
        colorCode.style.backgroundColor = '#fffffe';
        colorName.textContent = 'White';
    }
    
    // Sets up the projects modal
    const setupProjectsModal = () => {
        const add = document.querySelector('#projects-add');
        const overlay = document.querySelector('#projects-add-form-overlay');
        const form = document.querySelector('#projects-add-form');
        const btnCancel = document.querySelector('#form-btn-cancel');
        const textField = document.querySelector('#form-add');
        
        const toggle = document.querySelector('#projects-toggle');
        
        // Hide or show project list
        toggle.addEventListener('click', (e) => {
            e.currentTarget.classList.toggle('projects-add-close');
            
            const list = document.querySelector('#projects-list');
            list.classList.toggle('projects-list-hide');
        });
        
        // Show modal for project addition
        add.addEventListener('click', () => {
            const formContainer = document.querySelector('#projects-add-modal');
            
            formReset(formContainer);
            formContainer.classList.remove('form-hide');
        });
        
        // Exit Project Modal if user clicks outside of it
        overlay.addEventListener('click', (e) => {
            if (e.currentTarget === e.target) {
                const formContainer = document.querySelector('#projects-add-modal');
                formContainer.classList.add('form-hide');
            }
        });
        
        // Exit project modal
        btnCancel.addEventListener('click', (e) => {
            const formContainer = document.querySelector('#projects-add-modal');
            formContainer.classList.add('form-hide');
            
            e.preventDefault();
        });
        
        // Disable add button if name field is empty
        textField.addEventListener('input', (e) => {
            if (e.currentTarget.value.length > 0) {
                document.querySelector('#form-btn-add').classList.remove('disabled');
            }
            else {
                document.querySelector('#form-btn-add').classList.add('disabled');
            }
        });
    }
    
    // Sets the color picker
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
    
    const init = () => {
        setupHeaderButtons();
        setupProjectsModal();
        setupProjectsTabColor();
    }
    
    return { init, addProject, setActive };
})();

export default domManager;