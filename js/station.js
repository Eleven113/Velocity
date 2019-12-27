class Station {
    constructor(name,address,position,availableBikeStands,availableBikes,status,lastUpdate){
        this.name = name;
        this.address = address;
        this.position = position;
        this.avaibleBikeStands = availableBikeStands;
        this.avaibleBike = availableBikes;
        this.status = status;
        this.lastUpdate = lastUpdate;
    }
    
    debugStation() {
        console.log(`La station ${this.name} a le statut ${this.status}`)
    }
}

let station1 = new Station(12,11,6454,656,1,open,7);

station1.debugStation();