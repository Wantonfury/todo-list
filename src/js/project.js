class Project {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
    
    /*get name() {
        return this.#name;
    }
    
    set name(name) {
        this.#name = name;
    }
    
    get color() {
        return this.#color;
    }
    
    set color(color) {
        this.#color = color;
    }*/
    
    toJson() {
        return {
            name: this.name,
            color: this.color
        }
    }
};

export default Project;