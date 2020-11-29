export class Interface {
    constructor() {
        this.interface = null;
        this.score = null;
        this.scoreValue = null;
        this.keyboard = null;
        this.keys = [];
        this.screen = null;
        this.display = null;
        this.buttons = null;
    }
 
    initInterface() {
        this.interface = document.createElement('div');
        this.interface.classList.add('interface');
        
        this.score = document.createElement('div');
        this.score.classList.add('score');
        this.scoreValue = document.createElement('span');
        this.scoreValue.classList.add('score__value');
        this.scoreValue.textContent = 0;
        this.score.append(this.scoreValue);
        this.interface.append(this.score, this.createKeyboard());
 
        document.querySelector('.app').prepend(this.interface);
    }
 
       
    createScreen() {
     this.screen = document.createElement('div');
     this.screen.classList.add('keyboard-screen');
 
     this.display = document.createElement('input');
     this.display.classList.add('keyboard-screen__display');
     this.display.setAttribute("type", "text");
     this.display.setAttribute("placeholder", "0");
     this.display.setAttribute('disabled', true);
     
     this.screen.append(this.display);
     return this.screen;
    }
 
    createKeys() {
        const fragment = document.createDocumentFragment();
        
       
        const keys = ["7", "8", "9", "Clear", "4", "5", "6", "1", "2", "3","Enter" , "0", "Delete"];
        keys.forEach(key => {
            const button = document.createElement('button');
            button.classList.add('keyboard-buttons__button');
            switch(key) {
                case "Clear":
                    button.classList.add('keyboard-buttons__button--clear', "keyboard-buttons__button--long");
                     button.setAttribute("data-name", `Backspace`);
                    
                 break;
                 case "Enter":
                     button.classList.add("keyboard-buttons__button--long" , "keyboard-buttons__button--enter");
                     button.setAttribute("data-name", `NumpadEnter`);
                 break;
                 case "Delete":
                     button.classList.add("keyboard-buttons__button--wide" , "keyboard-buttons__button--delete");
                 break;
                 default:
                     button.setAttribute("data-name", `Digit${key}`);
                     button.setAttribute("data-name", `Numpad${key}`);
                 break;
            }
            button.textContent = key;
            fragment.append(button);
        });
 
        return fragment;
    }
 
    createButtonsArea() {
        this.buttons = document.createElement('div');
        this.buttons.classList.add('keyboard-buttons');
        this.buttons.append(this.createKeys());
        return this.buttons;
    }
 
    createKeyboard() {
        this.keyboard = document.createElement('div');
        this.keyboard.classList.add('keyboard');
        this.keyboard.append(this.createScreen(), this.createButtonsArea());
        return this.keyboard;
    }
    increaseScore() {
     this.scoreValue.textContent = +this.scoreValue.textContent + 15;
     this.scoreValue.classList.add('score__value--increase');
     setTimeout(() => {
        this.scoreValue.classList.remove('score__value--increase');
     },500)
    }
    decreaseScrore() {
        document.querySelector('.error').play();
        this.scoreValue.textContent -= 15;
        this.scoreValue.classList.add('score__value--decrease');
        setTimeout(() => {
         this.scoreValue.classList.remove('score__value--decrease')
        },500)
    }
 
    pressButton() {
 
    }
    
 }