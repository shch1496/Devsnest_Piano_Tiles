(function(){



let rows = [];
let score = 0;
// let gameOver = false;
let topThreeScorer = [];
let maxAnimationSpeed = 0.2;
let animationSpeed = 0.5;
let gameStart = true;

const templates = document.querySelector("#templates");
const board = document.querySelector("#board");

const tiles = document.querySelector(".tiles");
let playerName = document.querySelector("#player-name");
let playerScore = document.querySelector("#player-score");

const root = document.documentElement;
root.style.setProperty("--animation-speed", `${animationSpeed}s`);


function generateRow(){
    let row = new Array(4).fill("white");
    let pos = Math.trunc(Math.random() * 4);
    row[pos] = "black";
    
    return row;
}

function fillRows(){
    for(let i=0;i<8; i++){
        rows.push(generateRow());
    }
}


function handleCellClick(event){

    let cell = event.target;
    let cell_row_index = cell.dataset.rowIndex;
    let cell_column_index = cell.dataset.columnIndex;
    let i = cell_row_index;
    let j = cell_column_index;
    
    if (rows[i][j] == "white"){
        // gameOver = true;
        cell.classList.add("red");
        tiles.style = "animation: none;";
    
       
    }else {
        rows.splice(i, 1);
        rows = [generateRow(), ...rows];
      
        score++;
        
        playerScore.textContent = score;
        tiles.innerHTML = ""


        // handling animation speed
    //      if(animationSpeed > maxAnimationSpeed){
    //          animationSpeed -= score/10;
    //          root.style.setProperty("--animation-speed", `${animationSpeed}s`);
    //    }else{
    //     // animationSpeed = maxAnimationSpeed;
    //    }
  
        render(rows)
      
    }
 

}

fillRows();



function render(){

    for(let i=0; i<rows.length; i++){
        let rowTemplate = templates.content.querySelector(".row")
        let row = document.importNode(rowTemplate, true)
        // row.setAttribute("data-row-index", i);
   
        for(let j=0; j<rows[0].length; j++){
           let cellTemplate = templates.content.querySelector(".cell")
           let cell = document.importNode(cellTemplate, true);
           cell.setAttribute("data-row-index", i);
           cell.setAttribute("data-column-index", j);
           if(rows[i][j] === "black"){
               cell.classList.add("black")
           }
         
           row.appendChild(cell);
   
           cell.addEventListener("click", handleCellClick)
       }
   
       tiles.appendChild(row);
   
   }
   
  
}


console.log()



if(gameStart){
    setTimeout(render, 2000)
    // render()
}




})()