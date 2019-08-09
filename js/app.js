/*----- constants -----*/

   
  /*----- app's state (variables) -----*/
let ember,
    roshan, 
    action, 
    
    
    ////////ember damage stuff
    emberBaseAttackDamage, 
    totalDamageDoneOnRoshan, 
    percentageDamageOnRoshan,


    ////////roshan damage stuff
    roshanBaseAttackDamage,
    totalDamageDoneOnEmber,
    percentageDamageonEmber;


    ////
    emberBaseAttackDamage;
    roshanBaseAttackDamage;
    battleScoreEmber = 0;
    battleScoreRoshan = 0;
    ember = {
        health: 5000,
        physDamage: attackPhysicalEmber,
        magicDamage: attackMagicalEmber
    }
    
    roshan = {
        health: 10000,
        physDamage: attackPhysicalRoshan,
        magicDamage: attackMagicalRoshan,
       
    }
    
    action = 0; 
    totalDamageDoneOnRoshan = 0;
    percentageDamageOnRoshan = ((totalDamageDoneOnRoshan/roshan.health) * 100).toFixed(2);

    totalDamageDoneOnEmber = 0;
    percentageDamageEmber = ((totalDamageDoneOnEmber/ember.health) * 100).toFixed(2);
    
/*----- cached element references -----*/
let damageDone = document.querySelector('.damage-done');
let physicalAttackButton = document.querySelector('.attack-physical');
let magicalAttackButton = document.querySelector('.attack-magical');
let startGame = document.querySelector('.start-game');
let roshanBattleScore = document.querySelector('.roshan-score-counter');
let emberBattleScore = document.querySelector('.ember-score-counter');
let playAgain = document.querySelector('.play-again');


/*----- event listeners -----*/
physicalAttackButton.addEventListener('click', ember.physDamage);
physicalAttackButton.addEventListener('click', activateFireball);

magicalAttackButton.addEventListener('click', ember.magicDamage);

startGame.addEventListener('click', roshanClaim);
startGame.addEventListener('click', hideStartGame);

playAgain.addEventListener('click',firstBlood)
playAgain.addEventListener('click',hidePlayAgain);

    /*----- functions -----*/
///initialize state variables
function init(){
    let initTurnDisplayer = document.querySelector('.turn-displayer');
    initTurnDisplayer.innerHTML = 'Awaiting Orders'; 
    
 

    ember = {
        health: 5000  
    }
    
    roshan = {
        health: 10000
    }
    action =0;
    //when user fnishes attack add 1 to action counter;

    
    
    emberBaseAttackDamage = 1000;
    roshanBaseAttackDamage = 400;
    
    totalDamageDoneOnRoshan = 0;
    percentageDamageOnRoshan = ((totalDamageDoneOnRoshan/roshan.health) * 100).toFixed(2);
    
    totalDamageDoneOnEmber = 0;
    percentageDamageEmber = ((totalDamageDoneOnEmber/ember.health) * 100).toFixed(2);
    document.getElementById('body').style.visibility = 'hidden';
    
    document.querySelector('.attack-magical').disabled = true;
    document.querySelector('.attack-physical').disabled = true;
   
}
////initializes the page
init();

function attackPhysicalEmber(){
    // how much damage does Ember's physical attack button do 
    playCeeb();
    activateFireball();
    //update Roshan health stats pull data from there
    let attack = emberBaseAttackDamage;
    totalDamageDoneOnRoshan += attack;
    roshan.health -= attack;

    document.querySelector('.damage-done').innerHTML = `Physical damage done this turn: ${attack}`;
    document.querySelector('.percentage-health-this-attack-on-roshan').innerHTML = `Percent of health damaged: ${(attack/(roshan.health + attack) * 100).toFixed(2)}%`;
    document.querySelector('.percentage-health-total').innerHTML = `Percentage of health roshan has left: ${Math.abs((totalDamageDoneOnRoshan - 10000))/100}%`;
    document.querySelector('.total-damage-done').innerHTML = `Total damage done: ${totalDamageDoneOnRoshan}`;
    document.querySelector('.ember-health').innerHTML = `${ember.health}`;
    document.querySelector('.roshan-health').innerHTML = `${roshan.health.toFixed(2)}`;
    document.getElementById('roshan-health-meter').value = `${roshan.health - attack}`;

    setTimeout(function(){
        document.querySelector('p.turn-displayer').innerHTML = (`${attack} physical damage`);
    },2000);
    
    checkWinner();
    
    if(action === 0){
        action += 1;
        setTimeout(function(){
        document.querySelector('p.turn-displayer').innerHTML = `Awaiting Ember's Turn`;
    },3500);
    }else if(action === 1){
        action +=2;
        setTimeout(function(){
            document.querySelector('p.turn-displayer').innerHTML = `Roshan is Attacking`;
        },5000);
    }

    console.log(action);
    checkAction();
    healthRegen();
    
    roshansTurn();
    }
   
function attackMagicalEmber(){

    playMagic();
    activateLightning();
    let attack =  Math.floor(Math.random() * 2000);
    totalDamageDoneOnRoshan += attack;
    roshan.health -= attack;
    document.querySelector('.damage-done').innerHTML = totalDamageDoneOnRoshan;
    
    document.querySelector('.damage-done').innerHTML = `Magic damage done this turn: ${attack}`;
    document.querySelector('.percentage-health-this-attack-on-roshan').innerHTML = `Percent of health damaged: ${(attack/(roshan.health + attack) * 100).toFixed(2)}%`;
    document.querySelector('.percentage-health-total').innerHTML = `Percentage of health roshan has left: ${Math.abs((totalDamageDoneOnRoshan - 10000))/100}%`;
    document.querySelector('.damage-done').innerHTML = `Magic damage done this turn: ${totalDamageDoneOnRoshan}`;
    document.querySelector('.ember-health').innerHTML = `${ember.health}`;
    document.querySelector('.roshan-health').innerHTML = `${roshan.health.toFixed(2)}`;
    document.querySelector('.total-damage-done').innerHTML = `Total damage done: ${totalDamageDoneOnRoshan}`;
    document.getElementById('roshan-health-meter').value = `${roshan.health - attack}`
    setTimeout(function(){
        document.querySelector('p.turn-displayer').innerHTML = (`${attack} magic damage`);
    }, 2000);
    
    checkWinner();
    if(action === 0){
        action += 1;
        setTimeout(function(){
            document.querySelector('p.turn-displayer').innerHTML = `Awaiting Ember's Turn`;
        },3000);
    }else if(action === 1){
        action +=2;
        setTimeout(function(){
            document.querySelector('p.turn-displayer').innerHTML = `Roshan is Attacking`;
        },5000);
    }
    checkAction();
    healthRegen();

    roshansTurn();
    
}
function attackPhysicalRoshan(){
    // how much damage does this attack do 
    let attack = roshanBaseAttackDamage;
    totalDamageDoneOnEmber += attack;
    document.querySelector('.total-damage-done').innerHTML = totalDamageDoneOnEmber;
    ember.health -= attack;
    document.querySelector('.damage-done').innerHTML = `Physical damage done this turn: ${attack}`;
    document.querySelector('.percentage-health-this-attack-on-ember').innerHTML = `Percent of health damaged: ${(attack/(ember.health + attack) * 100).toFixed(2)}%`;
    document.querySelector('.percentage-health-total').innerHTML = `Percentage of health ember has left: ${Math.abs((totalDamageDoneOnEmber - 10000))/100}%`;
    document.querySelector('.ember-health').innerHTML = `${ember.health}`;
    document.querySelector('.roshan-health').innerHTML = `${roshan.health}`;
    document.getElementById('ember-health-meter').value = `${ember.health - attack}`;

    setTimeout(function(){
        document.querySelector('.attack-magical').disabled = false;
    }, 8000)
    setTimeout(function(){
        document.querySelector('.attack-physical').disabled = false;
    }, 8000)
    checkWinner();
    if(action === 3){
        action +=1;
    }else if (action === 4){
        action =0;
    }
    checkAction();
    healthRegen();
}



function attackMagicalRoshan(){
    let attack =  Math.floor(Math.random() * 1000);
    totalDamageDoneOnEmber += attack;
    document.querySelector('.damage-done').innerHTML = totalDamageDoneOnEmber;
    ember.health -= attack;
   
    document.querySelector('.damage-done').innerHTML = `Magic damage done this turn: ${attack}`;
    document.querySelector('.percentage-health-this-attack-on-ember').innerHTML = `Percent of health damaged: ${(attack/(roshan.health + attack) * 100).toFixed(2)}%`;
    document.querySelector('.percentage-health-total').innerHTML = `Percentage of health ember has left: ${Math.abs((totalDamageDoneOnEmber - 10000))/100}%`;
    document.querySelector('.ember-health').innerHTML = `${ember.health}`;
    document.querySelector('.roshan-health').innerHTML = `${roshan.health}`;
    document.getElementById('ember-health-meter').value = `${ember.health - attack}`;

    
    setTimeout(function(){
        document.querySelector('p.turn-displayer').innerHTML = (`Roshan did ${attack + roshanBaseAttackDamage} damage this turn`);
    },8000);
    setTimeout(function(){
        document.querySelector('.attack-magical').disabled = false;
    }, 8000)
    setTimeout(function(){
        document.querySelector('.attack-physical').disabled = false;
    }, 8000)
    checkWinner();
    if(action === 3){
        action +=1;
    }else if (action === 4){
        action =0;
    }
    checkAction();
    healthRegen();
    
}



function checkWinner(){
    
    if(ember.health <= 0 && roshan.health > 0){
        playTrombone();
        playTeammates();
        roshanBattleScore.innerHTML = `${battleScoreRoshan += 1}`;
        resetBoard();
        document.getElementById('body').style.visibility = 'hidden';
        document.querySelector('.play-again').style.visibility = 'visible';
        document.getElementById('fight-recap').style.visibility = 'hidden';
        document.querySelector('p.turn-displayer').innerHTML ='ROSHAN WINS YOU LOSE!';
        
    }
    
    else if(roshan.health <= 0 && ember.health > 0){
        playCheer();
        playBelieve();
        emberBattleScore.innerHTML = `${battleScoreEmber += 1}`;
        document.getElementById('body').style.visibility = 'hidden';
        document.querySelector('.play-again').style.visibility = 'visible';
        document.getElementById('fight-recap').style.visibility = 'hidden';
        resetBoard();
        document.querySelector('p.turn-displayer').innerHTML = 'VICTORY! YOU WIN'; 
    }
    
}


function healthRegen(){

    if(action === 1){
        ember.health *= 1.03;
    }else if(action ===3){
        roshan.health *= 1.04;        
    }
}

function checkAction(){
    if(action ===0 && ember.health >0 && roshan.health>0){
        setTimeout(function(){
            document.querySelector('.turn-displayer').innerHTML =`AWAITING EMBER'S TURN`;
        },10000);
    }
    else if(action === 1 && action <=2 && ember.health>0 && roshan.health>0){
        document.querySelector('.turn-displayer').innerHTML = `Ember is attacking`;
    }else if(action >2){
        document.querySelector('button.attack-physical').disabled = true;
        document.querySelector('button.attack-magical').disabled = true;
    }
    else if (action >=3 && action <=4 && ember.health>0 && roshan.health>0){
        setTimeout(function(){
            document.querySelector('p.turn-displayer').innerHTML = 'Roshan is attacking';
        }, 2000);
        document.querySelector('button.attack-physical').disabled = true;
        document.querySelector('button.attack-magical').disabled = true;
    }
   
}

function activateFireball(){
    let fireball = document.getElementById('fireball');
    fireball.style.animationPlayState = "running";  
    setTimeout(function() {
        fireball.style.animationPlayState = "paused";  
    }, 3000);
}
function activateLightning(){
    let lightning= document.getElementById('lightning');
    lightning.style.animationPlayState = "running";  
    setTimeout(function() {
        lightning.style.animationPlayState = "paused";  
    }, 3000);
}

function roshansTurn(){
    if(action >= 2 && action < 4){
        setTimeout(function() {
            attackPhysicalRoshan();
        }, 4000);
        setTimeout(function() {
            attackMagicalRoshan();
        }, 4000);    
    }
}

////sound functions
function playCeeb(){
    var audio = new Audio("sounds/ceeb.mp3");
    audio.play();
}
function playCheer(){
    var audio = new Audio("sounds/cheer.mp3");
    audio.play();
}
function playTeammates(){
    var audio = new Audio("sounds/teammates.mp3");
    audio.play();
}
function playTrombone(){
    var audio = new Audio("sounds/trombone.mp3");
    audio.play();
}
function playMagic(){
    var audio = new Audio("sounds/magic.mp3");
    audio.play();
}
function playBelieve(){
    var audio = new Audio("sounds/believe.mp3");
    audio.play();
}
function roshanClaim(){
    var audio = new Audio("sounds/roshanClaim.mp3");
    audio.play();
}
function firstBlood(){
    var audio = new Audio("sounds/firstblood.mp3");
    audio.play();
}
function hideStartGame(){
    this.style.visibility = 'hidden';
  
    document.getElementById('body').style.visibility = 'visible';
    setTimeout(function(){
        document.querySelector('.attack-magical').disabled = false;
        document.querySelector('.attack-physical').disabled = false;
    }, 5000);
}
function resetBoard(){
    ember.health = 5000;
    roshan.health =10000;
    
  
    emberBaseAttackDamage = 1000;
    roshanBaseAttackDamage = 400;
     
    document.querySelector('.damage-done').innerHTML = totalDamageDoneOnRoshan;
    
  
    document.querySelector('.percentage-health-this-attack-on-roshan').innerHTML = '';
    document.querySelector('.percentage-health-total').innerHTML = '';
   
    document.querySelector('.ember-health').innerHTML = 5000;
    document.querySelector('.roshan-health').innerHTML = 10000;
    document.querySelector('.total-damage-done').innerHTML = 0;
    document.getElementById('roshan-health-meter').value = 10000;
    
    document.querySelector('.total-damage-done').innerHTML = '';
    document.querySelector('.damage-done').innerHTML = '';
    document.querySelector('.percentage-health-this-attack-on-ember').innerHTML = '';
    document.querySelector('.percentage-health-total').innerHTML ='';
    document.getElementById('ember-health-meter').value = 5000;

  
    ////////roshan damage stuff
   
    
    document.querySelector('.attack-magical').disabled = true;
    document.querySelector('.attack-physical').disabled = true;

}

function hidePlayAgain(){
    this.style.visibility = 'hidden';
    document.getElementById('body').style.visibility = 'visible';
    setTimeout(function(){
        document.querySelector('.attack-magical').disabled = false;
        document.querySelector('.attack-physical').disabled = false;
    }, 5000);
    document.querySelector('p.turn-displayer').innerHTML = `Awaiting Ember's Turn`;
}


