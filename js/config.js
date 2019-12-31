const CONFIG = {
    api : {
        key : "81391ed9adfd937442c39a2490a0afa6d51d29e9",
        apiContrat : "Amiens"
    },
    map : {
        center : {
            lat: 49.895,
            lng: 2.299
        },
        div : document.getElementById("map"),
        zoom : 13
        },
    slides : [
        {
            img : "img/diapo_img1.png",
            txt : "Cherchez et sélectionnez la station de votre choix",
            alt : "Visuel de la carte"
        },
        {      
            img : "img/diapo_img2.png",
            txt : "Complétez les champs à votre nom et votre prénom (obligatoire)",
            alt : "Visuel de l'encart de réservation"
        },
        { 
            img : "img/diapo_img3.png",
            txt : "Signez dans le carré pour valider votre réservation (obligatoire)",
            alt : "Visuel de l'encart de signature"
        },
        {   
            img : "img/diapo_img4.png",
            txt : "Votre réservation sera validée pour les 20 prochaines minutes",
            alt : "Visuel de la confirmation de réservation"
        }      
    ],
    sliderIds : {
        img : "slider_img",
        txt : "slider_txt",
        btnLeft : "slider_btn-left",
        btnRight : "slider_btn-right",
        btnPause : "slider_btn-pause"
    },
    
    reservationTime : 30,

    canvas : {
        div : "canvas",
        context : "2d"
    }
 
}