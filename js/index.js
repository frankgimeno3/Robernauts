
window.onload = () => {
  //cuando haya cargado window ejecuta código

  const btn = document.getElementById('titleGame');
  btn.addEventListener('click', () => {
    btn.style.display = 'none';
  });

    const TOP_LIMIT_ROBERNAUT = 100;
    const DOWN_LIMIT_ROBERNAUT = 450;

  class Robernaut {
    constructor() {
      this.x = 20;
      this.y = 250;
      this.w = 60;
      this.h = 90;
      this.propulsion = 2;
      this.robernautImg = new Image();
      this.robernautImg.src = "images/astro_red.png";
      this.astronautColor = "red";
      this.isTransparent = false;
      this.damaged=false;
    }
    print(ctx) {
      ctx.drawImage(this.robernautImg, this.x, this.y, this.w, this.h);
    }
    
    jetpackUp() {
      if(this.y <= TOP_LIMIT_ROBERNAUT) this.y = TOP_LIMIT_ROBERNAUT;
      this.y -= this.propulsion;
      this.y -= this.propulsion;
      this.y -= this.propulsion;
      this.y -= this.propulsion;
      this.y -= this.propulsion;
      this.y -= this.propulsion;
      this.y -= this.propulsion;
      this.y -= this.propulsion;
      this.y -= this.propulsion;
      this.y -= this.propulsion;

    }
    jetpackDown() {
      if(this.y >= DOWN_LIMIT_ROBERNAUT) this.y = DOWN_LIMIT_ROBERNAUT;
      this.y += this.propulsion;
      this.y += this.propulsion;
      this.y += this.propulsion;
      this.y += this.propulsion;
      this.y += this.propulsion;
      this.y += this.propulsion;
      this.y += this.propulsion;
      this.y += this.propulsion;
    }

    changeColorRed(){
        this.astronautColor = "red";
        this.robernautImg.src = "images/astro_red.png";
      }
    changeColorBlue(){
        this.robernautImg.src = "images/astro_blue.png";
        this.astronautColor = "blue";
    }
  }

  class Obstaculo {
    constructor(canvas, y, w, h,vel, src, type) {
      this.y = y;
      this.w = w; 
      this.x = 1500;
      this.h = h;
      this.vel = vel;
      this.obstacleImg = new Image();
      this.obstacleImg.src = src;
      this.type = type;
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
      this.obstaculos = [];
      this.score = 0;
      this.intervalId = undefined;
      this.iteracion = 0;
      this.lifes = 3;
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

    damage(){
      if(this.astronaut.damaged == false){
        this.astronaut.damaged = true
        this.lifes -=1
        setTimeout(()=>{this.astronaut.damaged=false}, 350)
      }
      console.log(this.lifes)
      if(this.lifes == 0){
        this.stop()
      }
      
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
        let obstaculoMeteorito = new Obstaculo(this.canvas, Math.ceil((Math.random()*300)+100), 150, 60, ((Math.random()*10)+10), "images/jasmin.png", "meteor");
        this.obstaculos.push(obstaculoMeteorito);
        this.iteracion = 0;
      }

      if(this.iteracion == (Math.ceil(Math.random() * 50) + 50)) {
        let obstaculoRojo = new Obstaculo(this.canvas, 0, 200, 600, 6, "images/redObstacle.png", "redStarship");
        this.obstaculos.push(obstaculoRojo);
        this.iteracion = 0;
      }
      if(this.iteracion == (Math.ceil(Math.random() * 50) + 50)) {
        let obstaculoAzul = new Obstaculo(this.canvas, 0, 200, 600, 6, "images/blueObstacle.png", "blueStarship");
        this.obstaculos.push(obstaculoAzul);
        this.iteracion = 0;
      }
      if(this.iteracion>90){ this.iteracion = 0;}
      this.obstaculos.forEach(obstaculo => {
        obstaculo.move();
          // controlo colisiones
        if(!(this.astronaut.x + this.astronaut.w < obstaculo.x+80 || this.astronaut.x > obstaculo.x+obstaculo.w-80)){
          if(!(this.astronaut.y+this.astronaut.h < obstaculo.y || this.astronaut.y > obstaculo.y+obstaculo.h)){
            if(this.astronaut.astronautColor == "blue"){
              if(obstaculo.type == "redStarship" || obstaculo.type == "meteor"){
                console.log("PETA BLUE")
                this.damage();}
            }
            if(this.astronaut.astronautColor == "red"){
              if(obstaculo.type == "blueStarship" || obstaculo.type == "meteor"){
                console.log("PETA RED")
                this.damage();}
            }
          }
        }
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




