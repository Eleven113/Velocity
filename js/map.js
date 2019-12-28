let stations = [];
let markers = [];
let map;

class Googlemap {
    constructor(divMap, zoom, center) {
        this.divMap = divMap;
        this.zoom = zoom;
        this.center = center;
    }

    getApiStation() {
        ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Amiens&apiKey=81391ed9adfd937442c39a2490a0afa6d51d29e9", function (reponse) {
            // récupération de la liste des stations
            let listeStations = JSON.parse(reponse);

            for ( let station of listeStations ){
                                
                let newStation = new Station(station.name,station.address,station.position,parseInt(station.available_bike_stands),parseInt(station.available_bikes),station.status,station.lastUpdate)
                stations.push(newStation);
                // newStation.createMarker();
            }
        });
    }

}
console.log(CONFIG.map.div,CONFIG.map.zoom,CONFIG.map.center);
let myMap = new Googlemap(map);
myMap.getApiStation();



console.log(stations);
 function initMap() {
    map = new google.maps.Map(CONFIG.map.div, {
        zoom: CONFIG.map.zoom,
        center: CONFIG.map.center
    });

    let markers = stations.map(function(station) {
        return new google.maps.Marker({
          position: station.position,
          icon : station.defineIcon(),
          map : map
        }) ;
      });


    let markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });

 }

