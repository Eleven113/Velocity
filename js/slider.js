//let diapoElement = [
//    {
//        id : "1",
//        img : "img/diapo_img1.png",
//        txt : "Cherchez et sélectionnez la station de votre choix",
//        alt : "Visuel de la carte"
//    },
//    {
//        id : "2",        
//        img : "img/diapo_img2.png",
//        txt : "Complétez les champs à votre nom et votre prénom (obligatoire)",
//        alt : "Visuel de l'encart de réservation"
//    },
//    {
//        id : "3",        
//        img : "img/diapo_img3.png",
//        txt : "Signez dans le carré pour valider votre réservation (obligatoire)",
//        alt : "Visuel de l'encart de signature"
//    },
//    {
//        id : "4",        
//        img : "img/diapo_img4.png",
//        txt : "Votre réservation sera validée pour les 20 prochaines minutes",
//        alt : "Visuel de la confirmation de réservation"
//    }      
//];

//let sliderImg = document.getElementById("slider_img");
//let sliderTxt = document.getElementById("slider_txt");
//let sliderBtnLeft = document.getElementById("slider_btn-left");
//let sliderBtnRight = document.getElementById("slider_btn-right");
//let sliderBtnPause = document.getElementById("slider_btn-pause");
//let numDiapoElement = diapoElement.length;
//let i = 0;
//
//
//function nextSlide(){
//    if (i === numDiapoElement-1){
//        i = 0;
//    }
//    else{
//        i++;
//    }
//    createSlide();
//}
//
//function prevSlide(){
//    if (i === 0){
//        i = numDiapoElement-1;
//    }
//    else {
//        i--;
//    }
//    createSlide();
//}
//
//function DiapoAuto(){
////    this.timer = null;
//    this.start = function (){
//            this.timer = setInterval(nextSlide, 5000);
//        }
//    this.pause = function() {
//        clearInterval(this.timer);
//    }
//}
//
//let diapoAuto = new DiapoAuto();
//
//// Création de la fonction et du 1er Slide
//function createSlide (){
//    sliderImg.innerHTML = '';
//    sliderTxt.innerHTML = '';
//    let img = document.createElement("img");
//    img.src = diapoElement[i].img;
//    img.alt = diapoElement[i].alt;
//    img.id = "slider_img-img"
//    sliderImg.append(img);
//    let span = document.createElement("span");
//    span.id = "slider_txt-span"
//    span.textContent = diapoElement[i].id + " - " + diapoElement[i].txt ;
//    sliderTxt.append(span);
//}

// Création du 1er slide et mise en route du diapo
window.diaporama = new Diaporama(CONFIG.slides,5000,CONFIG.sliderIds);

diaporama.createSlide();
diaporama.start();


//// Gestion des events Slide suivant et précédént
//// Clique sur les boutons
//sliderBtnLeft.addEventListener("click",function(){
//    prevSlide();
//    runDiapo() 
//});
//
//sliderBtnRight.addEventListener("click",function(){
//    nextSlide();
//    runDiapo()
//});

// Appuie sur les fléches directionnelles gauche et droite
//document.addEventListener("keyup",function(e){
//    if (e.keyCode === 39){
//        nextSlide();
//        runDiapo()
//
//    }
//    
//    if (e.keyCode === 37){
//        prevSlide();
//        runDiapo()
//    }
//});
//
//let diapoRun = true;
////Pause du diapo
//sliderBtnPause.addEventListener("click", function(){
//    if ( diapoRun === true ){
//        diapoAuto.pause();
//        diapoRun = false;
//        sliderBtnPause.style.color = "#e31b1b";
//        sliderBtnPause.innerHTML = '<i class="fas fa-play"></i>';
//    }
//    else {
//        diapoAuto.pause();
//        diapoAuto.start();
//        diapoRun = true ;
//        sliderBtnPause.style.color = "#4f77f0";
//        sliderBtnPause.innerHTML = '<i class="fas fa-pause"></i>';        
//    }
//})

////Determine si le diapo est pause, changement de la font et remise en route du diapo
//function runDiapo(){
//    if (diapoRun === false){
//        diapoRun = true ;
//        sliderBtnPause.style.color = "#4f77f0";
//        sliderBtnPause.innerHTML = '<i class="fas fa-pause"></i>';           
//    }
//    diapoAuto.pause();
//    diapoAuto.start();
//}
//
//
//let slider = document.getElementById("slider");
//let menuAide = document.getElementById("menu_aide");
//let menuReservation = document.getElementById("menu_reservation");
//
//
//// Display la Map ou l'aide
//menuAide.addEventListener("click", function(){
//    slider.style.display = "block";
//    divMapstation.style.display = "none";
//})
//
//menuReservation.addEventListener("click", function(){
//    slider.style.display = "none";
//    divMapstation.style.display = "flex";
//    
//})
