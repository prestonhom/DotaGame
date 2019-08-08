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
    roshanBaseAttakDamage,
    roshanBaseMagicalDamge,
    totalDamageDoneOnEmber,
    percentangeDamageonEmber;


    ////
    emberBaseAttackDamage = 800;
    roshanBaseAttakDamage = 400;
    round = 0;
    
    ember = {
        health: 5000,
        physDamage: attackPhysicalEmber,
        magicDamage: attackMagicalEmber
    }
    
    roshan = {
        health: 10000,
        // physDamage: function(){
        //     ember.health -= 400;
        // },
        // healthRegen: function(){
        //     this.health *= 1.03;
        // },
        // magicDamage: Math.floor(Math.random() * 801)
    }
    
    action = 0; 
    
    totalDamageDoneOnRoshan = 0;
    percentangeDamageOnRoshan = ((totalDamageDoneOnRoshan/roshan.health) * 100).toFixed(2);

    totalDamageDoneOnEmber = 0;
    percentangeDamageEmber = ((totalDamageDoneOnEmber/ember.health) * 100).toFixed(2);
    
/*----- cached element references -----*/

/*----- event listeners -----*/
let physicalAttackButton = document.querySelector('.attack-physical');
physicalAttackButton.addEventListener('click', ember.physDamage);
physicalAttackButton.addEventListener('click', activateFireball);

let magicalAttackButton = document.querySelector('.attack-magical');
magicalAttackButton.addEventListener('click', ember.magicDamage);







// let armor = document.getElementById('armor');
// armor.addEventListener('click', function(){

    
    // let rollDice = document.getElementById('roll');
    // rollDice.addEventListener('click', roll);
    /*----- functions -----*/
///initialize state variables
function init(){
    let initTurnDisplayer = document.querySelector('.turn-displayer')
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
    
    
    emberBaseAttackDamage = 800;
    roshanBaseAttackDamage = 400;
    
    totalDamageDoneOnRoshan = 0;
    percentangeDamageOnRoshan = ((totalDamageDoneOnRoshan/roshan.health) * 100).toFixed(2);
    
    totalDamageDoneOnEmber = 0;
    percentangeDamageEmber = ((totalDamageDoneOnEmber/ember.health) * 100).toFixed(2);
    
    // document.getElementById('fireball').style.visibility = "hidden";
    document.getElementById('fireball').style.animationPlayState = "paused";
    

}
////initializes the page
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
    // how much damage does Ember's physical attack button do 
    activateFireball();
    let attack = emberBaseAttackDamage;
    totalDamageDoneOnRoshan += attack;
    document.querySelector('.damage-done').innerHTML = totalDamageDoneOnRoshan;
    roshan.health -= attack;
    alert(`You've just done ${attack} damage and decreased Roshan's health by ${(attack/(roshan.health+attack) * 100).toFixed(2)}% `); 
    document.querySelector('.damage-done').innerHTML = `Physical damage done this turn: ${attack}`;
    document.querySelector('.percentage-health-this-attack-on-roshan').innerHTML = `Percent of health damaged: ${(attack/(roshan.health + attack) * 100).toFixed(2)}%`;
    document.querySelector('.percentage-health-total').innerHTML = `Percentage of health roshan has left: ${Math.abs((totalDamageDoneOnRoshan - 10000))/100}%`;
    document.querySelector('.total-damage-done').innerHTML = `Total damage done: ${totalDamageDoneOnRoshan}`;
    document.querySelector('.ember-health').innerHTML = `${ember.health}`;
    document.querySelector('.roshan-health').innerHTML = `${roshan.health}`;
    document.getElementById('roshan-health-meter').value = `${roshan.health - attack}`;
    healthMeter();
    checkWinner();
    if(action === 0 ){
        action +=1;
    }else if(action === 1){
        action += 2;
    }
    console.log(action);
    checkAction();
    healthRegen();
    roshansTurn();
    
    }
   


function attackMagicalEmber(){
    
    let attack =  Math.floor(Math.random() * 1600);
    totalDamageDoneOnRoshan += attack;
    roshan.health -= attack;
    document.querySelector('.damage-done').innerHTML = totalDamageDoneOnRoshan;
    alert(`You've just done ${attack} DAMAGE and decreased Roshan's health by ${(attack/(roshan.health+attack) * 100).toFixed(2)}% `);
    document.querySelector('.damage-done').innerHTML = `Magic damage done this turn: ${attack}`;
    document.querySelector('.percentage-health-this-attack-on-roshan').innerHTML = `Percent of health damaged: ${(attack/(roshan.health + attack) * 100).toFixed(2)}%`;
    document.querySelector('.percentage-health-total').innerHTML = `Percentage of health roshan has left: ${Math.abs((totalDamageDoneOnRoshan - 10000))/100}%`;
    document.querySelector('.damage-done').innerHTML = `Magic damage done this turn: ${totalDamageDoneOnRoshan}`;
    document.querySelector('.ember-health').innerHTML = `${ember.health}`;
    document.querySelector('.roshan-health').innerHTML = `${roshan.health}`;
    document.querySelector('.total-damage-done').innerHTML = `Total damage done: ${totalDamageDoneOnRoshan}`;
    document.getElementById('roshan-health-meter').value = `${roshan.health - attack}`
    healthMeter();
    checkWinner();
    if(action === 0 ){
        action +=1;
    }else if(action === 1){
        action += 2;
    }
    
    checkAction();
    healthRegen();
    roshansTurn();
    
    
    
}
function attackPhysicalRoshan(){
    // how much damage does this attack do 
    let attack = roshanBaseAttackDamage;
    totalDamageDoneOnEmber += attack;
    document.querySelector('.damage-done').innerHTML = totalDamageDoneOnEmber;
    ember.health -= attack;
    alert(`Roshan has attacked you for  ${attack} damage and has decreased your health by ${(attack/(ember.health+attack) * 100).toFixed(2)}% `)  
    document.querySelector('.damage-done').innerHTML = `Physical damage done this turn: ${attack}`;
    document.querySelector('.percentage-health-this-attack-on-ember').innerHTML = `Percent of health damaged: ${(attack/(ember.health + attack) * 100).toFixed(2)}%`;
    document.querySelector('.percentage-health-total').innerHTML = `Percentage of health ember has left: ${Math.abs((totalDamageDoneOnEmber - 10000))/100}%`;
    document.querySelector('.ember-health').innerHTML = `${ember.health}`;
    document.querySelector('.roshan-health').innerHTML = `${roshan.health}`;
    document.getElementById('ember-health-meter').value = `${ember.health - attack}`;
    healthMeter();
    checkWinner();
    if(action === 3){
        action +=1;
    }else if (action === 4){
        action =0;
    }
    checkAction();
    healthRegen();
    document.querySelector('button.attack-physical').disabled = false;
    document.querySelector('button.attack-magical').disabled = false;
    document.querySelector('button.drink-whiteclaw').disabled = false;
  
}



function attackMagicalRoshan(){
    let attack =  Math.floor(Math.random() * 1600);
    totalDamageDoneOnEmber += attack;
    document.querySelector('.damage-done').innerHTML = totalDamageDoneOnEmber;
    ember.health -= attack;
    alert(`Roshan has just done ${attack} magic damage and decreased Ember's health with ${(attack/(ember.health+attack) * 100).toFixed(2)}% `);
    document.querySelector('.damage-done').innerHTML = `Magic damage done this turn: ${attack}`;
    document.querySelector('.percentage-health-this-attack-on-ember').innerHTML = `Percent of health damaged: ${(attack/(roshan.health + attack) * 100).toFixed(2)}%`;
    document.querySelector('.percentage-health-total').innerHTML = `Percentage of health ember has left: ${Math.abs((totalDamageDoneOnEmber - 10000))/100}%`;
    document.querySelector('.ember-health').innerHTML = `${ember.health}`;
    document.querySelector('.roshan-health').innerHTML = `${roshan.health}`;
    document.getElementById('ember-health-meter').value = `${ember.health - attack}`;
    healthMeter();
    checkWinner();
    if(action === 3){
        action +=1;
    }else if (action === 4){
        action =0;
    }
    checkAction();
    healthRegen();
    document.querySelector('button.attack-physical').disabled = false;
    document.querySelector('button.attack-magical').disabled = false;
    document.querySelector('button.drink-whiteclaw').disabled = false;
   
    
    
}


// function roll(){
//     return Math.floor(Math.random() * 6)+1;
// }

function checkWinner(){
    let roshanBattleScore = document.querySelector('.roshan-score-counter');
    let emberBattleScore = document.querySelector('.ember-score-counter');
    if(ember.health <= 0 && roshan.health > 0){
        alert(`Winner is Roshan!! YOU LOSE`)
        // roshanBattleScore += 1;
        roshanBattleScore.innerHTML++;
        init();
        document.querySelector('p.ember-health').innerHTML = '5000';
    }
    
    if(roshan.health <= 0 && ember.health > 0){
        alert('VICTORY! YOU WIN')   
        emberBattleScore.innerHTML++;
        init();
        document.querySelector('p.roshan-health').innerHTML = '10000';
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
    if(action === 1 && action <=2){
        document.querySelector('.turn-displayer').innerHTML = `Ember is attacking`;
    }else if (action >=3 && action <=4){
        document.querySelector('.turn-displayer').innerHTML = 'Roshan';
        document.querySelector('button.attack-physical').disabled = true;
        document.querySelector('button.attack-magical').disabled = true;
        document.querySelector('button.drink-whiteclaw').disabled = true;
    }else if(action >= 4){
       if(action === 4){
           alert(`Roshan's health has regenerated by 4%`);
            roshan.health *= 1.04;
            let roshanHealth = document.getElementById('roshan-health-meter')
            roshanHealth.value = (roshan.health * 1.04);
            
        }
        
        action = 0;
        document.querySelector('.turn-displayer').innerHTML = 'Ember';
    }

}

function activateFireball(){
    let fireball = document.getElementById('fireball');
    // fireball.style.visibility = "visible";
    fireball.style.animationPlayState = "running";  
}

function roshansTurn(){
    if(action >= 2 && action < 4){
        attackPhysicalRoshan();
        attackMagicalRoshan();
    }
}

function checkWhiteClaw(){
    if(action === 1){
        document.querySelector(".drink-whiteclaw").disable = false;
    }else if (action !== 1){
        document.querySelector(".drink-whiteclaw").disable = true;
    }
}
//if player drinks WhiteClaw, either Magical or Physical Attack gets amplified by 200 points but current health is reduced by 10% 
//this must be chosen in the first action and  the button will be disabled if action is at 2
// function drinkWhiteClaw(){

// }

function healthMeter(){
    if(ember.health === 2499 || roshan.health < 4999){
        document.getElementById('ember-health-meter').style.background = 'blue';
        document.getElementById('roshan-health-meter').style.background = 'blue';
    }
}