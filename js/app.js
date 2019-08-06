
/*----- constants -----*/
// const CHARACTER = {
const CHARACTER = {
    'p': 'ember',
    'c': 'roshan'
}
    // }
    
 /*----- app's state (variables) -----*/
let ember, roshan, action, turn, round, battles, winner;
    ember = {
        health: 5000,
        physDamage: function(){
            roshan.health -= 800;
        },
        healthRegen: function(){
            this.health *= 1.03;
        },
        magicDamage: function(){
            roshan.health -= Math.floor(Math.random() * 1600);
        }
    }
    
    roshan = {
        health: 10000,
        physDamage: function(){
            ember.health -= 400;
        },
        healthRegen: function(){
            this.health *= 1.03;
        },
        magicDamage: Math.floor(Math.random() * 801)
    }

    action = 0;
    
/*----- cached element references -----*/

/*----- event listeners -----*/
let physicalAttackButton = document.querySelector('.attack-physical');
physicalAttackButton.addEventListener('click', ember.physDamage);

let magicalAttackButton = document.querySelector('.attack-magical');
magicalAttackButton.addEventListener('click', ember.magicDamage);

// let armor = document.getElementById('armor');
// armor.addEventListener('click', function(){
    
    // });
    
    let rollDice = document.getElementById('roll');
    rollDice.addEventListener('click', roll);
    /*----- functions -----*/
    
    function init(){
        ember = {
            health: 50000
            
        }
        
        roshan = {
            health: 10000
    }
    action = 0;
    //when user fnishes attack add 1 to action counter;

    turn = 0;
    //turn 
    round = 0;
    winner =null;
    render();

}
init();
function render(){
    while(EMBER.health > 0 && ROSHAN.health > 0 && turnCounter % 2 == 0){
       let turnDisplayer = document.querySelector('p.turnDisplayer')
       turnDisplayer.innerHTML = `${round[turn]} turn`
    }
    
    //render after 
    //update scores
}

function attackPhysical(){
    // how much damage does this attack do 

    
}

// function attackMagicalEmber(){
//     // how much does this attack do Math.floor(Math.random()* 1600)
//     let x = Math.floor(Math.random()* 801);
//     return x;
// }

function attackMagicalRoshan(){

}

function roll(){
    return Math.floor(Math.random() * 6)+1;
}

function checkTurn(){

    if(action < 2){
        turn === 'ember'
    }else if(action > 2 && action <= 4){
        turn ==='roshan'
    }
}

function checkWinner(){
    let roshanBattleScore = document.querySelector('.roshan-score-counter');
    let emberBattleScore = document.querySelector('.ember-score-counter');
    if(ember.health <= 0){
        alert(`Winner is Roshan!! YOU LOSE`)
        // roshanBattleScore += 1;
        roshanBattleScore.innerHTML += 1;
    }if(roshan.health <= 0){
        alert('VICTORY! YOU WIN')
        emberBattleScore.innerHTML += 1;
    }
    
}