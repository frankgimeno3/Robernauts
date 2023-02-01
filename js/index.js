
window.onload = () => {
  //cuando haya cargado window ejecuta código

const btn = document.getElementById('titleGame');
btn.addEventListener('click', () => {
  btn.style.display = 'none';
});


  //prueba

  class Robernaut {
    constructor() {
      this.x = 20;
      this.y = 250;
      this.w = 50;
      this.h = 90;
      this.propulsion = 2;
      this.robernautImg = new Image();
      this.robernautImg.src = "images/RobernautRedSingle.png";
    }
    print(ctx) {
      ctx.drawImage(this.robernautImg, this.x, this.y, this.w, this.h);
    }
    
    jetpackUp() {
      this.y -= this.propulsion + 15;
      // this.y -= this.propulsion;
      // this.y -= this.propulsion;
      // this.y -= this.propulsion;
      // this.y -= this.propulsion;
      // this.y -= this.propulsion;
      // this.y -= this.propulsion;
      // this.y -= this.propulsion;
      // this.y -= this.propulsion;
      // this.y -= this.propulsion;

    }
    jetpackDown() {
      this.y += this.propulsion + 15;
      // this.y += this.propulsion;
      // this.y += this.propulsion;
      // this.y += this.propulsion;
      // this.y += this.propulsion;
      // this.y += this.propulsion;
      // this.y += this.propulsion;
      // this.y += this.propulsion;
    }

    changeColorRed(){
        this.robernautImg.src = "images/RobernautBlueSingle.png";
      }
    changeColorBlue(){
        this.robernautImg.src = "images/RobernautRedSingle.png";
    }
    // fadeOut(){
    //   let opacity = 0.8;
    //   let fadeOutInterval = setInterval(drawImage, 50);
    //   function drawImage() {
    //     ctx.clearRect(this.x, this.y, this.width, this.height);
    //     ctx.globalAlpha = opacity;
    //     ctx.drawImage(this.robernautImg, this.x, this.y);
    //     opacity -= 0.05;
    //     if (opacity <= 0.1) {
    //       clearInterval(fadeOutInterval);
    //     }
    //     else{opacity = 0.8}
    //   }
    // }
  }
  class Obstaculo {
    constructor(canvas, y, w, h,  src) {
      this.y = y;
      this.w = w; 
      this.x = 1500;
      this.h = h;
      this.vel = 9;
      this.obstacleImg = new Image();
      this.obstacleImg.src = src;
    

    }
    print(ctx) {
      ctx.drawImage(this.obstacleImg, this.x, this.y, this.w, this.h);
    }
    
    move() {
      this.x -= this.vel;
    }

    accelerate(){
      this.x -=10;
    }


  }
  
  class Juego {
    constructor() {
      this.canvas = document.getElementById("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.fondoImg = document.createElement("img");
      this.fondoImg.src = "images/backgroundSpace.jpg";
      this.astronaut = new Robernaut();

      ////

      
      // this.obstaculo = new Obstaculo();
      this.obstaculos = [];
      this.score = 0;
      this.intervalId = undefined;
      this.iteracion = 0;
    }
    start() {
      // if(!this.intervalId) {
      if(this.intervalId == undefined) {
        this.intervalId = setInterval(()=>{
          this.iteracion ++;

          //borra
          this.clear();
          //recalcula + genera obstaculos
          this.recalculate();
          //pinta
          this.print();
        }, 20);
      }
    }
    stop() {
      if(this.intervalId) clearInterval(this.intervalId);
    }
    clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    print() {
      //fondo
      this.ctx.drawImage(this.fondoImg, 0, 0, this.canvas.width, this.canvas.height);
      //  
      this.astronaut.print(this.ctx);
      //obst
      this.obstaculos.forEach(obstaculo => {
        obstaculo.print(this.ctx);
      });
    }
    recalculate() {
      if(this.iteracion == (Math.ceil(Math.random() * 30)+5)) {
        let obstaculo = new Obstaculo(this.canvas, Math.ceil((Math.random()*300)+100), 120, 120, "images/jasmin.png");
        this.obstaculos.push(obstaculo);

      }

      if(this.iteracion == (Math.ceil(Math.random() * 50) + 50)) {
        let obstaculo = new Obstaculo(this.canvas, 0, 200, 600, "images/redObstacle.png");
        this.obstaculos.push(obstaculo);
        this.iteracion = 0;
      }
      if(this.iteracion == (Math.ceil(Math.random() * 50) + 50)) {
        let obstaculo = new Obstaculo(this.canvas, 0, 200, 600, "images/blueObstacle.png");
        this.obstaculos.push(obstaculo);
        this.iteracion = 0;
      }
      if(this.iteracion>90){ this.iteracion = 0;}
      this.obstaculos.forEach(obstaculo => {
        obstaculo.move();
          // controlo colisiones
        // if(!( this.astronaut.x + this.astronaut.w < obstaculo.x+this.astronaut.w || this.astronaut.x > obstaculo.x + obstaculo.w || 
        //     this.astronaut.y > obstaculo.y + obstaculo.h ||
        //     this.astronaut.y + this.astronaut.h < obstaculo.y) ) {
        //       this.stop();
        //     }
      })
    }
  }

  let juego = new Juego();

  startGame();
  

  function startGame() {
   
    juego.start();
  }

  // document.body.addEventListener()
  document.getElementsByTagName("body")[0].addEventListener("keydown", (event)=>{
    switch(event.key) {
      case "ArrowUp":
        juego.astronaut.jetpackUp();  
      
        break;
      case "ArrowDown":
        juego.astronaut.jetpackDown();
        break;
      case "ArrowLeft":
        juego.astronaut.changeColorRed();
        break;
      case "ArrowRight":
          juego.astronaut.changeColorBlue();
        break;
      case "Spacebar":
          juego.Obstaculo.accelerate();
        break;
        
    }
  });
  //score
  

//obstaculos
}




