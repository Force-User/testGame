import {Drop} from "./Drop.js";

class GameArea {
    constructor() {
        this.area = null;
        this.water = null;
        this.stone = null;
        this.dropObject = new Drop();
    }
    init() {
        this.createGameElements();
    }
    createGameElements() {
        this.area = document.createElement('div');
        this.area.classList.add('game-area');

        this.stone = document.createElement('img');
        this.stone.classList.add('stone');
        this.stone.src = "./assets/image/stone2.png";
        this.stone.alt = "";

        this.water = document.createElement('div');
        this.water.classList.add('water');
        this.area.append(this.water,this.stone);
        document.querySelector('.app').prepend(this.area);
    }
    waterIncrease() {
        this.water.style.height = `${this.water.offsetHeight + 70}px`
    }
   
}
export {GameArea};