let currentDisplayStationCanvas;
let booking;

function initMap() {

    let mapManager = new MapManager(CONFIG.map.div,CONFIG.map.center,CONFIG.map.zoom);
    mapManager.createMap();
}

