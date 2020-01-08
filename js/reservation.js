
// let identityObj = localStorage.getItem("identity");
// let identityJson = JSON.parse(identityObj);

// let validButton = document.getElementById("valid_button");
// let divStation = document.getElementById("station");
// let divMap = document.getElementById("map");

// //Réservation
// validButton.addEventListener("click", function () {


//     let stationName = document.getElementById("station_name").textContent;
//     let surnameValue = document.getElementById("surname").value;
//     let nameValue = document.getElementById("name").value;
//     let divReservationCanvas = document.getElementById("reservation_canvas");
//     let divStationCanvas = document.getElementById("station_canvas");
//     let setTime = Date.now();

//     booking = new Booking(stationName, nameValue, surnameValue, setTime, CONFIG.reservationTime);

//     // Enregistrement des données
//     booking.setBooking();

//     //Réinitialisation de la précédente réservation
//     clearInterval(timerSet);
//     reservationInfos.innerHTML = '';
//     reservationInfos.style.display = "none";


//     // Affichage de la réservation
//     booking.showReservationInfos();

//     // Modification affichage div station_canvas
//     currentDisplayStationCanvas = "station";
//     divStationCanvas.style.display = "none";
//     divStation.style.display = "block";
//     divReservationCanvas.style.display = "none";

//     if (screen.width > 414) {
//         divMap.style.width = "100%";
//     } else {
//         divMapstation.style.flexDirection = "column";
//     }

//     //Réinitialisation Canvas
//     firstDraw = true;
//     canvas.clearDraw();
//     canvas.initCanvas();

//     booking.timer();

// });