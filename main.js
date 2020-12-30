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

