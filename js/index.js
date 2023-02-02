
window.onload = () => {
  //cuando haya cargado window ejecuta código

  // const btn = document.getElementById('titleGame');
  // btn.addEventListener('click', () => {
  //   btn.style.display = 'none';
  // });

  const TOP_LIMIT_colorNAUT = 200;
  const DOWN_LIMIT_colorNAUT = 550;

  class colornaut {
    constructor() {
      this.x = 20;
      this.y = 250;
      this.w = 80;
      this.h = 90;
      this.propulsion = 2;
      this.colornautImg = new Image();
      this.colornautImg.src = "images/astro_red.png";
      this.astronautColor = "red";
      this.isTransparent = false;
      this.damaged=false;
    }
    print(ctx) {
      ctx.drawImage(this.colornautImg, this.x, this.y, this.w, this.h);
    }
    
    jetpackUp() {
      if(this.y <= TOP_LIMIT_colorNAUT) this.y = TOP_LIMIT_colorNAUT;
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
      if(this.y >= DOWN_LIMIT_colorNAUT) this.y = DOWN_LIMIT_colorNAUT;
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
        this.colornautImg.src = "images/astro_red.png";
      }
    changeColorBlue(){
        this.colornautImg.src = "images/astro_blue.png";
        this.astronautColor = "blue";
    }
    changeColorOrange(){
      this.colornautImg.src = "images/astro_orangeFinal.png";
    }
    changeColorGrey(){
        this.colornautImg.src = "images/astro_grey-final.png";
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
      this.vel +=20;
      console.log("fiuuum")
    }

    
  }
  
  class Juego {
    constructor() {
      this.canvas = document.getElementById("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.fondoImg = document.createElement("img");
      // this.fondoImg.src = "images/backgroundSpace.jpg";
      this.astronaut = new colornaut();
      this.obstaculos = [];
      this.score = 0;
      this.intervalId = undefined;
      this.iteracion = 0;
      this.lifes = 3;
    }
    start() {      
      const audioBackground = new Audio("audio.mp3");
      audioBackground.volume = 0.2;
      audioBackground.play();
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
      
      setTimeout(()=>{this.stop()},60000)
    }

    stop() {
      if(this.lifes<=0){
        if(this.intervalId) clearInterval(this.intervalId);
      const rst = document.getElementById("restartGameMenu");
      rst.style.display = "inline";
      rst.addEventListener('click', ()=>{  location.reload()})
      }
      if(this.lifes>0){
        if(this.intervalId) clearInterval(this.intervalId);
      const won = document.getElementById("youwon");
      won.style.display = "inline";                                                                                                    
      won.addEventListener('click', ()=>{  location.reload()})
      }
    }
      
    damage(){
      if(this.lifes>1){
        if(this.astronaut.damaged == false){
        this.astronaut.damaged = true
        this.lifes -=1
      }
      if(this.astronaut.astronautColor == "red"){
        this.astronaut.changeColorGrey()
      }
      if(this.astronaut.astronautColor == "blue"){
        this.astronaut.changeColorGrey()
      }    
      setTimeout(()=>{this.astronaut.damaged=false}, 1000)
      console.log(this.lifes)
      }
      else if(this.lifes == 1){
        if(this.astronaut.damaged == false){
          this.astronaut.damaged = true
          this.lifes -=1
          }
      }
      else{
        const audioPlof = new Audio("plof.mp3");
        audioPlof.play();
        this.astronaut.colornautImg.src = "images/plof.png";
        this.astronaut.w = 100;
        this.astronaut.h = 100;

        setTimeout(()=>{this.stop()},100) 
      }

      if(this.lifes==2){
        vds.innerHTML = "LIVES: 002";
      }
      if(this.lifes==1){
        vds.innerHTML = "LIVES: 001";
      }
      if(this.lifes<=0){
        vds.innerHTML = "YOU DIED";
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
        let obstaculoMeteorito = new Obstaculo(this.canvas, Math.ceil((Math.random()*350)+200), 150, 60, ((Math.random()*10)+10), "images/jasmin.png", "meteor");
        this.obstaculos.push(obstaculoMeteorito);
        this.iteracion = 0;
      }

      if(this.iteracion == (Math.ceil(Math.random() * 50) + 50)) {
        let obstaculoRojo = new Obstaculo(this.canvas, 10, 200, 615, 6, "images/redObstacle.png", "redStarship");
        this.obstaculos.push(obstaculoRojo);
        this.iteracion = 0;
      }
      if(this.iteracion == (Math.ceil(Math.random() * 50) + 50)) {
        let obstaculoAzul = new Obstaculo(this.canvas, 10, 200, 615, 6, "images/blueObstacle.png", "blueStarship");
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

  // startGame();
  

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
      case "Space":
        console.log("Space");
        break;
    }
  });

// function startingBackground() {
//   this.canvas = document.getElementById("canvas");
//   this.ctx = this.canvas.getContext("2d");
//   this.fondoImg = document.createElement("img");
//   this.fondoImg.src = "images/backgroundSpace.jpg";
// }
/////////
const vds = document.getElementById("livesCount");
/////
const btn = document.getElementById('titleGame');
  btn.addEventListener('click', () => {
    btn.style.display = 'none';
    // vds.style.display = 'inline';
    // vds.innerHTML = "lives: * *";

    startGame();
  });

//obstaculos
}




