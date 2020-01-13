let currentDisplayStationCanvas;
let countdown;
let booking;

let displayMenu = new DisplayMenu(CONFIG.display.mapstation, CONFIG.display.slider, CONFIG.display.menuReservation, CONFIG.display.menuAide);

let diaporama = new Diaporama(CONFIG.slider.slides, CONFIG.slider.timing, CONFIG.slider.divIds);

diaporama.createSlide();
diaporama.start();

function initMap() {

    let mapManager = new MapManager(CONFIG.map.div, CONFIG.map.center, CONFIG.map.zoom);
    mapManager.createMap();
}

let canvas = new Canvas(document.getElementById(CONFIG.canvas.div), CONFIG.canvas.context);