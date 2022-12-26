let todoID = 0;

class TODO {
    #title;
    #description;
    #dueDate;
    #priority;
    #id;
    
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = todoID++;
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