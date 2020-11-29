import {GameArea} from "./GameArea.js"
import {Interface} from "./Interface.js"

export class RainDrops {
    constructor() {
        this.gameArea = new GameArea();
        this.gameInterface = new Interface();
        this.isDecided = false;
    }
    initRainDrops() {
        this.gameInterface.initInterface();
        this.gameArea.init();
        this.startGame();
        this.handleEvents();
        console.log(this.gameArea.dropObject.dropElement.getBoundingClientRect().height)
        
    }
    startGame() {
        let exit;
        
        do {
            this.gameArea.dropObject.initDrop(this.gameArea.area);
            exit = this.checkDivide();
        }while(!exit);

        const time = setInterval( () => { // ЗАПУСК 
        this.gameArea.dropObject.fallDrop();

            if(this.gameArea.dropObject.dropElement.offsetTop >= this.gameArea.water.getBoundingClientRect().y - this.gameArea.dropObject.dropElement.getBoundingClientRect().height) {
                this.gameInterface.decreaseScrore();
                
                if(this.gameArea.water.offsetTop / 2 <= this.gameArea.dropObject.dropElement.getBoundingClientRect().height) {
                    this.gameArea.dropObject.destroyDrop();
                    clearInterval(time);
                   return;
                }
                clearInterval(time);
                this.gameArea.waterIncrease();
                this.gameArea.dropObject.destroyDrop();
                this.startGame();
            }
            if(this.isDecided) {
                this.isDecided = false;
                clearInterval(time);
                this.gameArea.dropObject.destroyDrop();
                this.startGame();
            }
            
        }, 20);
           
        
    }
    

    handleEvents() {
        window.addEventListener('keydown', (e) => {
            
            const btn = this.gameInterface.buttons.querySelector(`[data-name="${e.code}"]`);
            if(btn.dataset.name === "NumpadEnter") {
                this.checkSolution();
                return;
            }else if(btn.dataset.name === "Backspace") {
                this.gameInterface.display.value = this.gameInterface.display.value.substring(0, this.gameInterface.display.value.length - 1);
                document.querySelector('.press').play();
                return;
            }
            
           this.gameInterface.display.value += btn.textContent;
         })

        this.gameInterface.keyboard.addEventListener('click', (e) => {
            const selectedButton = e.target.closest('button');
           
        if(!selectedButton) return;
        
        
        switch(selectedButton.textContent) {
            case "Enter":
                this.checkSolution();
            break;
            case "Delete":
                this.gameInterface.display.value = this.gameInterface.display.value.substring(0, this.gameInterface.display.value.length - 1);
                document.querySelector('.press').play();
            break;
            case "Clear":
                this.gameInterface.display.value = "";
                document.querySelector('.press').play();
             break;
             default:
                document.querySelector('.press').play();
                 this.gameInterface.display.value += selectedButton.textContent;
             break;
        }
        })
    }
    checkSolution() {
        const displayValue = Number(this.gameInterface.display.value);
        const firstValue = +this.gameArea.dropObject.firstValue.textContent;
        const secondValue = +this.gameArea.dropObject.secondValue.textContent;
        this.gameInterface.display.value = "";
        let solution;
        switch(this.gameArea.dropObject.operation.textContent) {
            case "+":
                solution =  firstValue + secondValue;
            break;
            case "-":
                solution = firstValue - secondValue;
            break;
            
            case "/":
                solution = firstValue / secondValue;
            break;
            case "*":
                solution = firstValue * secondValue;
            break;
 
        }
        if(solution === displayValue) {
            this.isDecided = true;
        this.gameInterface.increaseScore();
        } else {
            console.log(1);
            this.gameInterface.decreaseScrore();
        }
 
    }
    checkDivide() {
        if(this.gameArea.dropObject.operation.textContent === "/") {
            const firstValue = +this.gameArea.dropObject.firstValue.textContent;
            const secondValue = +this.gameArea.dropObject.secondValue.textContent;
            return firstValue % secondValue === 0;
        }
        return true;
        

    }
 
}