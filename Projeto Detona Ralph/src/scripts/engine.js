const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        time: document.querySelector("#timer"),
        meScore: document.querySelector("#score"),
        life: document.querySelector(".vida"),
        botaoReset: document.querySelector("#reset")
    },
    values:{
        gameSpeed: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 30,
        currentLife: 5
     },
     actions:{
        timerID: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
     }
};

function countDown(){
    state.values.currentTime--;
    state.view.time.textContent = state.values.currentTime;

    if(state.values.currentTime < 0 || state.values.currentLife < 1){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerID);
        clearInterval(state.values.currentLife);
        playSound("Game Over");
        alert("Game Over! Total Score: " + state.values.result);
    }
}

function playSound(sfxName){
    let audio = new Audio(`./src/audios/${sfxName}.wav`);
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.meScore.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("Point");
            }else{
                state.values.currentLife--;
                state.view.life.textContent = state.values.currentLife;
                playSound("Miss");
            }
        })
    })
}

/*state.view.botaoReset.addEventListener("click", function(){
    
})*/

function initialize(){
    addListenerHitBox();
}

initialize();