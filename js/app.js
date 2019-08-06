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
        emberBaseAttackDamage, 
        emberBaseMagicalDamage,
        totalDamageDone, 
        percentangeDamage;



        emberBaseAttackDamage = 800;
        round = 0;
        
        ember = {
            health: 5000,
            physDamage: attackPhysicalEmber,
            magicDamage: attackMagicalEmber
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
        
        totalDamageDone = 0;
    percentangeDamage = ((totalDamageDone/roshan.health) * 100).toFixed(2);
    
/*----- cached element references -----*/

/*----- event listeners -----*/
let physicalAttackButton = document.querySelector('.attack-physical');
physicalAttackButton.addEventListener('click', ember.physDamage);

let magicalAttackButton = document.querySelector('.attack-magical');
magicalAttackButton.addEventListener('click', ember.magicDamage);

// let armor = document.getElementById('armor');
// armor.addEventListener('click', function(){

    
    let rollDice = document.getElementById('roll');
    rollDice.addEventListener('click', roll);
    /*----- functions -----*/
    
function init(){
    let initTurnDisplayer = document.querySelector('.turn-displayer')
    initTurnDisplayer.innerHTML = 'Ember'; 
    ember = {
        health: 50000  
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

}
init();
// function render(){
//     if(ember.health > 0 && roshan.health > 0){
//         let turnDisplayer = document.querySelector('p.turn-Displayer')
//         turnDisplayer.innerHTML++; 
//     }
    
//     //render after 
//     //update scores
// }

function attackPhysicalEmber(){
    // how much damage does this attack do 
    let attack = emberBaseAttackDamage;
    totalDamageDone += attack;
    document.querySelector('.damage-done').innerHTML = totalDamageDone;
        roshan.health -= attack;
        alert(`YOU JUST DID ${attack} DAMAGE AND DECREASED ROSHAN'S HEALTH BY ${(attack/(roshan.health+attack) * 100).toFixed(2)}% `)  
        document.querySelector('.damage-done').innerHTML = `Physical damage done this turn: ${attack}`;
        document.querySelector('.percentage-health-this-attack').innerHTML = `Percent of health damaged: ${(attack/(roshan.health + attack) * 100).toFixed(2)}%`;
        document.querySelector('.percentage-health-total').innerHTML = `Percentage of health roshan has left: ${Math.abs((totalDamageDone - 10000))/100}%`;
        checkWinner();
        action +=1;
        checkAction();
        checkRound();
}

// function attackMagicalEmber(){
//     // how much does this attack do Math.floor(Math.random()* 1600)
//     let x = Math.floor(Math.random()* 801);
//     return x;
// }

function attackMagicalEmber(){
    let attack =  Math.floor(Math.random() * 1600);
    totalDamageDone += attack;
    roshan.health -= attack;
    alert(`YOU JUST DID ${attack} DAMAGE AND DECREASED ROSHAN'S HEALTH BY ${(attack/(roshan.health+attack) * 100).toFixed(2)}% `);
    document.querySelector('.damage-done').innerHTML = `Magic damage done this turn: ${attack}`;
    document.querySelector('.percentage-health-this-attack').innerHTML = `Percent of health damaged: ${(attack/(roshan.health + attack) * 100).toFixed(2)}%`;
    document.querySelector('.percentage-health-total').innerHTML = `Percentage of health roshan has left: ${Math.abs((totalDamageDone - 10000))/100}%`;
    checkWinner();
    action += 1;
    checkAction();
    checkRound();
    
}

function roll(){
    return Math.floor(Math.random() * 6)+1;
}

function checkRound(){
    if(action === 4){
        round ++;
        ember.health *= 1.03;
    }
}

function checkWinner(){
    let roshanBattleScore = document.querySelector('.roshan-score-counter');
    let emberBattleScore = document.querySelector('.ember-score-counter');
    if(ember.health <= 0){
        alert(`Winner is Roshan!! YOU LOSE`)
        // roshanBattleScore += 1;
        roshanBattleScore.innerHTML++;
    }else if(ember.health > 0 || roshan.health > 0 ){

    }
    
    if(roshan.health <= 0){
        alert('VICTORY! YOU WIN')   
        emberBattleScore.innerHTML++;
    }
    
}

function checkAction(){
    if(action < 2){
        document.querySelector('.turn-displayer').innerHTML = 'Ember';
    }else if (action >= 2 && action < 4){
        document.querySelector('.turn-displayer').innerHTML = 'Roshan';
    }else if(action ){
        action = 0;
    }
}

function healthRegenEmber(){
    if(round === 1){
        
    }
   
}
function healthRegenRoshan(){

}

