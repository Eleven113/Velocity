class DisplayMenu {
    constructor(mapstationId, sliderId, menuReservationId, menuAideId) {
        this.divMap = document.getElementById(mapstationId);
        this.divSlider = document.getElementById(sliderId);
        this.divMenuReservation = document.getElementById(menuReservationId);
        this.divMenuAide = document.getElementById(menuAideId);


        this.event();
    }

    event() {
        this.divMenuReservation.addEventListener("click", this.displayMap.bind(this));

        this.divMenuAide.addEventListener("click", this.displayHelp.bind(this));
    }

    displayMap() {
        // Affiche la map et cache l'aide
        this.divMap.style.display = "block";
        this.divSlider.style.display = "none";

        // Affiche Aide à la place de réservation dans le menu
        this.divMenuReservation.style.display = "none";
        this.divMenuAide.style.display = "block";
    }

    displayHelp() {
        // Affiche l'aide et cache la map
        this.divMap.style.display = "none"
        this.divSlider.style.display = "block"

        // Affiche Reservation à la place d'aide dans le menu
        this.divMenuReservation.style.display = "block";
        this.divMenuAide.style.display = "none";
    }
}