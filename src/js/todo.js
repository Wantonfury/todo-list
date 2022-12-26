class TODO {
    #title;
    #description;
    #dueDate;
    #priority;
    #id;
    
    static _idsGenerated = [];
    
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = this.constructor.generateID();
    }
    
    static generateID() {
        if (!this._idsGenerated || this._idsGenerated.length <= 0) {
            this._idsGenerated = [0];
            return 0;
        }
        
        for (let id = 0; id <= 100; ++id) {
            if (!this._idsGenerated.includes(id)) {
                this._idsGenerated.push(id);
                return id;
            }
        }
    }
    
    get title() {
        return this.#title;
    }
    
    set title(value) {
        this.#title = value;
    }
    
    get description() {
        return this.#description;
    }
    
    set description(value) {
        this.#description = value;
    }
    
    get dueDate() {
        return this.#dueDate;
    }
    
    set dueDate(value) {
        this.#dueDate = value;
    }
    
    get priority() {
        return this.#priority;
    }
    
    set priority(value) {
        this.#priority = value;
    }
    
    get id() {
        return this.#id;
    }
    
    set id(value) {
        this.#id = value;
    }
    
    toJSON() {
        return {
            title: this.#title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            id: this.id
        }
    }
}

export default TODO;