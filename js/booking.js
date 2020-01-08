class Booking {
    constructor(stationName, name, surname, setTime, duration) {
        this.stationName = stationName;
        this.name = name;
        this.surname = surname;
        this.setTime = setTime;
        this.duration = duration;
        this.countdown;

        this.reservationInfos = document.getElementById("reservation_infos");
    }

    setBooking() {
        if (localStorage) {
            let identityObj = {
                surname: this.surname,
                name: this.name
            }

            let identityStr = JSON.stringify(identityObj);
            sessionStorage.setItem("station", this.stationName);
            sessionStorage.setItem("setTime", this.setTime);
            sessionStorage.setItem("identity", identityStr);
            localStorage.setItem("identity", identityStr);
        }
    }

    showReservationInfos() {
        this.reservationInfos.style.display = "flex";
        this.reservationInfos.innerHTML = '<div>Vélo reservé à la station <span class="reservation_data">' + this.stationName + '</span> par <span class="reservation_data">' + this.name + ' ' + this.surname + '</span></div><br><div>Temps restant : <span id="timer" class="reservation_data"></span></div>';
    }

    showRemainingTime() {
        let currentTime = Date.now();
        let remainingTime = Math.round(this.duration - (currentTime/1000 - this.setTime/1000));
        let divTimer = document.getElementById("timer");
        if (remainingTime > 0) {
            let minutes, secondes;
            minutes = Math.trunc(remainingTime / 60);
            minutes = ("0" + minutes).slice(-2);
            secondes = remainingTime % 60;
            secondes = ("0" + secondes).slice(-2);
            divTimer.innerHTML = minutes + ':' + secondes;
            sessionStorage.setItem("temps", remainingTime);
        } else {
            clearInterval(this.countdown);
            this.reservationInfos.innerHTML = '';
            this.reservationInfos.style.display = "none";
            sessionStorage.clear();
        }

    }

    timer() {
        this.showRemainingTime();
        this.countdown = setInterval(this.showRemainingTime.bind(this)
        , 1000);
    }

}