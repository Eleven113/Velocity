class Diaporama {
    constructor(slides, duration, sliderIds) {
        this.slides = slides;
        this.duration = duration;
        this.sliderIds = sliderIds;
        this.isRunning = true;
        this.currentPosition = 0;
        this.timer = function(){};
        let that = this;

        document.getElementById(this.sliderIds.btnLeft).addEventListener("click", function () {
            that.prevSlide();
            that.runDiapo();
        });

        document.getElementById(this.sliderIds.btnRight).addEventListener("click", function () {
            that.nextSlide(that); 
            that.runDiapo();
        });

        document.addEventListener("keyup", function (e) {
            if (e.keyCode === 39) {
                that.nextSlide(that);
                that.runDiapo();

            }

            if (e.keyCode === 37) {
                that.prevSlide();
                that.runDiapo();
            }
        });
        
        let sliderBtnPause = document.getElementById(this.sliderIds.btnPause);
        sliderBtnPause.addEventListener("click", function () {
            if (that.isRunning === true) {
                that.pause();
                that.isRunning = false;
                sliderBtnPause.style.color = "#e31b1b";
                sliderBtnPause.innerHTML = '<i class="fas fa-play"></i>';
            } else {           
                that.pause();
                that.start();
                that.isRunning = true;
                sliderBtnPause.style.color = "#4f77f0";
                sliderBtnPause.innerHTML = '<i class="fas fa-pause"></i>';

            }
        })
    }

    nextSlide(that) {
        if (that.currentPosition === that.slides.length - 1) {
            that.currentPosition = 0;
        } else {
            that.currentPosition++;
        }
        that.createSlide();
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
        this.timer = setInterval(this.nextSlide, this.duration, this);
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
}

window.diaporama = new Diaporama(CONFIG.slides,5000,CONFIG.sliderIds);

diaporama.createSlide();
diaporama.start();