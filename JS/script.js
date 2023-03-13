const $ = (elem) => document.querySelector(elem)
const $$ = (elem) => document.querySelectorAll(elem)



window.addEventListener("load", (e) => {

    // -----  VARIABLES  -----



    // -- BTN Light --

    const $btnMoodLight = $("#btnMoodLight");
    const $body = $("body");
   
    // --- FORM ---
    
    const $search = $("#search");
    const $selectType = $("#selectType");
    const $optionCharacters = $(".optionCharacters");
    const $optionLocations = $(".optionLocations");
    const $selectOrder = $("#selectOrder");

    let valuesearch, valueType, valueStatus, valueLocations, valueOrder 
    
    // ----- SECTIONS ----

    // --Section Characters--

    const $sectionCharacters = $(".sectionCharacters")

     // --Section Episodes--

    const $sectionEpisodes = $(".sectionEpisodes")

      // --Section Locations--
 
    const $sectionLocations = $(".sectionLocations")
 
 
 
 // ----- FUNTIONS -----
 
 const valueInputs = () => {
    valuesearch = $search.value
    valueType = $selectType.value
    valueStatus = $optionCharacters.value
    valueLocations = $optionLocations.value
    valueOrder = $selectOrder.value
 }
 
 
 
 
 const inputSelectType = (value) => {
     if(value === "characters"){
        $optionCharacters.classList.remove("display");
        $optionLocations.classList.add("display");
        $sectionCharacters.classList.remove("display");
        $sectionEpisodes.classList.add("display");
        $sectionLocations.classList.add("display");
        $selectOrder.setAttribute("disabled","")
        $search.removeAttribute("disabled");
 
     } else if(value === "locations") {
        $optionCharacters.classList.add("display");
        $optionLocations.classList.remove("display");
        $sectionCharacters.classList.add("display");
        $sectionEpisodes.classList.add("display");
        $sectionLocations.classList.remove("display");
        $selectOrder.removeAttribute("disabled");
        $search.setAttribute("disabled","")
     } else{
        $optionCharacters.classList.add("display");
        $optionLocations.classList.add("display");
        $sectionCharacters.classList.add("display");
        $sectionEpisodes.classList.remove("display");
        $sectionLocations.classList.add("display");
        $search.setAttribute("disabled","")
     }
 }
 
 
 
 
 
 
 
 
 
 
 // -----  EVENTOS  -----

    // -- BTN Mood Light --

    $btnMoodLight.addEventListener("click", (e) => {
        $btnMoodLight.classList.toggle("active");
        $body.classList.toggle("moodLight");
        
    })

    // -- Sections pages--

    $selectType.addEventListener("change", (e) => {
        valueInputs();
        inputSelectType(valueType);
    })


})