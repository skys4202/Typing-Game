const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('button');
const gameOverSound = new Audio('music/gameend.mp3');
const scoreUpSound = new Audio('music/sound.mp3');


let words = [];
let checkInterval;

const GAME_TIME = 5;


let isPlaying = false;
let score = 0;
let time = GAME_TIME;
let timeInterval;

init();

function init(){
    buttonChange('게임로딩중')
    getWords();
    wordInput.addEventListener('input', checkMatch)
}

function run(){
    if(isPlaying){
        return;
    }
    isPlaying = true;
    time = GAME_TIME;
    wordInput.focus();
    scoreDisplay.innerHTML = 0;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50)
    buttonChange('게임중')
}

function checkStatus(){
    if(!isPlaying && time === 0){
        buttonChange("게임시작")
        clearInterval(checkInterval);
        gameOverSound.play();
        
    }

}

function getWords(){
    axios.get('https://random-word-api.herokuapp.com/word?number=20')
  .then(function (response) {
    response.data.forEach((word) =>{
        if(word.length < 10){
            words.push(word);
        }
        console.log(word);
        buttonChange('게임시작')
    })
    // 성공 핸들링
    console.log(response.data);
  })
  .catch(function (error) {
    // 에러 핸들링
    console.log(error);
  })
}



function checkMatch (){
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
        score++;
        if(!isPlaying){
            return;
        }
        scoreDisplay.innerText = score;
        wordInput.value ="";
        time = GAME_TIME;
        const randomeIndex = Math.floor(Math.random() * words.length); 
        wordDisplay.innerText = words[randomeIndex]

        // 정답 소리
        scoreUpSound.play();
        scoreUpSound.volume = 0.5;
    }
}





buttonChange('게임시작');


// 카운트
function countDown(){
    time > 0 ? time -- : isPlaying = false;
    if(!isPlaying){
        clearInterval(timeInterval)
    }
    timeDisplay.innerText = time;
}


function buttonChange(text){
    button.innerText = text;
    text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading');
}