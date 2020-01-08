class MapManager {
    constructor(div, center, zoom) {
        this.div = div;
        this.center = center;
        this.zoom = zoom;
        this.map;
        this.divMap = document.getElementById("map");
        this.divStationCanvas = document.getElementById("station_canvas");
        this.divMapstation = document.getElementById("mapstation");
        this.divStation = document.getElementById("station");
        this.divReservationCanvas = document.getElementById("reservation_canvas");
        this.stations = [];
        this.markers;
        this.marker;
        this.markerCluster;
        this.listeStations;
        this.stationClose = document.getElementById("station_close");

        // Logique de fermeture de la div station_canvas
        this.stationClose.addEventListener("click", this.closingDivStationcanvas.bind(this));

        // Affichage la réservation en cours au refresh
        window.addEventListener("load", this.showCurrentReservation);

    }

    createMap() {

        // Appel à l'API Station, Construction et logique lié à la carte
        ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Amiens&apiKey=81391ed9adfd937442c39a2490a0afa6d51d29e9", function (reponse) {
            // Récupération de la liste des stations
            this.listeStations = JSON.parse(reponse);

            // Création de Stations
            this.createStations();

            // Création de la google map
            this.newGoogleMap();

            // Création des Markers y compris event pour afficher la station
            this.createMarkers();

            //Création des clusters
            this.createMarkerCluster();

        }.bind(this));
    }

    createStations() {

        // Création des objets station dans l'array stations
        for (let station of this.listeStations) {
            let newStation = new Station(station.name, station.address, station.position, parseInt(station.available_bike_stands), parseInt(station.available_bikes), station.status, station.last_update)
            this.stations.push(newStation);
        }
    }

    newGoogleMap() {
        this.map = new google.maps.Map(this.div, {
            zoom: this.zoom,
            center: this.center
        });
    }

    createMarkers() {
        this.markers = this.stations.map(function (station) {

            this.marker = new google.maps.Marker({
                position: station.position,
                icon: station.defineMarker().icon,
                title: station.defineMarker().title,
                map: this.map
            });

            // Création de la div station_canvas lors du clic sur le marqueur
            google.maps.event.addListener(this.marker, 'click', function () {
                this.createDivStation.bind(this)(station)
            }.bind(this));

            return this.marker;
        }.bind(this));
    }

    createMarkerCluster() {
        this.markerCluster = new MarkerClusterer(this.map, this.markers, {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });
    }

    createDivStation(station) {

        //Affichage différent si écran mobile ou si écran desktop/tablette
        currentDisplayStationCanvas = "station";
        this.divStationCanvas.style.display = "block";

        if (screen.width > 414) {
            this.divMap.style.width = "60%";
        } else {

            this.divMapstation.style.flexDirection = "column";
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

    }

    closingDivStationcanvas() {
        if (currentDisplayStationCanvas === "station") {
            this.divStationCanvas.style.display = "none";
            this.divMap.style.width = "100%";
        }

        if (currentDisplayStationCanvas === "canvas") {
            this.divStation.style.display = "block";
            this.divReservationCanvas.style.display = "none";
            currentDisplayStationCanvas = "station";
        }
    }

    showCurrentReservation() {
        let setTime = sessionStorage.getItem("setTime");
        let sessionIdentityStr = sessionStorage.getItem("identity");
        let sessionIdentityObj = JSON.parse(sessionIdentityStr);
        let remainingTime = Math.round(CONFIG.reservationTime - (Date.now() / 1000 - setTime / 1000));

        if (remainingTime > 0) {
            let stationName = sessionStorage.getItem("station");
            booking = new Booking(stationName, sessionIdentityObj.name, sessionIdentityObj.surname, setTime, CONFIG.reservationTime);
            booking.setBooking();
            booking.showReservationInfos();
            booking.timer();

        } else {
            sessionStorage.clear();
        }
    }
}