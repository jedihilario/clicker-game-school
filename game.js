class ShopElement {
    constructor(name, img, incrementValue, incrementTime, price) {
        this.name = name;
        this.img = img;
        this.incrementValue = incrementValue;
        this.incrementTime = incrementTime;
        this.price = price;
        
        this.intervals = [];
    }

    set increment(newValue) {
        this.incrementValue = newValue;
    }

    set time(newTime) {
        this.incrementTime = newTime;
    }

    createInterval(intervalTime, intervalValue) {
        return setInterval(() => {
            contador.innerHTML = Number(contador.innerHTML) + intervalValue;
        }, intervalTime);
    }

    createElement() {
        const container = document.createElement('DIV');
        container.classList.add('shop-element');
        container.innerHTML = `
            <img src="${this.img}">
            <div class="element__info">
                <h3>${this.name}</h3>
                <h4 id="element__price">${this.price}</h4>
            </div>
        `;
        container.addEventListener('click', () => {
            if(Number(contador.innerHTML) >= this.price) {
                this.intervals.push(this.createInterval(this.incrementTime, this.incrementValue));
                contador.innerHTML = Number(contador.innerHTML) - this.price;
                this.price = Math.floor(this.price * 1.33);
                document.getElementById('element__price').innerHTML = this.price;
            }
        });

        return container;
    }

    upgradeELement() {
        this.intervals.forEach(element => {
            clearInterval(element);
            this.intervals.push(this.createInterval(this.incrementTime, this.incrementValue));
        });
    }
}

const clicker = document.getElementById('clicker');
const contador = document.getElementById('contador');
const shopElements = document.querySelector('.shop__elements');
const shopUpgrades = document.querySelector('.shop__upgrades');

const cursor = new ShopElement('Cursor', 'img/fotito.jpg', 1, 2000, 15);

const createCursorElement = new Promise((resolve, reject) => {
    setInterval(() => {
        if(Number(contador.innerHTML) >= 15) {
            resolve();
        }
    }, 500);
});

clicker.addEventListener('click', () => {
    contador.innerHTML = Number(contador.innerHTML) + 1;
});

createCursorElement.then(() => {
    shopElements.appendChild(cursor.createElement()); 
});