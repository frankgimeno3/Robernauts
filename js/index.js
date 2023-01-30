window.onload = () => {
  //cuando haya cargado window ejecuta código

  class Robernaut {
    constructor() {
      this.x = 20;
      this.y = 250;
      this.w = 50;
      this.h = 90;
      this.propulsion = 10;
      this.robernautImg = new Image();
      this.robernautImg.src = "images/RobernautRedSingle.png";
    }
    print(ctx) {
      ctx.drawImage(this.robernautImg, this.x, this.y, this.w, this.h);
    }
    
    jetpackUp() {
      this.y -= this.propulsion;
    }
    jetpackDown() {
      this.y += this.propulsion;
    }

    changeColorRed(){
        this.robernautImg.src = "images/RobernautBlueSingle.png";
      }
    changeColorBlue(){
        this.robernautImg.src = "images/RobernautRedSingle.png";
      
    }
  }
  class Obstaculo {
    constructor(canvas, y, w, h,  src) {
      this.y = y;
      this.w = w; 
      this.x = 1500;
      this.h = h;
      this.vel = 4;
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
      this.roadImg = document.createElement("img");
      this.roadImg.src = "images/backgroundSpace.jpg";
      this.astronaut = new Robernaut();
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
      this.ctx.drawImage(this.roadImg, 0, 0, this.canvas.width, this.canvas.height);
      //  
      this.astronaut.print(this.ctx);
      //obst
      this.obstaculos.forEach(obstaculo => {
        obstaculo.print(this.ctx);
      });
    }
    recalculate() {
      if(this.iteracion == (Math.ceil(Math.random() * 30)+5)) {
        //creo obstaculo
        let obstaculo = new Obstaculo(this.canvas, Math.ceil((Math.random()*300)+100), 120, 120, "images/jasmin.png");
        //lo añado al array
        this.obstaculos.push(obstaculo);
      }
      if(this.iteracion == (Math.ceil(Math.random() * 50) + 50)) {
        //creo obstaculo
        let obstaculo = new Obstaculo(this.canvas, 0, 200, 600, "images/redObstacle.png");
        //lo añado al array
        this.obstaculos.push(obstaculo);
        this.iteracion = 0;
      }
      if(this.iteracion == (Math.ceil(Math.random() * 50) + 50)) {
        //creo obstaculo
        let obstaculo = new Obstaculo(this.canvas, 0, 200, 600, "images/blueObstacle.png");
        //lo añado al array
        this.obstaculos.push(obstaculo);
        this.iteracion = 0;
      }
      if(this.iteracion>90){ this.iteracion = 0;}
      //recorro array obstaculos:
      this.obstaculos.forEach(obstaculo => {
          //cambio posiciones
          obstaculo.move();
          //controlo colisiones
          // if(!( this.astronaut.x + this.astronaut.w < obstaculo.x || 
          //   this.astronaut.x > obstaculo.x + obstaculo.w || 
          //   this.astronaut.y > obstaculo.y + obstaculo.h ||
          //   this.astronaut.y + this.astronaut.h < obstaculo.y) ) {
          //     this.stop();
          //   }
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
};
