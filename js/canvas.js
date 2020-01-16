class Canvas {
    constructor(div, context) {
        this.div = div;
        if (screen.width > 414) {
            this.div.width = 375;
            this.div.height = 375;
        }
         else {
            this.div.width = 225;
            this.div.height = 300;
        }
        this.context = context;
        this.ctx = this.div.getContext(this.context);
        this.canvasCoord = this.div.getBoundingClientRect();
        this.cursorPosX;
        this.cursorPosY;
        this.isDrawing = false;
        this.firstDraw = true;


        this.reservationButton = document.getElementById("reservation_button");
        this.validButton = document.getElementById("valid_button")
        this.divStation = document.getElementById("station");
        this.reservationInfos = document.getElementById("reservation_infos");
        this.divReservationCanvas = document.getElementById("reservation_canvas");
        this.divStationCanvas = document.getElementById("station_canvas");
        this.clearButton = document.getElementById("clear_button");
        this.divName = document.getElementById("name");
        this.divSurname = document.getElementById("surname");
        this.validButton = document.getElementById("valid_button");
        this.divMap = document.getElementById("map");

        //le canvas apparait lorsqu'on clique sur réserver
        this.reservationButton.addEventListener("click", this.showCanvas.bind(this));

        // event
        this.events();

        this.initCanvas();

    }

    // Créé le fond du canvas
    initCanvas() {
        if (screen.width > 414) {
            this.ctx.font = "23px Serif";
            this.ctx.fillStyle = "#4f77f0";
            this.ctx.fillText("Signez puis valider votre réservation", 15, 200);
        }
         else {
            this.ctx.font = "13px Serif";
            this.ctx.fillStyle = "#4f77f0";
            this.ctx.fillText("Signez puis valider votre réservation", 12, 150);
        }

    }

    showCanvas() {
        if (this.divName.value === '' || this.divSurname.value === '') {
            alert("Veuillez entrer un nom et un prénom");
        } else {
            this.divStation.style.display = "none";
            this.divReservationCanvas.style.display = "flex";
            currentDisplayStationCanvas = "canvas";
            return this.canvasCoord = this.div.getBoundingClientRect();
        }
    }

    cursorPosition(e) {
        this.canvasCoord = this.div.getBoundingClientRect();
        this.cursorPosX = e.clientX - this.canvasCoord.left;
        this.cursorPosY = e.clientY - this.canvasCoord.top;
    }

    // Arrete le dessin
    stopDraw() {
        this.div.onmousemove = null;
        this.isDrawing = false;
    }

    // Efface le canvas
    clearDraw() {
        this.ctx.clearRect(0, 0, this.div.width, this.div.height);
    }

    onMouseMove(e) {
        this.cursorPosition(e);

        // le 1er dessin efface le texte
        if (this.firstDraw) {
            this.clearDraw();
            this.firstDraw = false;
        }
        // Au 1er clic, on commence le dessin et positionne le curseur
        if (!this.isDrawing) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.cursorPosX, this.cursorPosY);
            this.isDrawing = true;
        }
        // Ensuite on dessine 
        else {
            this.ctx.lineTo(this.cursorPosX, this.cursorPosY);
            this.ctx.strokeStyle = "#4f77f0";
            this.ctx.lineWidth = 5;
            this.ctx.stroke();
        }
    }

    onMouseDown() {
        this.div.onmousemove = this.onMouseMove.bind(this);
    }

    events() {
        this.div.addEventListener("mousedown", this.onMouseDown.bind(this));

        this.validButton.addEventListener("click", this.booking.bind(this));

        this.clearButton.addEventListener("click", this.clearDraw.bind(this));

        this.div.addEventListener("mouseup", this.stopDraw.bind(this));

        this.div.addEventListener("mouseleave", this.stopDraw.bind(this));

    }

    booking() {
        let stationName = document.getElementById("station_name").textContent;
        let surnameValue = this.divSurname.value;
        let nameValue = this.divName.value;
        let setTime = Date.now();

        let booking = new Booking(stationName, nameValue, surnameValue, setTime, CONFIG.reservationTime);

        // Enregistrement des données
        booking.setBooking();

        // Réinitialisation de la précédente réservation
        clearInterval(countdown);
        this.reservationInfos.innerHTML = '';
        this.reservationInfos.style.display = "none";


        // Affichage de la réservation
        booking.showReservationInfos();

        // Modification affichage div station_canvas
        currentDisplayStationCanvas = "station";
        this.divStationCanvas.style.display = "none";
        this.divStation.style.display = "block";
        this.divReservationCanvas.style.display = "none";

        if (screen.width > 414) {
            this.divMap.style.width = "100%";
        }
        //  else {
        //     this.divMapstation.style.flexDirection = "column";
        // }

        //Réinitialisation Canvas
        this.firstDraw = true;
        this.clearDraw();
        this.initCanvas();

        booking.timer();

    }
}