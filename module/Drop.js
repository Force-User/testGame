class Drop {
    constructor() {
        this.firstValue = null;
        this.secondValue = null;
        this.operation = null;
        this.dropElement = null;
        this.countLevel = 0;
        this.speedFall = 1;
        this.operationListSimple = ["+", "-"];
        this.operationListNormal = ["+", "-", "/", "*"];
    }
    initDrop(parent) {
        this.dropElement = document.createElement('div');
        this.dropElement.classList.add('drop');
        this.firstValue = document.createElement('span');
        this.firstValue.classList.add('drop__value');
        this.firstValue.textContent = this.getRandomNumber(1 , 10);
        this.secondValue = document.createElement('span');
        this.secondValue.classList.add('drop__value');
        this.secondValue.textContent = this.getRandomNumber(1, 10);
        this.operation = document.createElement('span');
        this.operation.classList.add('drop__operation');
        this.operation.textContent = this.getOperation();
        if(+this.firstValue.textContent < +this.secondValue.textContent) {
            [this.firstValue.textContent, this.secondValue.textContent] = [this.secondValue.textContent, this.firstValue.textContent];
        }
        this.dropElement.append(this.firstValue,this.secondValue,this.operation);
        

        parent.append(this.dropElement);
        this.dropElement.style.left = `${this.randomPosition(parent) - this.dropElement.offsetWidth * 2}px`;

    }

    fallDrop () {
        this.dropElement.style.top = `${this.dropElement.offsetTop + this.speedFall}px`;
    }

    destroyDrop() {
        document.querySelector('.pop').play();
        this.dropElement.remove();
        this.countLevel++;
        this.speedFall += 0.02;
    }
    getOperation() {
        return this.countLevel < 20 ? this.getRandomOperationSimple() : this.getRandomOperationNormal()
    }

    getRandomOperationSimple() {
        
        return this.operationListSimple[this.getRandomNumber(0,this.operationListSimple.length - 1)];
    }

    getRandomOperationNormal() {
        return this.operationListNormal[this.getRandomNumber(0,this.operationListNormal.length - 1)];
    }

    
    getRandomNumber(max,min) {
        return Math.round(Math.random() * (max - min) + min); 
    }

    randomPosition(parent) {
        const parentWidth = parent.getBoundingClientRect().width;
        const dropWidth  = this.dropElement.offsetWidth * 2;
        return Math.ceil(Math.random() * (parentWidth - dropWidth) + dropWidth);        
    }
    checkDrop() {
        
    }

}

export {Drop};


