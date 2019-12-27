class Diaporama {
    constructor(diapoElement,timer){
        this.slide = diapoElement;
        this.diapoRun = true;
        this.currentPosition = 0;
        this.timer = timer;
    }
    
    nextSlide();
    prevSlide();
    diapoAuto();
    createSlide();
    runDiapo();
}