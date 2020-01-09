let currentDisplayStationCanvas;
let countdown;
let booking;

let displayMenu = new DisplayMenu(CONFIG.display.mapstation,CONFIG.display.slider,CONFIG.display.menuReservation,CONFIG.display.menuAide);

function initMap() {

    let mapManager = new MapManager(CONFIG.map.div,CONFIG.map.center,CONFIG.map.zoom);
    mapManager.createMap();
}


