    //Анимация формы 
    const shakeBlock = document.querySelector('.shakeBlock');
    const shakeBtn = document.querySelector('.shakeBtn');
    shakeBtn.addEventListener('click', ()=>{
        shakeBlock.className = "shakeBlock fallingBlock";
        shakeBlock.classList.remove('animForm-shake');
        shakeBlock.scrollWidth = shakeBlock.scrollWidth;
        shakeBlock.classList.add('animForm-shake');
    });

    const fallingBtn = document.querySelector('.fallingBtn');
    const fallingBlock = document.querySelector('.fallingBlock');
    fallingBtn.addEventListener('click', ()=>{
        fallingBlock.className = "shakeBlock fallingBlock";
        fallingBlock.classList.remove('animForm-falling');
        fallingBlock.scrollWidth = fallingBlock.scrollWidth;
        fallingBlock.classList.add('animForm-falling')
    });

    //Переворачивающиеся карточки(для телефонов)
    const cards = document.querySelectorAll('.bl-1__card');
    cards.forEach(item =>{
        item.addEventListener('touchstart', (evt) =>{
            let currentCard = evt.target.parentNode;
            if(evt.target.className == "bl-1__front") {
                currentCard.childNodes[1].style.transform = 'rotateY(180deg)';
                currentCard.childNodes[3].style.transform = 'rotateY(360deg)';
            }else {
                currentCard.childNodes[1].style.transform = 'rotateY(0deg)';
                currentCard.childNodes[3].style.transform = 'rotateY(180deg)';
            }
        })
    })

