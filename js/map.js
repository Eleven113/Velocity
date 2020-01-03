let map;
let divMap = document.getElementById("map");
let divStationCanvas = document.getElementById("station_canvas");
let currentDisplayStationCanvas = "";
let divMapstation = document.getElementById("mapstation");

// function getApiStations() {
//     let array = new Array();
//     ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Amiens&apiKey=81391ed9adfd937442c39a2490a0afa6d51d29e9", function (reponse) {
//         // récupération de la liste des stations
//         let listeStations = JSON.parse(reponse);

//         for (let station of listeStations) {
//             let newStation = new Station(station.name, station.address, station.position, parseInt(station.available_bike_stands), parseInt(station.available_bikes), station.status, station.last_update)
//             array.push(newStation);
//         }
//     });
//     return array;
// }

function initMap() {
    let stations = [];
    let markers = [];
    let marker;

    // Appel à l'API Station, Construction et logique lié à la carte
    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Amiens&apiKey=81391ed9adfd937442c39a2490a0afa6d51d29e9", function (reponse) {
        // récupération de la liste des stations
        let listeStations = JSON.parse(reponse);
        // Création des objets station dans l'array stations
        for (let station of listeStations) {
            let newStation = new Station(station.name, station.address, station.position, parseInt(station.available_bike_stands), parseInt(station.available_bikes), station.status, station.last_update)
            stations.push(newStation);
        }
        // Création de la google map
        map = new google.maps.Map(CONFIG.map.div, {
            zoom: CONFIG.map.zoom,
            center: CONFIG.map.center
        });

        markers = stations.map(function (station) {

            marker = new google.maps.Marker({
                position: station.position,
                icon: station.defineMarker().icon,
                title: station.defineMarker().title,
                map: map
            });

            // Création de la div station_canvas lors du clic sur le marqueur
            google.maps.event.addListener(marker, 'click', function () {
                //Affiche différent si écran mobile ou si écran desktop/tablette
                currentDisplayStationCanvas = "station";
                divStationCanvas.style.display = "block";

                if (screen.width > 414) {
                    divMap.style.width = "60%";
                } else {

                    divMapstation.style.flexDirection = "column";
                }
                // Ajout des informations concernant la station
                let spanName = document.getElementById("station_name");
                spanName.textContent = station.name.slice(4);
                let spanAddress = document.getElementById("station_address");
                spanAddress.textContent = station.address;
                let spanAvailableBikes = document.getElementById("station_available_bikes");
                spanAvailableBikes.textContent = station.availableBikes;
                let spanAvailableStands = document.getElementById("station_available_stands");
                spanAvailableStands.textContent = station.availableBikeStands;

                let divReservationForm = document.getElementById("reservation_form");
                let divNoBikes = document.getElementById("no_bikes");

                // Affichage différent s'il n'y a pas de vélo sur la station
                if (station.available_bikes === 0) {
                    divReservationForm.style.display = "none";
                    divNoBikes.style.display = "block";
                } else {
                    divReservationForm.style.display = "block";
                    divNoBikes.style.display = "none";
                }

                // Affiche les données enregistrées dans localStorage dans les champs du formulaire
                if (localStorage["identity"]) {
                    let identityObj = localStorage.getItem("identity");
                    let identityStr = JSON.parse(identityObj);
                    let surname = document.getElementById("surname");
                    let name = document.getElementById("name");
                    surname.value = identityStr.surname;
                    name.value = identityStr.name;
                }

            });

            return marker;
        });

        //
        markerCluster = new MarkerClusterer(map, markers, {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });
    });
}

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