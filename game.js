
var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];
var userClickedPattern=[];
var level=0;
var gameStarted=false;

$(document).keypress(function(){
    if(!gameStarted){
        level=0
      
        $("h1").text("level "+ level)
        nextSequence();
        gameStarted=true;

    }
  
})

$(".btn").click(function(){
    var clickedButton=$(this).attr("id");
    userClickedPattern.push(clickedButton);
    playSound(clickedButton);
    animatePress(clickedButton);
    var index= userClickedPattern.length-1
    checkAnswer(index);
  
    
})





function nextSequence(){
    userClickedPattern=[];
    level++
    $("h1").text("level "+ level);
var randomNumber=Math.floor(Math.random()*4);
    
var randomChosenColor=buttonColors[randomNumber];
gamePattern.push(randomChosenColor);
$("#"+randomChosenColor).fadeOut(100).fadeIn(100);
playSound(randomChosenColor);



}
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
audio.play();


}
function animatePress(currentColor){

     $("#"+currentColor).addClass("pressed");
     setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
     },100);
   
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if (gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence()
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("h1").text("Press any key to restart");
        startOver();
     
      
    }



}
function startOver(){
    level=0;
    gamePattern=[];
    gameStarted=false;
}