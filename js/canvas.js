class Canvas {
    constructor(div,context){
        this.div = div;
        this.context = context;
        this.ctx = this.div.getContext(this.context);
    }

    initCanvas(){
        this.ctx.font = "25px Serif";
        this.ctx.fillStyle = "#4f77f0";
        this.ctx.fillText("Signez puis valider votre réservation", 15, 200);
    }

    // Arrete le dessin
    stopDraw() {
        this.onmousemove = null;
        isDrawing = false;
    }

    // Efface le canvas
    clearDraw() {
        console.log(this);
        this.ctx.clearRect(0, 0, this.div.width, this.div.height);
    }
    
}

let reservationButton = document.getElementById("reservation_button");
let validButton = document.getElementById("valid_button")
let divStation = document.getElementById("station");
let reservationCanvas = document.getElementById("reservation_canvas");

let posCursorX, posCursorY;
let isDrawing = false;
let firstDraw = true;

// Ajouter à la CONFIG
let canvas = new Canvas(document.getElementById("canvas"),"2d");
canvas.initCanvas();

let clearButton = document.getElementById("clear_button");

// function initCanvas() {
//     console.log(this);
//     ctx.font = "25px Serif";
//     ctx.fillStyle = "#4f77f0";
//     ctx.fillText("Signez puis valider votre réservation", 15, 200);
// }

// initCanvas();

//le canvas apparait lorsqu'on clique sur réserver
reservationButton.addEventListener("click", function () {
    if (document.getElementById("name").value === '' || document.getElementById("surname").value === '') {
        alert("Veuillez entrer un nom et un prénom");
    } else {
        divStation.style.display = "none";
        reservationCanvas.style.display = "flex";
        currentDisplayStationCanvas = "canvas";
        return canvasCoord = canvas.div.getBoundingClientRect();
    }
});


canvas.div.addEventListener("mousedown", function () {
    console.log("mousedown");
    canvas.div.onmousemove = function (e) {
        console.log(this);
        posCursorX = e.clientX - canvasCoord.left - ((canvas.width) * 0.1);
        posCursorY = e.clientY - canvasCoord.top;
        // le 1er dessin efface le texte
        if (firstDraw) {
            canvas.clearDraw();
            firstDraw = false;
        }
        // Au 1er clic, on commence le dessin et positionne le curseur
        if (!isDrawing) {
            this.ctx.beginPath();
            this.ctx.moveTo(posCursorX, posCursorY);
            isDrawing = true;
        }
        // Ensuite on dessine 
        else {
            this.ctx.lineTo(posCursorX, posCursorY);
            this.ctx.strokeStyle = "#4f77f0";
            this.ctx.lineWidth = 5;
            this.ctx.stroke();
        }
    };
});


canvas.div.addEventListener("mouseup", canvas.stopDraw);

canvas.div.addEventListener("mouseleave", canvas.stopDraw);

clearButton.addEventListener("click", canvas.clearDraw);

