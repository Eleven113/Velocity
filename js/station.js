class Station {
    constructor(name, address, position, availableBikeStands, availableBikes, status, lastUpdate) {
        this.name = name;
        this.address = address;
        this.position = position;
        this.availableBikeStands = availableBikeStands;
        this.availableBikes = availableBikes;
        this.status = status;
        this.lastUpdate = lastUpdate;
        this.stations;
    }

    defineMarker() {
        let configMarker = {
            title: "",
            icon: ""
        };
        let veloPercent = (this.availableBikeStands / (this.availableBikes + this.availableBikeStands)) * 100;
        if (this.status === "OPEN") {
            // Affectation d'une icone en fonction du pourcentage de vélos restants
            if (veloPercent === 100) {
                configMarker.icon = "img/station_ico_100.png";
            } else if (veloPercent < 100 && veloPercent >= 75) {
                configMarker.icon = "img/station_ico_75.png";
            } else if (veloPercent < 75 && veloPercent >= 50) {
                configMarker.icon = "img/station_ico_50.png";
            } else if (veloPercent < 50 && veloPercent >= 25) {
                configMarker.icon = "img/station_ico_25.png";
            } else if (veloPercent < 25 && veloPercent >= 0) {
                configMarker.icon = "img/station_ico_0.png";
            }
            //Affecte au Marker le nom de la station sans "number- "
            configMarker.title = this.name.slice(4);

        } else {
            // Affecte un nom et une icone spécifique si station close
            configMarg.icon = "img/station_ico_closed.png";
            configMarker.title = "Cette station est fermée";
        }

        return configMarker;
    }

}