import TODO from '../js/todo.js';

class Project {
    #name;
    #color;
    todos = [];
    
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.todos = [];
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
    
    toJSON() {
        return {
            name: this.name,
            color: this.color,
            todos: this.todos
        }
    }
};

export default Project;