class Canvas {
    constructor(div,context){
        this.div = div;
        this.context = context;
        this.ctx = this.div.getContext(this.context);
    }
    // Créé le fond du canvas
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
         this.ctx.clearRect(0, 0, this.div.width, this.div.height);
    }
    
}

let reservationButton = document.getElementById("reservation_button");
let validButton = document.getElementById("valid_button")
let divStation = document.getElementById("station");
let reservationCanvas = document.getElementById("reservation_canvas");
let clearButton = document.getElementById("clear_button");
let posCursorX, posCursorY;
let isDrawing = false;
let firstDraw = true;

// Ajouter à la CONFIG
let canvas = new Canvas(document.getElementById(CONFIG.canvas.div),CONFIG.canvas.context);
canvas.initCanvas();

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

// Logique de fonctionnement du dessin dans le canvas
canvas.div.addEventListener("mousedown", function () {
    canvas.div.onmousemove = function (e) {
        posCursorX = e.clientX - canvasCoord.left - ((canvas.div.width) * 0.1);
        posCursorY = e.clientY - canvasCoord.top;
        // le 1er dessin efface le texte
        if (firstDraw) {
            canvas.clearDraw();
            firstDraw = false;
        }
        // Au 1er clic, on commence le dessin et positionne le curseur
        if (!isDrawing) {
            canvas.ctx.beginPath();
            canvas.ctx.moveTo(posCursorX, posCursorY);
            isDrawing = true;
        }
        // Ensuite on dessine 
        else {
            canvas.ctx.lineTo(posCursorX, posCursorY);
            canvas.ctx.strokeStyle = "#4f77f0";
            canvas.ctx.lineWidth = 5;
            canvas.ctx.stroke();
        }
    };
});

canvas.div.addEventListener("mouseup", canvas.stopDraw);

canvas.div.addEventListener("mouseleave", canvas.stopDraw);

clearButton.addEventListener("click", canvas.clearDraw);

