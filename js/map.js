function initMap() {

    let mapManager = new MapManager(CONFIG.map.div,CONFIG.map.center,CONFIG.map.zoom);
    mapManager.createMap();
}

// // Event sur clic de fermeture de la div station_canvas
// let stationClose = document.getElementById("station_close");


// stationClose.addEventListener("click", function () {

//     if (currentDisplayStationCanvas === "station") {
//         divStationCanvas.style.display = "none";
//         divMap.style.width = "100%";
//     }

//     if (currentDisplayStationCanvas === "canvas") {
//         divStation.style.display = "block";
//         reservationCanvas.style.display = "none";
//         currentDisplayStationCanvas = "station";
//     }
// })