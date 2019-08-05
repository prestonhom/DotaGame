
/*----- constants -----*/
const EMBER = {
    health: null;
}
const ROSHAN = {
    health: null;
}

/*----- app's state (variables) -----*/
let turn, round, battles;


/*----- cached element references -----*/

/*----- event listeners -----*/
    let physicalAttackButton = document.querySelector('physicalAttackButton');
    physicalAttackButton.addEventListener('click',physicalAttackButton);

    let magicalAttackButton = document.querySelector('magicalAttackButton');
    magicalAttackButton.addEventListener('click,',attackMagical);

    // let armor = document.getElementById('armor');
    // armor.addEventListener('click', function(){

    // });

    let rollDice = document.getElementById('roll');
    rollDice.addEventListener('click', roll);
/*----- functions -----*/

function roll(){

}

function init(){
    if(round % 3 ===0){
        document.getElementById('')
    }
    let hdr =document.getElementById('header');

    let ftr =document.getElementById('footer');
}

function render(){
    while(EMBER.health > 0 && ROSHAN.health > 0 && turnCounter % 2 == 0){
       let turnDisplayer = document.querySelector('.turnDisplayer')
       turnDisplayer.innerHTML = `${round[turn]} turn`
    }
}

function attackPhysical(){
    // how much damage does this attack do 
}

function attackMagical(){
    // how much does this attack do Math.floor(Math.random()* 1600)
    
    
}

function roll(){
    return Math.floor(Math.random() * 6)+1;
}


