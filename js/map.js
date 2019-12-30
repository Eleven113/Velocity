let map;
// let markerCluster;

// class Googlemap {
//     constructor(map) {
//         this.map = map
//     }



// }

function getApiStations() {
    let array = new Array();
    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Amiens&apiKey=81391ed9adfd937442c39a2490a0afa6d51d29e9", function (reponse) {
        // récupération de la liste des stations
        let listeStations = JSON.parse(reponse);

        for (let station of listeStations) {
            let newStation = new Station(station.name, station.address, station.position, parseInt(station.available_bike_stands), parseInt(station.available_bikes), station.status, station.last_update)
            array.push(newStation);
        }
    });
    return array;
}

console.log(CONFIG.map.div, CONFIG.map.zoom, CONFIG.map.center);
// let myMap = new Googlemap();



 function initMap() {
    let stations = [];
    let markers = [];
    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Amiens&apiKey=81391ed9adfd937442c39a2490a0afa6d51d29e9", function (reponse) {
        // récupération de la liste des stations
        let listeStations = JSON.parse(reponse);

        for (let station of listeStations) {
            let newStation = new Station(station.name, station.address, station.position, parseInt(station.available_bike_stands), parseInt(station.available_bikes), station.status, station.last_update)
            stations.push(newStation);
        }
        map = new google.maps.Map(CONFIG.map.div, {
            zoom: CONFIG.map.zoom,
            center: CONFIG.map.center
        });
        markers = stations.map(function(station) {
            console.log("Je rentre dedans");
            return new google.maps.Marker({
              position: station.position,
              icon : station.defineIcon(),
              map : map
            }) ;
          });
        markerCluster = new MarkerClusterer(map, markers, {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });
    });
 }

