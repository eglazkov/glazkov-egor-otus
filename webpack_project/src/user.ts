class User {
    fullname: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string){
        this.fullname = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function todoHeader(person: Person) {
    return "Todo list for " + person.firstName + " " + person.lastName;
}

let user = new User("John", "A.", "Smith");

export default todoHeader(user);