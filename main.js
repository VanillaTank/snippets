//Анимация формы 
const shakeBlock = document.querySelector('.shakeBlock');
const shakeBtn = document.querySelector('.shakeBtn');
shakeBtn.addEventListener('click', () => {
    shakeBlock.className = "shakeBlock fallingBlock";
    shakeBlock.classList.remove('animForm-shake');
    shakeBlock.scrollWidth = shakeBlock.scrollWidth;
    shakeBlock.classList.add('animForm-shake');
});

const fallingBtn = document.querySelector('.fallingBtn');
const fallingBlock = document.querySelector('.fallingBlock');
fallingBtn.addEventListener('click', () => {
    fallingBlock.className = "shakeBlock fallingBlock";
    fallingBlock.classList.remove('animForm-falling');
    fallingBlock.scrollWidth = fallingBlock.scrollWidth;
    fallingBlock.classList.add('animForm-falling')
});

//Переворачивающиеся карточки(для телефонов)
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    const cards = document.querySelectorAll('.bl-1__card');
    cards.forEach(item => {
        item.addEventListener('click', (evt) => {
            let currentCard = evt.target.parentNode;
            if (evt.target.className == "bl-1__front") {
                currentCard.childNodes[1].style.transform = 'rotateY(180deg)';
                currentCard.childNodes[3].style.transform = 'rotateY(360deg)';
            } else {
                currentCard.childNodes[1].style.transform = 'rotateY(0deg)';
                currentCard.childNodes[3].style.transform = 'rotateY(180deg)';
            }
        })
    })
}

//Иммитация набора текста на JS
const text = [
    'Привет мир\n',
    'Герда - лучшая чавчарка \nна свете\n',
    'Собачки спасут мир'
];
const outText = document.querySelector('.bl-3__out-text');

function typeText(){
    let line = 0;
    let count = 0;
    let out = "";
    
    function typeLine(){
        //рисуем строку
        let interval = setTimeout(function(){
            out += text[line][count];
            outText.innerText = out + "|";
            count ++;
            // проверки
            if(count >=text[line].length){
                count = 0;
                line ++;
                if(line == text.length) {
                    clearTimeout(interval); 
                    outText.innerText = out; //убираем типа курсор
                    return true 
                }
            }
            typeLine();
        } , getRandomInt(getRandomInt(380*2.5)))
    }
    typeLine()
}

function getRandomInt(max){
    return Math.floor(Math.random()*Math.floor(max))
}
typeText()

//Перетаскивание элементов
const zone1 = document.querySelector('.zone-1');
const zone2 = document.querySelector('.zone-2');
const zone3 = document.querySelector('.zone-3');
const zone4 = document.querySelector('.zone-4');
const lamp = document.querySelector('#lamp');
const web = document.querySelector('#web');

zone1.ondragover = allowDrop;
zone2.ondragover = allowDrop;
zone3.ondragover = allowDrop;
zone4.ondragover = allowDrop;


function allowDrop(event) {
    event.preventDefault();
}

lamp.ondragstart = drag;
web.ondragstart = drag;

function drag(event) {
    event.dataTransfer.setData('id', event.target.id);
}
zone1.ondrop = drop;
zone2.ondrop = drop;
zone3.ondrop = drop;
zone4.ondrop = drop;


function drop(event) {
    let itemId = event.dataTransfer.getData('id');
    if (event.target.tagName != "IMG") {
        event.target.append(document.getElementById(itemId));
    } else {
        event.target.parentNode.append(document.getElementById(itemId));
    }
}


