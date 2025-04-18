import { Functions } from "./functions.js";
const functions = new Functions();

class Good {
    constructor(name, price, color) {
        this._width = 3;
        this._name = name;
        this._price = price;
        this._color = color;
    };

    create() {
        const container = document.querySelector(".flexContainer");
        const newItem = document.createElement("div");
        newItem.classList.add("item");
        const nameText = document.createElement("p");
        const priceText = document.createElement("p");
        nameText.textContent = `Name: ${this._name}`;
        priceText.textContent = `Price: ${this._price}`;
        newItem.appendChild(nameText);
        newItem.appendChild(priceText);
        newItem.style.background = this._color;
        newItem.style.border = `${this._width}px solid black`;
        container.appendChild(newItem);
    }
}

const item1 = new Good("Iphone 16", "50 000", "white");
const item2 = new Good("Iphone 15", "30 000", "white");

item1.create();
item2.create();

class TestUser {
    constructor(age) {
        this._default_age = age > 0 ? age : 14;
    };

    get age() {
        return this._default_age;
    }

    set age(value) {
        if (value <= 0 || value > 120) return console.error("Некорректный возраст.");
        this._default_age = value;
    }
}

const user1 = new TestUser();
const user2 = new TestUser(24);
console.log(user1.age);
console.log(user2.age);

user2.age = 121;

class User {
    static type = "User";
    static baseId = 0;
    constructor(name) {
        this.id = User.baseId;
        User.baseId++;
        this.name = name;
        console.log(`User ${this.name} created!!!`);
    };

    comment(message) {
        const mainContainer = document.querySelector(".textContainer");
        if (mainContainer) {
            const msg = document.createElement("h2");
            msg.textContent = `${this.name} - ${message}`;
            msg.style.fontWeight = 400;
            mainContainer.appendChild(msg);
        }
        
    }
}

const testuser = new User("Vlad");
const testuser2 = new User("Kostya");
testuser.comment("Message");
testuser2.comment("Message two");

class ModerateUser extends User {
    static type = "Moderator";
    constructor(name, age) {
        super(name);
        this.age = age;
    };

    comment(message) {
        const mainContainer = document.querySelector(".textContainer");
        if (mainContainer) {
            const msg = document.createElement("h2");
            msg.textContent = `${this.name} - ${message}`;
            msg.style.fontWeight = 800;
            mainContainer.appendChild(msg);
        }
        
    }
}

const testuser3 = new ModerateUser("Admin", 21);
testuser3.comment("Здарова");