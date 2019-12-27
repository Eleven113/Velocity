let timerSet;
let reservationInfos = document.getElementById("reservation_infos");
let remainingTime;

let identityObj = localStorage.getItem("identity");
let identityJson = JSON.parse(identityObj);


//Réservation
validButton.addEventListener("click", function () {


    let stationName = document.getElementById("station_name").textContent;
    let surnameValue = document.getElementById("surname").value;
    let nameValue = document.getElementById("name").value;
    ReservationSet(stationName, surnameValue, nameValue);


    //Réinitialisation de la précédente réservation
    clearInterval(timerSet);
    reservationInfos.innerHTML = '';
    reservationInfos.style.display = "none";


    // Affichage de la réservation
    CreateReservationInfos(stationName, nameValue, surnameValue);

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

    timer();

    });


    // Enregistre le nom et le prénom dans le localStorage
    function ReservationSet(stationName, surname, name) {
        if (localStorage) {
            let identityObj = {
                surname: surname,
                name: name
            }

            let identityStr = JSON.stringify(identityObj);
            sessionStorage.setItem("station", stationName);
            localStorage.setItem("identity", identityStr);
        }
    };



    // Créé la confirmation de réservation dans une div située sous la map
    function CreateReservationInfos(stationName, name, surname) {
        reservationInfos.style.display = "flex";
        reservationInfos.innerHTML = '<div>Vélo reservé à la station <span class="reservation_data">' + stationName + '</span> par <span class="reservation_data">' + name + ' ' + surname + '</span></div><br><div>Temps restant : <span id="timer" class="reservation_data"></span></div>';

    }

    //Timer 
    function timer() {
        remainingTime = 1200;
        funcReservationInfos();
        timerSet = setInterval(funcReservationInfos, 1000);
    }


    function funcReservationInfos() {

        let divTimer = document.getElementById("timer");
        if (remainingTime > 0) {
            let minutes, secondes;
            minutes = Math.trunc(remainingTime / 60);
            minutes = ("0" + minutes).slice(-2);
            secondes = remainingTime % 60;
            secondes = ("0" + secondes).slice(-2);
            remainingTime--;
            divTimer.innerHTML = minutes + ':' + secondes;
            sessionStorage.setItem("temps", remainingTime);
        } else {
            clearInterval(timerSet);
            reservationInfos.innerHTML = '';
            reservationInfos.style.display = "none";
        }

    }

    //Affichage infos réservation si réservation en cours
    window.addEventListener("load", function () {
        console.log("load");
        remainingTime = sessionStorage.getItem("temps");
        if (remainingTime > 0) {
            stationName = sessionStorage.getItem("station");
            sessionStorage.getItem("station");
            CreateReservationInfos(stationName, identityJson.name, identityJson.surname);
            timerSet = setInterval(funcReservationInfos, 1000);
            funcReservationInfos();

        }
    });