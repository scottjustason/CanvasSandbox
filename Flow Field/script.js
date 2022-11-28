const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let hue = 0;
let scale = 10;
let count = 50000;

ctx.lineWidth = 0.3;

let a = Math.random() * 4 - 2; 
let b = Math.random() * 4 - 2; 
let c = Math.random() * 4 - 2; 
let d = Math.random() * 4 - 2; 

canvas.addEventListener('click', function(event){
    cancelAnimationFrame(render);
});

let points = [];
for(let y = 0; y < height; y += 5){
    points.push({
        x: 0,
        y: y,
        vx: 0,
        vy: 0
    })
}

render();

function render(){
    for(let i = 0; i < points.length; i++){
        let p = points[i];
        let value = getValue(p.x, p.y);
        p.vx += Math.cos(value) * 0.3;
        p.vy += Math.sin(value) * 0.3;

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        p.x += p.vx;
        p.y += p.vy;
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        p.vx *= 0.99;
        p.vy *= 0.99;

        if(p.x > width) p.x = 0;
        if(p.y > height) p.y = 0;
        if(p.x < 0) p.x = width;
        if(p.y < 0) p.y = height;
    }
    ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
    hue+=5;
    requestAnimationFrame(render);
}

function getValue(x, y) {
    //return (x + y) * 0.001 * Math.PI * 2;
    return (Math.sin(x * 0.01) + Math.cos(y * 0.005)) * Math.PI * 2;
}

// function drawGrid(){
//     for(let i = 0; i < width; i+=scale){
//         for(let j = 0; j < height; j+=scale){
//             let value = getValue(i, j);
//             ctx.save();
//             ctx.translate(i, j);
//             render(value)
//             ctx.restore();
//         }
//     }
// }
// // drawGrid();

// function render(value){
//     ctx.rotate(value);
//     ctx.beginPath();
//     ctx.moveTo(0, 0);
//     ctx.lineTo(scale, 0);
//     ctx.stroke();
// }


