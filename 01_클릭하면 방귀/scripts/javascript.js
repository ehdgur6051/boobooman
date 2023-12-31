//setting
var clicks = 0;
var startCount = 0;
var countDisplayed = false; // 카운트 다운 시작됐는지 확인용
var countdownComplete = false; // 남은시간 0 됐을 때 확인용

//exp 설정 : n번 누르면 레벨 업
var Lv1 = 5
var Lv2 = 10
var Lv3 = 20
var Lv4 = 30
var Lv5 = 40
var Lv6 = 50
var lastLv = 999
var Lvs = [Lv1, Lv2, Lv3, Lv4, Lv5, Lv6, lastLv]
var curLv = 0
var curExp = Lvs[curLv] ;

//캐릭터 이미지 어레이 : 01 은 기본 이미지 02는 방귀 뀌는 포즈
var CH_01 = ["images/CH_A_01.gif", "images/CH_B_01.gif", "images/CH_C_01.gif", "images/CH_D_01.gif", "images/CH_E_01.gif", "images/CH_F_01.gif", "images/CH_G_01.gif"];
var CH_02 = ["images/CH_A_02.gif", "images/CH_B_02.gif", "images/CH_C_02.gif", "images/CH_D_02.gif", "images/CH_E_02.gif", "images/CH_F_02.gif", "images/CH_G_02.gif"];


//방귀 이펙트 어레이
var fartA_Imgs = ["images/FX_fart_empty.png", "images/FX_fartA_01.gif", "images/FX_fartA_02.gif", "images/FX_fartA_03.gif", "images/FX_fartA_04.gif", "images/FX_fart_empty.png"];
var fartB_Imgs = ["images/FX_fart_empty.png", "images/FX_fartB_01.gif", "images/FX_fartB_02.gif", "images/FX_fartB_03.gif", "images/FX_fartB_04.gif", "images/FX_fart_empty.png"];
var fartC_Imgs = ["images/FX_fart_empty.png", "images/FX_fartC_01.gif", "images/FX_fartC_02.gif", "images/FX_fartC_03.gif", "images/FX_fartC_04.gif", "images/FX_fart_empty.png"];
var fartD_Imgs = ["images/FX_fart_empty.png", "images/FX_fartD_01.gif", "images/FX_fartD_02.gif", "images/FX_fartD_03.gif", "images/FX_fartD_04.gif", "images/FX_fart_empty.png"];
var fartE_Imgs = ["images/FX_fart_empty.png", "images/FX_fartE_01.gif", "images/FX_fartE_02.gif", "images/FX_fartE_03.gif", "images/FX_fartE_04.gif", "images/FX_fart_empty.png"];

//변신 이펙트 어레이
var transformFx_imgs = ["images/FX_A_01.gif", "images/FX_A_02.gif", "images/FX_A_03.gif", "images/FX_A_04.gif", "images/FX_A_05.gif"]

//넥스트 레벨 이미지 
var nextLevel_Imgs = ["images/next_level_02.gif", "images/next_level_03.gif", "images/next_level_04.gif", "images/next_level_05.gif", "images/next_level_06.gif", "images/next_level_07.gif", "images/last_level.gif"]

//배경음악 경로 어레이, 사이 텀
var bgmPath = ["sounds/bgm01.mp3", "sounds/bgm02.mp3", "sounds/bgm03.mp3"]
var curMusicIdx = 0 ; 
var audioElement = document.createElement("audio");



//기본 세팅
$(function(){
    document.getElementById("exp").innerHTML = curExp ; // exp 표시
    document.getElementById('Character').src = CH_01[curLv]; // 캐릭터 이미지 표시
    document.getElementById('countDown').innerHTML = 30 ; // 남은시간 설정
    document.body.appendChild(audioElement);
}) ;




function fart(){
    //방귀 사운드 재생
    var fartA_sfx = new Audio();
    fartA_sfx.src = "sounds/fart01_sfx.mp3";
    fartA_sfx.play();

    //방귀 이펙트 재생
    var fartA_fx = document.getElementById('fart');
    for (var i = 0; i < fartA_Imgs.length; i++) {
        setTimeout(function(i) {
            fartA_fx.src = fartA_Imgs[i];
        }, i * 100, i);
    }

    //캐릭터 이미지 0.3초 동안 바뀜(방귀뀌는 포즈)
        document.getElementById('Character').src = CH_02[curLv];
        setTimeout(function(){ 
            document.getElementById('Character').src = CH_01[curLv] // 다시 원래 이미지로
        }, 300);
    
    if (!countdownComplete) { //남은시간 아직 있을 때
        clicks += 1;
        document.getElementById("score").innerHTML = clicks;

        //남은 exp 디스플레이 
        curExp -= 1;
        document.getElementById("exp").innerHTML = curExp

        //exp 0되면 레벨 업 : exp 수치 변경, 캐릭터 변경, 방귀 이펙트 변경
        if (curExp === 0) {
            curLv++ ;
            console.log("level up") ;
            curExp = Lvs[curLv]
            document.getElementById("next_level").src = nextLevel_Imgs[curLv] ;
            document.getElementById("exp").innerHTML = curExp ; //다음 레벨 exp 로 변경
            
            //변신 fx 재생
            document.getElementById('transform_fx').style.display = 'block'
            var transformFx = document.getElementById('transform_fx');
            for (var i = 0; i < transformFx_imgs.length; i++) {
                setTimeout(function(i) {
                    transformFx.src = transformFx_imgs[i];
                    if (i === transformFx_imgs.length-1) { // 변신 이펙트 재생된 뒤 이미지 사라지게 설정
                        document.getElementById('transform_fx').style.display = 'none'    
                    }
                }, i * 100, i);
            }
            if(curLv === 6){
                console.log("last leve")
                document.getElementById('exp').style.display = "none"
            }
            
            // 변신 sfx 재생
            var transform_sfx = new Audio();
            transform_sfx.src = "sounds/transform_sfx.mp3";
            transform_sfx.play();

            

        }

    }

    // 클릭 시작하면 남은시간 카운트 다운되기 시작. 
    var startCount = 1;
    if (startCount === 1 &&!countDisplayed) { //처음 한번 누르면 카운트 다운 시작 됨. 
        console.log("countdown starts")
        var curTime = document.getElementById("countDown").innerHTML;

        const intervalId = setInterval(() => {
            curTime = curTime-1;
            document.getElementById("countDown").innerHTML = curTime ;
            if (curTime === 0){ // 남은 시간 0되면 멈춤
                clearInterval(intervalId); // 카운트 다운 멈춤
                document.getElementById('Character').onclick = null ;
                setTimeout(function(){ 
                    document.getElementById('Character').src = "images/gameOver.gif"
                    document.getElementById('myScore').style.display = 'block';
                    document.getElementById('restart').style.display = 'block';
                    document.getElementById('next_level').style.display = 'none';
                    document.getElementById('exp').style.display = 'none' ;
                    document.getElementById('finScore').innerHTML = clicks ;
                }, 300);              
                console.log("time's up") ;
                countdownComplete = true; 
            }
        }, 1000);
        
        //배경음악 재생
        function playBgm() {
            audioElement.pause();
            audioElement.src = bgmPath[curMusicIdx];
            audioElement.play();
            audioElement.volume = 0.1 ; 
            console.log("music start")
        }
        playBgm() ;

        audioElement.addEventListener("ended", function() {
            console.log("music is ended")
            curMusicIdx++;
            if (curMusicIdx >= bgmPath.length) {
                console.log("the last music of the list is ended")
                curMusicIdx = 0;
            }
            playBgm();
        });

        //'빠르게 클릭!!' 사라지게
        document.getElementById('clickHere').style.display = "none"


        countDisplayed = true;
    }

}

function reset(){
    console.log("reset") ;
    audioElement.pause();
    clicks = 0;
    startCount = 0;
    countDisplayed = false; 
    countdownComplete = false; 
    oneSec = 10
    curLv = 0
    curExp = Lvs[curLv] ;
    document.getElementById("next_level").src = nextLevel_Imgs[curLv] ;
    document.getElementById("score").innerHTML = clicks; 
    document.getElementById("exp").innerHTML = curExp ; 
    document.getElementById('Character').src = CH_01[curLv];
    document.getElementById('countDown').innerHTML = 30 ; //남은시간
    document.getElementById('Character').onclick = function(){
        fart() ;
    } ;
    document.getElementById('myScore').style.display = 'none';
    document.getElementById('restart').style.display = 'none';
    document.getElementById('next_level').style.display = 'block';
    document.getElementById('exp').style.display = 'block' ;
    document.getElementById('clickHere').style.display = 'block'
}

$(function(){
    document.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            if(document.getElementById('Character').onclick!==null) {
                fart() ;
            }
        } 
    }) ;
});


function test(){
    console.log(curLv)
}
