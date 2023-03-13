const $ = (elem) => document.querySelector(elem)
const $$ = (elem) => document.querySelectorAll(elem)



window.addEventListener("load", (e) => {

    // -----  VARIABLES  -----



    // -- BTN Light --

    const $btnMoodLight = $("#btnMoodLight");
    const $body = $("body");
   
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 // -----  EVENTOS  -----

    // -- BTN Mood Light --

    $btnMoodLight.addEventListener("click", (e) => {
        $btnMoodLight.classList.toggle("active");
        $body.classList.toggle("moodLight");
        
    })


})