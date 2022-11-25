const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const particleArray = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let hue = 0;

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i=0; i < 20; i++){
        particleArray.push(new Particle());
    }
});

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i=0; i < 10; i++){
        particleArray.push(new Particle());
    }
});

class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 10 + 1;
        this.speedX = Math.random() * 5 - 2.5; //random number between 2.5 and -2.5
        this.speedY = Math.random() * 5 - 2.5; //random number between 2.5 and -2.5
        this.colour = 'hsl(' + hue + ', 100%, 50%)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2){
            this.size -= 0.1;
        }
    }
    draw() {
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }
}

function handleParticles() {
    for(let i = 0; i < particleArray.length; i++){
        particleArray[i].update();
        particleArray[i].draw();
        for (let j = i; j < particleArray.length; j++){
            const dx = particleArray[i].x - particleArray[j].x;
            const dy = particleArray[i].y - particleArray[j].y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < 50){ // minimum distance between particles to draw a line
                ctx.beginPath();
                ctx.strokeStyle = particleArray[i].colour;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particleArray[i].x, particleArray[i].y);
                ctx.lineTo(particleArray[j].x, particleArray[j].y);
                ctx.stroke();
            }
        }
        if (particleArray[i].size < 0.3){
            particleArray.splice(i, 1);
        }
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue+=3;
    requestAnimationFrame(animate);
}
animate();