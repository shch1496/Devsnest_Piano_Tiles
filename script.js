(function(){


    function initCanvas() {
       


        
        let canvas = document.querySelector("#canvas");
        let context = canvas.getContext("2d");
        let canvasWidth, canvasHeight;
        canvasWidth = canvas.width =500;
        canvasHeight = canvas.height =800;



        let overlay = document.querySelector("#overlay");
        let easyMode = document.querySelector(".easy");
        let mediumMode = document.querySelector(".medium");
        let hardMode = document.querySelector(".hard");
        let btnTryAgain = document.querySelector(".try");
        const openModal = document.querySelector('#open-modal')
        const modal = document.querySelector(".modal")
    
        const scoreModal = document.querySelector("#score-modal")
        easyMode.addEventListener("click", handleEasyMode);
        mediumMode.addEventListener("click", handleMediumMode);
        hardMode.addEventListener("click", handleHardMode);
        btnTryAgain.addEventListener("click", handleTryAgain);


        
        

        let tiles = [];
        let mx, my;
        let column;
        let score = 0;



openModal.addEventListener('click', ()=>{
    modal.showModal();
})
     
  
        

        canvas.addEventListener("click", handleMouseClick)
               //Track
        class Column {
                constructor(columnNumber, speed){
                    this.columnNumber = columnNumber;
                    this.speed = speed;
                }
    
                get tileSpeed() {
                    return this.speed;
                }
                get tileSize() {
                    return canvasWidth/this.columnNumber
                }
                
                getLane(lane) {
                    return this.tileSize * (lane-1);
                }
                
                get tileHeight(){
                    return this.tileSize + (canvasWidth/4);
                }
            }
           
        
        class Tile {
            constructor(position, width, lane){
                this.y = position;
                this.x = lane;
                this.width = width;
                this.height = width + (width/4);

            }

            display() {
                context.fillStyle ="000";
                context.fillRect(this.x,this.y,this.width, this.height)
            }

            moveY(speed) {
               this.y =this.y+speed; 
            }

            tileClicked(mouseX, mouseY){
                let xx = this.x + this.width;
                let yy = this.y + this.height;

                if(mouseX >= this.x && mouseX <= xx && mouseY>=this.y && mouseY<=yy){
                    return true;
                }
            }

            get tilePosition(){
                return this.y;
            }
        }

 
    //    let column = new Column(4, speed);
    //    addTiles(10);
  
       


    function addTiles(num){
      
        for(let i=0; i< num; i++){
            let randomLane = Math.floor(Math.random() * (4) + 1)
            tiles[i] = new Tile(-1*(column.tileHeight*i), column.tileSize, column.getLane(randomLane))
        }
    }
    


    
        function animate() {
            context.save();
            context.clearRect(0, 0, canvasWidth, canvasHeight) // to earse the canvase
            
            // changes happen here
            // tile.display()
            // tile.moveY(column.tileSpeed);

            for(let i=0; i<tiles.length; i++){
                tiles[i].display()
                tiles[i].moveY(column.tileSpeed);
                 if(i == 0){

                    if(tiles[0].tilePosition > canvasHeight){
                        //game over


                        clearInterval(animateInterval)
                        scoreModal.textContent = score;
                        openModal.dispatchEvent(new Event("click")); 
                        
                        
                        
                    }
    
                    if(mx && my){
                        if(tiles[i].tileClicked(mx, my)){
                            if(tiles.length == 1){
                                //Game won
                                

                                scoreModal.textContent = score;
                                clearInterval(animateInterval)
                                openModal.dispatchEvent(new Event("click")); 
                        
                            }else{
                                tiles.splice(0,1)
                                score++;
                            }
                          
                        }
    
                        mx =0;
                        my =0;
                       
                    }

               
                 }
              
            }
            
    
            context.restore()
        }
    
        // let animateInterval = setInterval(animate, 30);
        let animateInterval;
    
    //     context.canvas.addEventListener("click", function(event){
    //         clearInterval(animateInterval)
    //     })
    
    


        function handleMouseClick(event){
        //    console.log(event.clientX, event.clientY)
            mx = event.clientX;
            my = event.clientY

            console.log("clicked")
        }
 


    //Event handleers

    function handleEasyMode(){
        score =0;
        overlay.style = "display: none";
        column = new Column(4, 2);
        addTiles(10);
        animateInterval = setInterval(animate, 30);
   
   
    }

    function handleMediumMode(){
        score =0;
        overlay.style = "display: none";
     
        column = new Column(4, 4);
        addTiles(15);
        animateInterval = setInterval(animate, 30);

   
    }

    function handleHardMode(){
        score =0;
        column = new Column(4, 7);
        addTiles(20);
   
        overlay.style = "display: none";
        animateInterval = setInterval(animate, 30);

    }


    function handleTryAgain() {
        modal.close();
        overlay.style = "display: block";
        score =0;
     
    }


}




document.addEventListener('DOMContentLoaded', function(event){
    

    initCanvas();


})



})()
