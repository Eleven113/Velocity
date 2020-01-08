class Diaporama {
    constructor(slides, duration, sliderIds) {
        this.slides = slides;
        this.duration = duration;
        this.sliderIds = sliderIds;
        this.isRunning = true;
        this.currentPosition = 0;
        this.timer;
        this.sliderBtnPause = document.getElementById(this.sliderIds.btnPause);

        this.addEvent();

    }

    nextSlide() {
        if (this.currentPosition === this.slides.length - 1) {
            this.currentPosition = 0;
        } else {
            this.currentPosition++;
        }
        this.createSlide();
    }

    prevSlide() {
        if (this.currentPosition === 0) {
            this.currentPosition = this.slides.length - 1;
        } else {
            this.currentPosition--;
        }
        this.createSlide();
    }

    start() {
        this.timer = setInterval(this.nextSlide.bind(this), this.duration);
    }

    pause() {
        clearInterval(this.timer);
    }

    createSlide() {
        let sliderImg = document.getElementById(this.sliderIds.img);
        let sliderTxt = document.getElementById(this.sliderIds.txt);
        sliderImg.innerHTML = '';
        sliderTxt.innerHTML = '';

        let img = document.createElement("img");
        img.src = this.slides[this.currentPosition].img;
        img.alt = this.slides[this.currentPosition].alt;
        img.id = this.sliderIds.img + "-img";
        sliderImg.append(img);

        let span = document.createElement("span");
        span.id = this.sliderIds.txt + "-span";
        span.textContent = (this.currentPosition + 1) + " - " + this.slides[this.currentPosition].txt;
        sliderTxt.append(span);
    }

    runDiapo() {
        if (this.isRunning === false) {
            this.isRunning = true;
            let sliderBtnPause = document.getElementById(this.sliderIds.btnPause);
            sliderBtnPause.style.color = "#4f77f0";
            sliderBtnPause.innerHTML = '<i class="fas fa-pause"></i>';
        }
        this.pause();
        this.start();
    }

    addEvent() {
        document.getElementById(this.sliderIds.btnLeft).addEventListener("click", this.eventLeftBtn.bind(this));

        document.getElementById(this.sliderIds.btnRight).addEventListener("click", this.eventRightBtn.bind(this));

        document.addEventListener("keyup", this.eventKeys.bind(this));


        this.sliderBtnPause.addEventListener("click", this.pauseAndPlay.bind(this));
    }

    pauseAndPlay() {
        if (this.isRunning === true) {
            this.pause();
            this.isRunning = false;
            this.sliderBtnPause.style.color = "#e31b1b";
            this.sliderBtnPause.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            this.pause();
            this.start();
            this.isRunning = true;
            this.sliderBtnPause.style.color = "#4f77f0";
            this.sliderBtnPause.innerHTML = '<i class="fas fa-pause"></i>';
        }
    }


    eventLeftBtn() {
        this.prevSlide();
        this.runDiapo();
    }

    eventRightBtn() {
        this.nextSlide();
        this.runDiapo();
    }

    eventKeys(e) {
        if (e.keyCode === 39) {
            this.nextSlide();
            this.runDiapo();

        }

        if (e.keyCode === 37) {
            this.prevSlide();
            this.runDiapo();
        }
    }

}

diaporama = new Diaporama(CONFIG.slider.slides, CONFIG.slider.timing, CONFIG.slider.divIds);

diaporama.createSlide();
diaporama.start();