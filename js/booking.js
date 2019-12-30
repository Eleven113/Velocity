class Booking {
    constructor(stationName, name, surname, setTime, duration) {
        this.stationName = stationName;
        this.name = name;
        this.surname = surname;
        this.setTime = setTime;
        this.duration = duration;
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
            localStorage.setItem("identity", identityStr);
        }
    }

    showReservationInfos() {
        reservationInfos.style.display = "flex";
        reservationInfos.innerHTML = '<div>Vélo reservé à la station <span class="reservation_data">' + this.stationName + '</span> par <span class="reservation_data">' + this.name + ' ' + this.surname + '</span></div><br><div>Temps restant : <span id="timer" class="reservation_data"></span></div>';

    }

    showRemainingTime(that) {
        let currentTime = Date.now();
        let remainingTime = Math.round(that.duration - (currentTime/1000 - that.setTime/1000));
        console.log(remainingTime);
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
            clearInterval(timerSet);
            reservationInfos.innerHTML = '';
            reservationInfos.style.display = "none";
        }

    }

    timer() {
        booking.showRemainingTime(booking);
        timerSet = setInterval(function(that) {
            booking.showRemainingTime(that)
        }, 1000, booking);
    }

}