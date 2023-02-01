lifeLossAnimation(){

 const images = [new Image(), new Image(), new Image()];

images[0].src = 
images[1].src = 
images[2].src = 

let i = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(images[i], 0, 0);
  i = (i + 1) % images.length;
}

setInterval(draw, 1000);

    }