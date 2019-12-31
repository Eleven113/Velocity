let timerSet;
let reservationInfos = document.getElementById("reservation_infos");
let booking;
let identityObj = localStorage.getItem("identity");
let identityJson = JSON.parse(identityObj);


//Réservation
validButton.addEventListener("click", function () {


    let stationName = document.getElementById("station_name").textContent;
    let surnameValue = document.getElementById("surname").value;
    let nameValue = document.getElementById("name").value;
    let setTime = Date.now();

    booking = new Booking(stationName, nameValue, surnameValue, setTime, CONFIG.reservationTime);

    // Enregistrement des données
    booking.setBooking();

    //Réinitialisation de la précédente réservation
    clearInterval(timerSet);
    reservationInfos.innerHTML = '';
    reservationInfos.style.display = "none";


    // Affichage de la réservation
    booking.showReservationInfos();

    // Modification affichage div station_canvas
    currentDisplayStationCanvas = "station";
    divStationCanvas.style.display = "none";
    divStation.style.display = "block";
    reservationCanvas.style.display = "none";

    if (screen.width > 414) {
        divMap.style.width = "100%";
    } else {
        divMapstation.style.flexDirection = "column";
    }

    //Réinitialisation Canvas
    firstDraw = true;
    canvas.clearDraw();
    canvas.initCanvas();

    booking.timer();

});


//Affichage infos réservation si réservation en cours
window.addEventListener("load", function () {
    let setTime = sessionStorage.getItem("setTime");
    let sessionIdentityStr = sessionStorage.getItem("identity");
    let sessionIdentityObj = JSON.parse(sessionIdentityStr);
    let remainingTime = Math.round(CONFIG.reservationTime - (Date.now() / 1000 - setTime / 1000));

    if (remainingTime > 0) {
        stationName = sessionStorage.getItem("station");
        booking = new Booking(stationName, sessionIdentityObj.name, sessionIdentityObj.surname, setTime, CONFIG.reservationTime);
        booking.setBooking();
        booking.showReservationInfos();
        booking.timer();

    } else {
        sessionStorage.clear();
    }
});