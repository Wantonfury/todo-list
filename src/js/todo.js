class TODO {
    #title;
    #description;
    #dueDate;
    #priority;
    
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
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
    priority
    set title(value) {
        this.#priority = value;
    }
}

export default TODO;