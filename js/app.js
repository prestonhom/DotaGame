/*----- constants -----*/

    // const CHARACTER = {
    //     'p': 'ember',
    //     'c': 'roshan'
    // }
        // }
        
     /*----- app's state (variables) -----*/
    let ember, roshan, action, turn, round, battles, winner, emberBaseAttackDamage, emberBaseMagicalDamage;

    emberBaseAttackDamage = 800;
        ember = {
            health: 5000,
            physDamage: attackPhysicalEmber,
            healthRegen: function(){
                this.health *= 1.03;
            },
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
       
        turn = 0;
        //turn 
        round = 0;
        winner =null;
        render();
    
    }
    init();
    function render(){
        if(ember.health > 0 && roshan.health > 0){
           let turnDisplayer = document.querySelector('p.turn-Displayer')
           turnDisplayer.innerHTML++; 
        }
        
        //render after 
        //update scores
    }
    
    function attackPhysicalEmber(){
        // how much damage does this attack do 
            roshan.health -= emberBaseAttackDamage;
            alert(`YOU JUST DID ${emberBaseAttackDamage} DAMAGE AND DECREASED ROSHAN'S HEALTH BY ${(emberBaseAttackDamage/roshan.health * 100).toFixed(2)}% `)  
            checkWinner();
            action +=1;
            checkAction();
            render();
    }
    
    // function attackMagicalEmber(){
    //     // how much does this attack do Math.floor(Math.random()* 1600)
    //     let x = Math.floor(Math.random()* 801);
    //     return x;
    // }
    
    function attackMagicalEmber(){
        let x =  Math.floor(Math.random() * 1600);
        roshan.health -= x;
        alert(`YOU JUST DID ${x} DAMAGE AND DECREASED ROSHAN'S HEALTH BY ${(x/roshan.health * 100).toFixed(2)}% `)    
        checkWinner();
        action += 1;
        checkAction();
        render();
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
        }else if (action >=2 && action < 4){
            document.querySelector('.turn-displayer').innerHTML = 'Roshan';
        }
    }
