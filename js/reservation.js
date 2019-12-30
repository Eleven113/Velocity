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
    console.log(setTime);
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
    clearDraw();
    initCanvas();

    booking.timer();

});

//Timer 
// function timer() {
//     booking.showRemainingTime(booking);
//     timerSet = setInterval(function(that) {
//         booking.showRemainingTime(that)
//     }, 1000, booking);
// }


// function funcReservationInfos() {

//     let divTimer = document.getElementById("timer");
//     if (remainingTime > 0) {
//         let minutes, secondes;
//         minutes = Math.trunc(remainingTime / 60);
//         minutes = ("0" + minutes).slice(-2);
//         secondes = remainingTime % 60;
//         secondes = ("0" + secondes).slice(-2);
//         remainingTime--;
//         divTimer.innerHTML = minutes + ':' + secondes;
//         sessionStorage.setItem("temps", remainingTime);
//     } else {
//         clearInterval(timerSet);
//         reservationInfos.innerHTML = '';
//         reservationInfos.style.display = "none";
//     }

// }

//Affichage infos réservation si réservation en cours
window.addEventListener("load", function () {
    console.log("load");
    let setTime = sessionStorage.getItem("setTime");
    console.log(setTime);
    // if (remainingTime > 0) {
    //     stationName = sessionStorage.getItem("station");
    //     sessionStorage.getItem("station");
    //     CreateReservationInfos(stationName, identityJson.name, identityJson.surname);
    //     timerSet = setInterval(funcReservationInfos, 1000);
    //     funcReservationInfos();

    // }
});