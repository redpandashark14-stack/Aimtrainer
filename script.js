const target = document.getElementById("target");

const scoreText = document.getElementById("score");
const hitText = document.getElementById("hits");
const missText = document.getElementById("misses");
const accuracyText = document.getElementById("accuracy");
const timerText = document.getElementById("timer");

const startBtn = document.getElementById("startBtn");

let score = 0;
let hits = 0;
let misses = 0;

let time = 30;

let playing = false;

function spawnTarget(){

    let x = Math.random()*(window.innerWidth-100);

    let y = Math.random()*(window.innerHeight-100);

    target.style.left = x+"px";
    target.style.top = y+"px";

}

function updateStats(){

    scoreText.innerHTML = score;

    hitText.innerHTML = hits;

    missText.innerHTML = misses;

    let accuracy = hits+misses==0?100:Math.round(hits/(hits+misses)*100);

    accuracyText.innerHTML = accuracy+"%";

}

startBtn.onclick=function(){

    if(playing) return;

    playing=true;

    score=0;
    hits=0;
    misses=0;
    time=30;

    updateStats();

    timerText.innerHTML=time;

    target.style.display="block";

    spawnTarget();

    let timer=setInterval(()=>{

        time--;

        timerText.innerHTML=time;

        if(time<=0){

            clearInterval(timer);

            target.style.display="none";

            playing=false;

            alert(
                "Finished!\n\n"+
                "Score: "+score+
                "\nHits: "+hits+
                "\nMisses: "+misses
            );

        }

    },1000);

}

target.onclick=function(e){

    e.stopPropagation();

    if(!playing)return;

    score+=100;

    hits++;

    updateStats();

    spawnTarget();

}

document.body.onclick=function(){

    if(!playing)return;

    score-=50;

    misses++;

    updateStats();

}

document.addEventListener("mousemove",e=>{

    let c=document.getElementById("crosshair");

    c.style.left=e.clientX+"px";

    c.style.top=e.clientY+"px";

});
