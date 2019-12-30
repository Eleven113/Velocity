let map;
let divMap = document.getElementById("map");
let divStationCanvas = document.getElementById("station_canvas");
let currentDisplayStationCanvas = "";
let divMapstation = document.getElementById("mapstation");

// function initMap() {
//     // Création Carte avec définition du centre
//     let cathedrale = {
//         lat: 49.895,
//         lng: 2.299
//     };
//     let map = new google.maps.Map(divMap, {
//         zoom: 13,
//         center: cathedrale
//     });

//     ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Amiens&apiKey=81391ed9adfd937442c39a2490a0afa6d51d29e9", function (reponse) {
//         // récupération de la liste des stations
//         let listeStations = JSON.parse(reponse);
//         // Création d'un marqueur sur la carte pour chaque station
//         let markers = listeStations.map(function (station) {
//             // Récupération du nom de la station sans son numéro
//             let stationName = station.name.slice(4);
//             // Calcul du pourcentage de vélos restants
//             let stationVeloPercent = (station.available_bike_stands / station.bike_stands) * 100;
//             let stationIcone;
//             let marker;
//             //Vérification si la station est ouverture
//             if (station.status === "OPEN") {
//                 // Affectation d'une icone en fonction du pourcentage de vélos restants
//                 if (stationVeloPercent === 100) {
//                     stationIcone = "img/station_ico_100.png";
//                 } else if (stationVeloPercent < 100 && stationVeloPercent >= 75) {
//                     stationIcone = "img/station_ico_75.png";
//                 } else if (stationVeloPercent < 75 && stationVeloPercent >= 50) {
//                     stationIcone = "img/station_ico_50.png";
//                 } else if (stationVeloPercent < 50 && stationVeloPercent >= 25) {
//                     stationIcone = "img/station_ico_25.png";
//                 } else if (stationVeloPercent < 25 && stationVeloPercent >= 0) {
//                     stationIcone = "img/station_ico_0.png";
//                 }

//                 marker = new google.maps.Marker({
//                     position: station.position,
//                     title: stationName,
//                     icon: new google.maps.MarkerImage(stationIcone)
//                 });

//                 // Création de la div station_canvas lors du clic sur le marqueur
//                 google.maps.event.addListener(marker, 'click', function () {
//                     //Affiche différent si écran mobile ou si écran desktop/tablette
//                     currentDisplayStationCanvas = "station";
//                     divStationCanvas.style.display = "block";

//                     if (screen.width > 414) {
//                         divMap.style.width = "60%";
//                     } else {

//                         divMapstation.style.flexDirection = "column";
//                     }
//                     // Ajout des informations concernant la station
//                     let spanName = document.getElementById("station_name");
//                     spanName.textContent = stationName;
//                     let spanAddress = document.getElementById("station_address");
//                     spanAddress.textContent = station.address;
//                     let spanAvailableBikes = document.getElementById("station_available_bikes");
//                     spanAvailableBikes.textContent = station.available_bikes;
//                     let spanAvailableStands = document.getElementById("station_available_stands");
//                     spanAvailableStands.textContent = station.available_bike_stands;

//                     let divReservationForm = document.getElementById("reservation_form");
//                     let divNoBikes = document.getElementById("no_bikes");

//                     // Affichage différent s'il n'y a pas de vélo sur la station
//                     if (station.available_bikes === 0) {
//                         divReservationForm.style.display = "none";
//                         divNoBikes.style.display = "block";
//                     } else {
//                         divReservationForm.style.display = "block";
//                         divNoBikes.style.display = "none";
//                     }

//                     // Affiche les données enregistrées dans localStorage dans les champs du formulaire
//                     if (localStorage["identity"]) {
//                         let identityObj = localStorage.getItem("identity");
//                         let identityStr = JSON.parse(identityObj);
//                         let surname = document.getElementById("surname");
//                         let name = document.getElementById("name");
//                         surname.value = identityStr.surname;
//                         name.value = identityStr.name;
//                     }

//                 });

//             } else {

//                 marker = new google.maps.Marker({
//                     position: station.position,
//                     title: "Cette station est actuellement fermée",
//                     icon: new google.maps.MarkerImage("img/station_ico_closed.png")
//                 });

//             }


//             return marker;
//         });

//         let markerCluster = new MarkerClusterer(map, markers, {
//             imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
//         });

//     });




// };

// Event sur clic de fermeture de la div station_canvas
let stationClose = document.getElementById("station_close");


stationClose.addEventListener("click", function () {

    if (currentDisplayStationCanvas === "station") {
        divStationCanvas.style.display = "none";
        divMap.style.width = "100%";
    }

    if (currentDisplayStationCanvas === "canvas") {
        divStation.style.display = "block";
        reservationCanvas.style.display = "none";
        currentDisplayStationCanvas = "station";
    }
})
