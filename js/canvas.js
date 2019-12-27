let reservationButton = document.getElementById("reservation_button");
let validButton = document.getElementById("valid_button")
let divStation = document.getElementById("station");
let reservationCanvas = document.getElementById("reservation_canvas");

//le canvas apparait lorsqu'on clique sur réserver
reservationButton.addEventListener("click", function () {
    if (document.getElementById("name").value === '' || document.getElementById("surname").value === '') {
        alert("Veuillez entrer un nom et un prénom");
    } else {
        divStation.style.display = "none";
        reservationCanvas.style.display = "flex";
        currentDisplayStationCanvas = "canvas";
        return canvasCoord = canvas.getBoundingClientRect();
    }
});


let posCursorX, posCursorY;
let draw = false;
let firstDraw = true;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let clearButton = document.getElementById("clear_button");

function initCanvas() {
    ctx.font = "25px Serif";
    ctx.fillStyle = "#4f77f0";
    ctx.fillText("Signez puis valider votre réservation", 15, 200);
}

initCanvas();

canvas.addEventListener("mousedown", function () {

    canvas.onmousemove = function (e) {

        posCursorX = e.clientX - canvasCoord.left - ((canvas.width) * 0.1);
        posCursorY = e.clientY - canvasCoord.top;
        // le 1er dessin efface le texte
        if (firstDraw) {
            clearDraw();
            firstDraw = false;
        }
        // Au 1er clic, on commence le dessin et positionne le curseur
        if (!draw) {
            ctx.beginPath();
            ctx.moveTo(posCursorX, posCursorY);
            draw = true;
        }
        // Ensuite on dessine 
        else {
            ctx.lineTo(posCursorX, posCursorY);
            ctx.strokeStyle = "#4f77f0";
            ctx.lineWidth = 5;
            ctx.stroke();
        }
    };
});


canvas.addEventListener("mouseup", stopDraw);

canvas.addEventListener("mouseleave", stopDraw);

clearButton.addEventListener("click", clearDraw);

// Arrete le dessin
function stopDraw() {
    canvas.onmousemove = null;
    draw = false;
}

// Efface le canvas
function clearDraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
