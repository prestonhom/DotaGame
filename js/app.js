/*----- constants -----*/

    // const CHARACTER = {
    //     'p': 'ember',
    //     'c': 'roshan'
    // }
        // }
        
     /*----- app's state (variables) -----*/
let ember,
    roshan, 
    action, 
    turn, 
    round, 
    battles, 
    winner, 
    ////////ember damage stuff
    emberBaseAttackDamage, 
    emberBaseMagicalDamage,
    totalDamageDoneOnRoshan, 
    percentangeDamageOnRoshan,


    ////////roshan damage stuff
    roshanBaseAttackDamage,
    roshanBaseMagicalDamge,
    totalDamageDoneOnEmber,
    percentangeDamageonEmber;


    ////
    emberBaseAttackDamage = 800;
    roshanBaseAttackDamage = 400;
    round = 0;
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
        // physDamage: function(){
        //     ember.health -= 400;
        // },
        // healthRegen: function(){
        //     this.health *= 1.03;
        // },
        // magicDamage: Math.floor(Math.random() * 801)
    }
    
    action = 0; 
    console.log(action);
    totalDamageDoneOnRoshan = 0;
    percentangeDamageOnRoshan = ((totalDamageDoneOnRoshan/roshan.health) * 100).toFixed(2);

    totalDamageDoneOnEmber = 0;
    percentangeDamageEmber = ((totalDamageDoneOnEmber/ember.health) * 100).toFixed(2);
    
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
// physicalAttackButton.addEventListener('click', activateFireball);

magicalAttackButton.addEventListener('click', ember.magicDamage);

startGame.addEventListener('click', roshanClaim);
startGame.addEventListener('click', hideStartGame);

playAgain.addEventListener('click',firstBlood)
playAgain.addEventListener('click',hidePlayAgain);









// let armor = document.getElementById('armor');
// armor.addEventListener('click', function(){

    
    // let rollDice = document.getElementById('roll');
    // rollDice.addEventListener('click', roll);
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
    round = 0;
    turn = 0;
    round = 0;
    winner = null;
    
    
    emberBaseAttackDamage = 1000;
    roshanBaseAttackDamage = 400;
    
    totalDamageDoneOnRoshan = 0;
    percentangeDamageOnRoshan = ((totalDamageDoneOnRoshan/roshan.health) * 100).toFixed(2);
    
    totalDamageDoneOnEmber = 0;
    percentangeDamageEmber = ((totalDamageDoneOnEmber/ember.health) * 100).toFixed(2);
    document.getElementById('body').style.visibility = 'hidden';
   
    // document.getElementById('fireball').style.visibility = "hidden";
    // document.getElementById('fireball').style.animationPlayState = "paused";
    document.querySelector('.attack-magical').disabled = true;
    document.querySelector('.attack-physical').disabled = true;
   
    

}
////initializes the page
init();




function attackPhysicalEmber(){
    // how much damage does Ember's physical attack button do 
    // document.querySelector('.attack-magical').disabled = true;
    playCeeb();
    activateFireball();
    //update Roshan health stats pull data from there
    let attack = emberBaseAttackDamage;
    totalDamageDoneOnRoshan += attack;
    document.querySelector('.damage-done').innerHTML = totalDamageDoneOnRoshan;
    roshan.health -= attack;

    document.querySelector('.damage-done').innerHTML = `Physical damage done this turn: ${attack}`;
    document.querySelector('.percentage-health-this-attack-on-roshan').innerHTML = `Percent of health damaged: ${(attack/(roshan.health + attack) * 100).toFixed(2)}%`;
    document.querySelector('.percentage-health-total').innerHTML = `Percentage of health roshan has left: ${Math.abs((totalDamageDoneOnRoshan - 10000))/100}%`;
    document.querySelector('.total-damage-done').innerHTML = `Total damage done: ${totalDamageDoneOnRoshan}`;
    document.querySelector('.ember-health').innerHTML = `${ember.health}`;
    document.querySelector('.roshan-health').innerHTML = `${roshan.health}`;
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
    let attack =  Math.floor(Math.random() * 1600);
    totalDamageDoneOnRoshan += attack;
    roshan.health -= attack;
    document.querySelector('.damage-done').innerHTML = totalDamageDoneOnRoshan;
    
    document.querySelector('.damage-done').innerHTML = `Magic damage done this turn: ${attack}`;
    document.querySelector('.percentage-health-this-attack-on-roshan').innerHTML = `Percent of health damaged: ${(attack/(roshan.health + attack) * 100).toFixed(2)}%`;
    document.querySelector('.percentage-health-total').innerHTML = `Percentage of health roshan has left: ${Math.abs((totalDamageDoneOnRoshan - 10000))/100}%`;
    document.querySelector('.damage-done').innerHTML = `Magic damage done this turn: ${totalDamageDoneOnRoshan}`;
    document.querySelector('.ember-health').innerHTML = `${ember.health}`;
    document.querySelector('.roshan-health').innerHTML = `${roshan.health}`;
    document.querySelector('.total-damage-done').innerHTML = `Total damage done: ${totalDamageDoneOnRoshan}`;
    document.getElementById('roshan-health-meter').value = `${roshan.health - attack}`
    setTimeout(function(){
        document.querySelector('p.turn-displayer').innerHTML = (`${attack} magic damage`);
    }, 2000);
    // setTimeout(function(){
    //     document.querySelector('p.turn-displayer').innerHTML = `Awaiting Ember's Turn`;
    // },4000);
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
    // alert(`Roshan has attacked you for  ${attack} damage and has decreased your health by ${(attack/(ember.health+attack) * 100).toFixed(2)}% `)  
    //action recap
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
  
    // document.querySelector('button.drink-whiteclaw').disabled = false;
  
}



function attackMagicalRoshan(){
    let attack =  Math.floor(Math.random() * 1000);
    totalDamageDoneOnEmber += attack;
    document.querySelector('.damage-done').innerHTML = totalDamageDoneOnEmber;
    ember.health -= attack;
    // alert(`Roshan has just done ${attack} magic damage and decreased Ember's health with ${(attack/(ember.health+attack) * 100).toFixed(2)}% `);
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
    // document.querySelector('button.drink-whiteclaw').disabled = false;
   
    
    
}



function checkWinner(){
    
    if(ember.health <= 0 && roshan.health > 0){
        playTrombone();
        playTeammates();
        document.querySelector('p.turn-displayer').innerHTML ='ROSHAN WINS YOU LOSE!';
        roshanBattleScore.innerHTML = `${battleScoreRoshan += 1}`;
        resetBoard();
        // document.querySelector('p.ember-health').innerHTML = '5000';
        // setTimeout(function(){
        //     resetBoard();
        // },3000); 
    }
    
    else if(roshan.health <= 0 && ember.health > 0){
        playCheer();
        playBelieve();
        roshanBattleScore.innerHTML = `${battleScoreEmber += 1}`;
        document.querySelector('p.turn-displayer').innerHTML = 'VICTORY! YOU WIN'; 
        resetBoard();
        
        // document.querySelector('p.roshan-health').innerHTML = '10000';
        // setTimeout(function(){
        //     resetBoard();
        // },3000); 
    }
    
}


function healthRegen(){
    if(action === 2){
        alert(`Ember's health has been regenerated by 3% or ${ember.health *.03}`)
        ember.health *= 1.03;
        let emberHealth =document.getElementById('ember-health-meter')
        emberHealth.value = (ember.health * 1.03);
        
    }
}

function checkAction(){
    if(action ===0){
        setTimeout(function(){
            document.querySelector('.turn-displayer').innerHTML =`AWAITING EMBER'S TURN`;
        },10000);
    }
    else if(action === 1 && action <=2){
        document.querySelector('.turn-displayer').innerHTML = `Ember is attacking`;
    }else if(action >2){
        document.querySelector('button.attack-physical').disabled = true;
        document.querySelector('button.attack-magical').disabled = true;
    }
    else if (action >=3 && action <=4){
        
        setTimeout(function(){
            document.querySelector('p.turn-displayer').innerHTML = 'Roshan is attacking';
        }, 2000);
        document.querySelector('button.attack-physical').disabled = true;
        document.querySelector('button.attack-magical').disabled = true;
        // document.querySelector('button.drink-whiteclaw').disabled = true;
    }else if(action >= 4){
       if(action === 4){
           alert(`Roshan's health has regenerated by 4%`);
            roshan.health *= 1.04;
            let roshanHealth = document.getElementById('roshan-health-meter')
            roshanHealth.value = (roshan.health * 1.04);
            
        }
        
        
        document.querySelector('.turn-displayer').innerHTML = 'Ember';
    }

}

function activateFireball(){
    let fireball = document.getElementById('fireball');
    // fireball.style.visibility = "visible";
    fireball.style.animationPlayState = "running";  

    setTimeout(function() {
        fireball.style.animationPlayState = "paused";  
    }, 3000);
}

function roshansTurn(){
    // document.querySelector(',attack-magical').disabled = true;
    // document.querySelector('.attack-physical').disabled = true;
    if(action >= 2 && action < 4){
        
        setTimeout(function() {
            attackPhysicalRoshan();
        }, 4000);
        setTimeout(function() {
            attackMagicalRoshan();
        }, 4000); 
        
    }
}


// function checkWhiteClaw(){
//     if(action === 1){
//         document.querySelector(".drink-whiteclaw").disable = false;
//     }else if (action !== 1){
//         document.querySelector(".drink-whiteclaw").disable = true;
//     }
// }
//if player drinks WhiteClaw, either Magical or Physical Attack gets amplified by 200 points but current health is reduced by 10% 
//this must be chosen in the first action and  the button will be disabled if action is at 2
// function drinkWhiteClaw(){

// }


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
    // document.querySelector('button.attack-physical').style.visibility = 'visible';
    // document.querySelector('button.attack-magical').style.visibility = 'visible';
    document.getElementById('body').style.visibility = 'visible';
    setTimeout(function(){
        document.querySelector('.attack-magical').disabled = false;
        document.querySelector('.attack-physical').disabled = false;
    }, 5000);
}
function resetBoard(){
    ember.health = 0;
    roshan.health =0;
    action =0;
    //when user fnishes attack add 1 to action counter;
    
    
    emberBaseAttackDamage = 1000;
    roshanBaseAttackDamage = 400;
    
    totalDamageDoneOnRoshan = 0;
    percentangeDamageOnRoshan = ((totalDamageDoneOnRoshan/roshan.health) * 100).toFixed(2);
    
    totalDamageDoneOnEmber = 0;
    percentangeDamageEmber = ((totalDamageDoneOnEmber/ember.health) * 100).toFixed(2);
    document.querySelector('.attack-magical').disabled = true;
    document.querySelector('.attack-physical').disabled = true;
    document.getElementById('body').style.visibility = 'hidden';
    document.querySelector('.play-again').style.visibility = 'visible';

}

function hidePlayAgain(){
    this.style.visibility = 'hidden';
    // document.querySelector('button.attack-physical').style.visibility = 'visible';
    // document.querySelector('button.attack-magical').style.visibility = 'visible';
    document.getElementById('body').style.visibility = 'visible';
    setTimeout(function(){
        document.querySelector('.attack-magical').disabled = false;
        document.querySelector('.attack-physical').disabled = false;
    }, 5000);
}