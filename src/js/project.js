class Project {
    constructor(name, color) {
        this._name = name;
        this._color = color;
    }
    
    get name() {
        return this._name;
    }
    
    set name(name) {
        this._name = name;
    }
    
    get color() {
        return this._color;
    }
    
    set color(color) {
        this._color = color;
    }
    
    toJson() {
        return {
            name: this._name,
            color: this._color
        }
    }
};

export default Project;