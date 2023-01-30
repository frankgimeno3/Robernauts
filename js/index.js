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
    
    jetpack() {
      let intervalId = setInterval(() => {
        if (this.y >= 250) {
          this.y -= this.propulsion;
        } 
        
        else {
          clearInterval(intervalId);
          setTimeout(() => {
            intervalId = setInterval(() => {
              if (this.y < 450) {
                this.y += this.propulsion;
              } 
              else{
                clearInterval(intervalId);
              }
            }, 40);
          }, 40);
        }
      }, 40);
    }

    changeColorRed(){
        this.robernautImg.src = "images/RobernautBlueSingle.png";
      }
    changeColorBlue(){
        this.robernautImg.src = "images/RobernautRedSingle.png";
      
    }
  }
  class Obstaculo {
    constructor(canvas, w, h, src) {
      this.y = 40;
      this.w = 150
      this.x = 928
      this.h = 450;
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
  }
  
  class Juego {
    constructor() {
      this.canvas = document.getElementById("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.roadImg = document.createElement("img");
      this.roadImg.src = "images/backgroundSky.jpg";
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
      if(this.iteracion == (Math.ceil(Math.random() * 75) + 35)) {
        //creo obstaculo
        let obstaculo = new Obstaculo(this.canvas, 150, 450, "images/jasmin.png");
        //lo añado al array
        this.obstaculos.push(obstaculo);
        this.iteracion = 0;
      }
      if(this.iteracion == (Math.ceil(Math.random() * 60) + 20)) {
        //creo obstaculo
        let obstaculo = new Obstaculo(this.canvas, 150, 450, "images/redObstacle.png");
        //lo añado al array
        this.obstaculos.push(obstaculo);
        this.iteracion = 0;
      }
      if(this.iteracion == (Math.ceil(Math.random() * 60) + 20)) {
        //creo obstaculo
        let obstaculo = new Obstaculo(this.canvas, 150, 450, "images/blueObstacle.png");
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
        juego.astronaut.jetpack();
        break;
        case "ArroDown":
        juego.astronaut.jetpack();
        break;
      case "ArrowLeft":
        juego.astronaut.changeColorRed();
        console.log("it happened");
        break;
      case "ArrowRight":
          juego.astronaut.changeColorBlue();
          console.log("it happened");
          break;
        
    }
  });
};
