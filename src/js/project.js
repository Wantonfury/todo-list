import TODO from '../js/todo.js';

class Project {
    #name;
    #color;
    #todo = [];
    
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
    
    get name() {
        return this.#name;
    }
    
    set name(value) {
        this.#name = value;
    }
    
    get color() {
        return this.#color;
    }
    
    set color(value) {
        this.#color = value;
    }
    
    addTODO = (todo) => {
        this.#todo.push(todo);
    }
    
    removeTODO = (title) => {
        const todo = this.#todo.find(t => t.title === title);
        this.#todo.splice(this.#todo.indexOf(todo), 1);
    }
    
    setTODO = (todo) => {
        this.#todo = todo;
    }
    
    getTODO = () => {
        return this.#todo;
    }
    
    toJSON() {
        return {
            name: this.name,
            color: this.color,
            setTODO: this.getTODO
        }
    }
};

export default Project;