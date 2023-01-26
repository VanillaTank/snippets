window.onload = () => {
    const btnToggles = document.querySelectorAll(".btn-toggle");

    btnToggles.forEach((item) => {
        item.addEventListener("click", (e) => {
            let currentBtn = e.target;
            let currentDropBody = currentBtn.parentNode.querySelector(".drop-body");
            currentDropBody.classList.toggle("open");
        });
    });
};

// -------------------------------------------------------------------------------------
//Анимация формы
const shakeBlock = document.querySelector(".shakeBlock");
const shakeBtn = document.querySelector(".shakeBtn");
shakeBtn.addEventListener("click", () => {
    shakeBlock.className = "shakeBlock fallingBlock";
    shakeBlock.classList.remove("animForm-shake");
    shakeBlock.scrollWidth = shakeBlock.scrollWidth;
    shakeBlock.classList.add("animForm-shake");
});

const fallingBtn = document.querySelector(".fallingBtn");
const fallingBlock = document.querySelector(".fallingBlock");
fallingBtn.addEventListener("click", () => {
    fallingBlock.className = "shakeBlock fallingBlock";
    fallingBlock.classList.remove("animForm-falling");
    fallingBlock.scrollWidth = fallingBlock.scrollWidth;
    fallingBlock.classList.add("animForm-falling");
});

// -------------------------------------------------------------------------------------
//Переворачивающиеся карточки(для телефонов)
if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    )
) {
    const cards = document.querySelectorAll(".bl-1__card");
    cards.forEach((item) => {
        item.addEventListener("click", (evt) => {
            let currentCard = evt.target.parentNode;
            if (evt.target.className == "bl-1__front") {
                currentCard.childNodes[1].style.transform = "rotateY(180deg)";
                currentCard.childNodes[3].style.transform = "rotateY(360deg)";
            } else {
                currentCard.childNodes[1].style.transform = "rotateY(0deg)";
                currentCard.childNodes[3].style.transform = "rotateY(180deg)";
            }
        });
    });
}

// -------------------------------------------------------------------------------------
//Иммитация набора текста на JS
const text = [
    "Привет мир\n",
    "Герда - лучшая чавчарка \nна свете\n",
    "Собачки спасут мир",
];
const outText = document.querySelector(".bl-3__out-text");

function typeText() {
    let line = 0;
    let count = 0;
    let out = "";

    function typeLine() {
        //рисуем строку
        let interval = setTimeout(function () {
            out += text[line][count];
            outText.innerText = out + "|";
            count++;
            // проверки
            if (count >= text[line].length) {
                count = 0;
                line++;
                if (line == text.length) {
                    clearTimeout(interval);
                    outText.innerText = out; //убираем типа курсор
                    return true;
                }
            }
            typeLine();
        }, getRandomInt(getRandomInt(380 * 2.5)));
    }
    typeLine();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
typeText();

// -------------------------------------------------------------------------------------
//Перетаскивание элементов
const zone1 = document.querySelector(".zone-1");
const zone2 = document.querySelector(".zone-2");
const zone3 = document.querySelector(".zone-3");
const zone4 = document.querySelector(".zone-4");
const lamp = document.querySelector("#lamp");
const web = document.querySelector("#web");

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
    event.dataTransfer.setData("id", event.target.id);
}
zone1.ondrop = drop;
zone2.ondrop = drop;
zone3.ondrop = drop;
zone4.ondrop = drop;

function drop(event) {
    let itemId = event.dataTransfer.getData("id");
    if (event.target.tagName != "IMG") {
        event.target.append(document.getElementById(itemId));
    } else {
        event.target.parentNode.append(document.getElementById(itemId));
    }
}

// -------------------------------------------------------------------------------------
//Каррирование
const out = document.querySelector(".out");

let t = (tag, classes) => (text) =>
    `<${tag} class="${classes.join(" ")}">${text}</${tag}>`;

// function t(tag, classes) {
//     return function(text) {
//         return `<${tag}>${text}</${tag}>`;
//     }
// }
let div = t("div", ["bold", "orange"]);
let elem = div("hello");
let p = t("p", []);
let elem2 = p("hello");

out.innerHTML = elem;
out.innerHTML += elem2;

// -------------------------------------------------------------------------------------
// Перетаскивание и клик на одном элементе
(function b11() {
    const divParent = document.querySelector(".bl-11__ex-wrap");
    const divTarget = document.querySelector(".bl-11__ex-inner");

    divTarget.addEventListener("mousedown", (evt) => {
        evt.preventDefault();

        let startCoords = {
            x: evt.clientX,
            y: evt.clientY,
        };

        let dragged = false;

        function onMouseMove(moveEvt) {
            moveEvt.preventDefault();
            dragged = true;
            let shift = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY,
            };

            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY,
            };

            divParent.style.left = divParent.offsetLeft - shift.x + "px";
            divParent.style.top = divParent.offsetTop - shift.y + "px";
        }

        function onMouseUp(evtUp) {
            evtUp.preventDefault();

            if (dragged) {
                let onClickPreventDefault = function (evt) {
                    evt.preventDefault();
                    divTarget.removeEventListener("click", onClickPreventDefault);
                };
                divTarget.addEventListener("click", onClickPreventDefault);
            } else {
                alert("click");
            }

            document.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mousemove", onMouseMove);
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
})();
// -------------------------------------------------------------------------------------
// Изменение текста не активной вкладки
(function b12() {
    let timer;
    let time = 1000;
    let t = "Сниппеты";
    let i = "./images/favicon.ico";
    const ICON = "./images/cow-icon.png";
    const TEXT = "😊 Куда пошел????!";

    function changeTitle(icon, text) {
        document.querySelector("head title").innerHTML = text;
        document
            .querySelector('link[rel="shortcut icon"]')
            .setAttribute("href", icon);
    }
    window.onblur = () => {
        timer = setTimeout(() => {
            changeTitle(ICON, TEXT);
        }, time);
    };
    window.onfocus = () => {
        clearTimeout(timer);
        changeTitle(i, t);
    };
})();

// -------------------------------------------------------------------------------------
//Живой поиск
(function () {
    document.querySelector(".b-13 #elastic").oninput = function () {
        let val = this.value.toLowerCase();
        let elasticItems = [...document.querySelectorAll(".b-13 .elastic-ul li")];
        if (val != "") {
            elasticItems.forEach((elem) => {
                if (elem.innerText.toLowerCase().indexOf(val) == -1) {
                    elem.classList.add("hide");
                    elem.innerHTML = elem.innerText;
                } else {
                    elem.classList.remove("hide");
                    let str = elem.innerText;
                    elem.innerHTML = insertMark(
                        str,
                        elem.innerText.toLowerCase().indexOf(val),
                        val.length
                    );
                }
            });
        } else {
            elasticItems.forEach((elem) => {
                elem.classList.remove("hide");
                elem.innerHTML = elem.innerText;
            });
        }
    };

    function insertMark(string, pos, len) {
        return (
            string.slice(0, pos) +
            "<mark>" +
            string.slice(pos, pos + len) +
            "</mark>" +
            string.slice(pos + len)
        );
    }
})();

// -------------------------------------------------------------------------------------
//Дебаунсер
(function () {
    const btn = document.querySelector("#b-14_btn");
    const backGround = document.querySelector("#b-14_back");
    const output = document.querySelector("#b-14_output");
    const arrColor = [
        "#fff",
        "#000",
        "#f2faaf",
        "#faccaf",
        "#ecaffa",
        "#faafaf",
        "#78a5ff",
    ];
    let colorIndex = 0;
    const input = document.querySelector("#b-14_btn-input");

    const onClickHandler = debounce(() => {
        backGround.style.backgroundColor = arrColor[colorIndex];
        if (colorIndex < arrColor.length - 1) colorIndex++;
        else colorIndex = 0;
    });
    btn.addEventListener("click", onClickHandler);

    const keyupHandler = debounce(() => {
        output.innerText = input.value;
    });
    input.addEventListener("keyup", keyupHandler);

    const DEBOUNCE_INTERVAL = 300;
    function debounce(fun) {
        let lastTimeout = null;

        return function () {
            const args = arguments;
            if (lastTimeout) {
                console.log(1);
                window.clearTimeout(lastTimeout);
            }
            lastTimeout = window.setTimeout(function () {
                lastTimeout = null;
                fun.apply(null, args);
            }, DEBOUNCE_INTERVAL);
        };
    }
})();
// -------------------------------------------------------------------------------------
//XMLHttpRequest
(function () {
    const output = document.querySelector(".b-15_output");

    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.timeout = 30001; //его можно не задавать, по умолчанию 30 секунд

    xhr.addEventListener("error", () => {
        onError("Ошибка соединения");
    });
    xhr.addEventListener("timeout", () => {
        onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);
    });

    xhr.addEventListener("load", () => {
        switch (xhr.status) {
            case 200:
                showData(xhr.response);
                break;
            default:
                onError(`Статус ответа: ${xhr.status}, ${xhr.statusText}`);
        }
    });

    xhr.responseType = "json";
    xhr.open("GET", "https://brianiswu-cat-facts-v1.p.rapidapi.com/facts");
    xhr.setRequestHeader(
        "x-rapidapi-key",
        "fee2f886d4mshb128b759bb2ccfcp1ccc5cjsn7e8964df0879"
    );
    xhr.setRequestHeader(
        "x-rapidapi-host",
        "brianiswu-cat-facts-v1.p.rapidapi.com"
    );

    //пишем всегда после обработчика load, так как ответ может придти раньше срабатывания обработчика
    xhr.send(data);

    //----------------------------------------------------------------------------------------------------
    function showData(newData) {
        newData.forEach((item) => {
            output.innerHTML += `<li>${item.text}</li>`;
        });
    }
    function onError(text) {
        console.error(text);
        output.innerHTML += `<li>${text}</li>`;
    }
})();

// -------------------------------------------------------------------------------------
//Клик по элементу Канваса
(function () {
    const canvas = document.getElementById("b-16_canvas");
    const ctx = canvas.getContext("2d");
    const windowHeigth = 300;
    const windowWidth = 300;

    canvas.width = windowWidth;
    canvas.height = windowHeigth;
    canvas.style.background = "#bbf";

    class Circle {
        constructor(xPoint, yPoint, radius, color) {
            this.xPoint = xPoint;
            this.yPoint = yPoint;
            this.radius = radius;
            this.color = color;
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.xPoint, this.yPoint, this.radius, 0, Math.PI * 2, false);
            ctx.strokeStyle = "grey";
            ctx.lineWidth = 1;
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }

        changeColor(newColor) {
            this.color = newColor;
            this.draw(ctx);
        }

        clickCircle(xMouse, yMouse) {
            const distance = Math.sqrt(
                (xMouse - this.xPoint) * (xMouse - this.xPoint) +
                (yMouse - this.yPoint) * (yMouse - this.yPoint)
            );

            if (distance <= this.radius) {
                this.changeColor("#56f");
                return true;
            } else {
                this.changeColor("#f56");
                return false;
            }
        }
    }

    let circle = new Circle(150, 150, 50, "#f56");
    circle.draw(ctx);

    canvas.addEventListener("click", (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        circle.clickCircle(x, y);
    });
})();

// -------------------------------------------------------------------------------------
//Масштабирование фото (input[type="range"])
const photo_b21 = document.querySelector('#b-21_photo');
function resize_photo() {
    const delta = document.querySelector('#b-21_scale').value;
    photo_b21.width = 20 * delta;
};

// -------------------------------------------------------------------------------------
//Анимация наведения и клика
(function () {
    const btn = document.querySelector('#b-22-btn');

    btn.addEventListener('click', onBtnClick);

    function onBtnClick(evt) {
        const rect = this.getBoundingClientRect();

        if (!(rect.x >= rect.left && rect.x <= rect.left + rect.width)
            && !(rect.y >= rect.top && rect.y <= rect.top + rect.height)) { return }

        const div = document.createElement('div');
        div.classList.add('pulse');
        const maxValue = Math.max(this.clientWidth, this.clientHeight)

        const styledDiv = div.style;
        const px = 'px';

        styledDiv.width = styledDiv.height = maxValue + px;
        styledDiv.left = evt.clientX - rect.left - (maxValue / 2) + px;
        styledDiv.top = evt.clientY - rect.top - (maxValue / 2) + px;

        this.appendChild(div);

        div.addEventListener('animationend', removeDiv);
    }

    function removeDiv() { this.remove() }

})();

// -------------------------------------------------------------------------------------
// Анимация дождя 2
(function () {
    let quantity = 240;
    let body = document.querySelector('.b-24 .example');
    let index = 0;

    while (index < quantity) {
        let drop = document.createElement('index');
        let size = Math.random() * 5;
        let positionX = Math.floor(Math.random() * body.clientWidth);
        let delay = Math.random() * 20;
        let duration = Math.random() * 5;

        drop.style.width = 0.3 + size + 'px';
        drop.style.left = positionX + 'px';
        drop.style.animationDelay = delay + 's';
        drop.style.animationDuration = 7 + duration + 's';

        body.appendChild(drop)
        index++;
    }
})();

// -------------------------------------------------------------------------------------
//Корреляция (фи-коэффицент)
(function () {

    document.querySelector('#b-25-textarea').value = `{ events: ["lasagna", "peanuts", "work"] },
{ events: ["pizza", "peanuts", "work"] },
{ events: ["potatoes", "exercise", "peanuts", "work"] },
{ events: ["brushed teeth","peanuts", "exercise", "work"] },
{ events: ["spaghetti", "brushed teeth","peanuts", "television", "work"] },
{ events: ["pizza", "cycling", "weekend"] },
{ events: ["carrot", "brushed teeth", "weekend"]  },
{ events: ["carrot", "beer", "peanuts", "brushed teeth", "work"] },
{ events: ["pizza", "peanuts", "candy", "work"] },
{ events: ["carrot", "peanuts", "brushed teeth", "reading", "work"] },
{ events: ["lasagna", "peanuts", "work"] },
{ events: ["pizza", "peanuts", "work"] },
{ events: ["potatoes", "exercise", "peanuts", "work"] },
{ events: ["brushed teeth","peanuts", "exercise", "work"] },
{ events: ["spaghetti", "brushed teeth","peanuts", "television", "work"] },
{ events: ["pizza", "cycling", "weekend"] },
{ events: ["carrot", "brushed teeth", "weekend"]  },
{ events: ["carrot", "beer", "peanuts", "brushed teeth", "work"] },
{ events: ["pizza", "peanuts", "candy", "work"] },
{ events: ["carrot", "peanuts", "brushed teeth", "reading", "work"] }`

    let JOURNAL = []
    const btn = document.querySelector('.btn-phi');
    const output = document.querySelector('.output');
    let mainEvent = '';

    btn.addEventListener('click', () => {

        let data = '[' + document.querySelector('#b-25-textarea')
            .value
            .replaceAll('events', '"events"') + ']';

        mainEvent = document.querySelector('#mainEvent').value;

        if (!mainEvent) {
            alert('Укажите искомое событие!')
            return
        }

        JOURNAL = JSON.parse(data);
        if (!JOURNAL.length || JOURNAL.length <= 0) {
            alert('Заполните данные!')
            return
        }


        output.innerHTML = '<ul>'

        // Считает все корреляции и отсеивает близкие к нулю
        let arr = [];
        for (let event of journalEvents(JOURNAL)) {
            let correlation = phi(tableFor(event, JOURNAL));
            arr.push({ event, correlation })
        }

        console.log(arr);

        arr.sort((a, b) => {
            if (a.correlation > b.correlation) {
                return -1;
            }
            if (a.correlation < b.correlation) {
                return 1;
            }
            return 0;
        })

        for (let entry of arr) {
            output.innerHTML += `<li>${entry.event}: ${entry.correlation.toFixed(2)}</li>`
        }

        output.innerHTML += '</ul>'

    });



    function phi([n00, n01, n10, n11]) {
        return (n11 * n00 - n10 * n01) /
            Math.sqrt((n10 + n11) * (n00 + n01) * (n01 + n11) * (n00 + n10));

    }

    //Считает количество одноименных событий в журнале
    function tableFor(event, journal) {
        let table = [0, 0, 0, 0];
        for (let i = 0; i < journal.length; i++) {
            let entry = journal[i], index = 0;
            if (entry.events.includes(event)) index += 1;
            if (entry.events.includes(mainEvent)) index += 2;
            table[index] += 1;
        }
        return table;
    }


    //Ищем все типы событий, чтобы потом найти все корреляции. 
    function journalEvents(journal) {
        let events = [];
        for (let entry of journal) {
            for (let event of entry.events) {
                if (!events.includes(event) && event !== mainEvent) {
                    events.push(event);
                }
            }
        }
        return events;
    }

})();

// Выпадающий список
(function () {
    document.querySelector('.b-27 .title_block').addEventListener('click', () => {
        document.querySelector('.b-27 .content').classList.toggle('show');
    })
})();

// Color picker
(function () {
    const canvas = document.querySelector('#canvas-b-28');
    const result = document.querySelector('.b-28 .result');

    const w = 234;
    const h = 199;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.src = './images/palitra.png';
    image.onload = function () {
        ctx.drawImage(image, 0, 0, image.width, image.height);
    }

    canvas.onclick = function (e) {
        const x = e.offsetX;
        const y = e.offsetY;
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const pixelColor = "rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")";
        result.style.backgroundColor = pixelColor;
    }
})();