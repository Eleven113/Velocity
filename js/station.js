class Station {
    constructor(name, address, position, availableBikeStands, availableBikes, status, lastUpdate) {
        this.name = name;
        this.address = address;
        this.position = position;
        this.availableBikeStands = availableBikeStands;
        this.availableBike = availableBikes;
        this.status = status;
        this.lastUpdate = lastUpdate;
        this.stations;
    }

    debugStation() {
        console.log(`La station ${this.name} a le statut ${this.status}`)
    }

    defineIcon() {
        let stationIcone;
        let veloPercent = (this.availableBikeStands / (this.availableBike + this.availableBikeStands)) * 100;
        if (this.status === "OPEN") {
            // Affectation d'une icone en fonction du pourcentage de vélos restants
            if (veloPercent === 100) {
                stationIcone = "img/station_ico_100.png";
            } else if (veloPercent < 100 && veloPercent >= 75) {
                stationIcone = "img/station_ico_75.png";
            } else if (veloPercent < 75 && veloPercent >= 50) {
                stationIcone = "img/station_ico_50.png";
            } else if (veloPercent < 50 && veloPercent >= 25) {
                stationIcone = "img/station_ico_25.png";
            } else if (veloPercent < 25 && veloPercent >= 0) {
                stationIcone = "img/station_ico_0.png";
            }

        } else {

            stationIcone = "img/station_ico_closed.png";
        }

        return stationIcone;
    }

    // createMarker() {
    //     console.log(this.position);
    //     let marker = new google.maps.Marker({
    //         position: this.position,
    //         title: this.name.slice(4),
    //         icon: this.defineIcon()
    //     });
    //     markers.push(marker);
    //     console.log(markers);
    // }


}

