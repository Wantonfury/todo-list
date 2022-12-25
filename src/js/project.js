class Project {
    #name;
    #color;
    
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
    
    toJSON() {
        return {
            name: this.name,
            color: this.color
        }
    }
};

export default Project;