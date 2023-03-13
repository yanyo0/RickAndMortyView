const $ = (elem) => document.querySelector(elem)
const $$ = (elem) => document.querySelectorAll(elem)



window.addEventListener("load", (e) => {

    // -----  VARIABLES  -----



    // -- BTN Light --

    const $btnMoodLight = $("#btnMoodLight");
    const $body = $("body");


      // ----- SECTIONS ----
   
    // --- Section Search ---
    
    const $search = $("#search");
    const $selectType = $("#selectType");
    const $optionCharacters = $(".optionCharacters");
    const $optionLocations = $(".optionLocations");
    const $selectOrder = $("#selectOrder");

    let valuesearch, valueType, valueStatus, valueLocations, valueOrder 
    

    // --Section Characters--

    const $sectionCharacters = $(".sectionCharacters");
    const $searchResultCharacters = $(".searchResultCharacters");
    const $errorsCharacters = $(".errors-characters");
    const $viewCharactersBox = $("#view-charactersBox")
    const $firstPageCharacters = $("#firstPage-characters");
    const $previousPageCharacters = $("#previousPage-characters");
    const $numPageCharacters = $("#numPage-characters");
    const $countPagesCharacters = $("#countPages-characters");
    const $nextPageCharacters = $("#nextPage-characters");
    const $lastPageCharacters = $("#lastPage-characters");
    const $modalCharacters = $(".modalCharacters")
    const $paintModalCharacter = $(".paint-modalCharacter")
    const $btnCloseCharacters = $(".btnCloseCharacters");

    let pageCharacters = 1
    let nameSearchCharacters = ""
    let statusCharacter = ""
    let locationCharacters = ""

    let totalPagesCharacters


     // --Section Episodes--

    const $sectionEpisodes = $(".sectionEpisodes")

      // --Section Locations--
 
    const $sectionLocations = $(".sectionLocations")
 
 
 
 // ----- FUNTIONS -----

//  -- SECTION SEARCH --

 const searchInput = (valueSerch, valueType, valueStatus) => {
    console.log(valueStatus)
    if(valueType === "characters"){
       if(valueStatus === "all") 
       nameSearchCharacters = `&name=${valueSerch}`;
       loadDataCharacters("https://rickandmortyapi.com/api/character/") ;
       } else {
        nameSearchCharacters = `&name=${valueSerch}`;
        statusCharacter = `status=${valueStatus}`
       }
    }
  
 

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

 const charactersStatus = (value) => {
 
    if(value === "all") {
      statusCharacter = "";
      loadDataCharacters("https://rickandmortyapi.com/api/character/");
    } else {
      statusCharacter = `&status=${value}`;
      loadDataCharacters("https://rickandmortyapi.com/api/character/");
    }
   
   }
 
 
 

//  --- SECTION CHARACTERS --- 

const pagination = (data) => {
    $numPageCharacters.value = pageCharacters;
    $countPagesCharacters.innerText = "";
    $countPagesCharacters.innerText = ` de ${data}`;

 }

 const paintIndividualCharacter = async (num) => {
    try{
       const response = await fetch(`https://rickandmortyapi.com/api/character/${num}`)
       const data = await response.json()
       $paintModalCharacter.innerHTML = "";
       $paintModalCharacter.innerHTML = `
          <div>
           <img class="img-viewCharacter" src="${data.image}" alt="Imagen de ${data.name}"/>
          </div>
          <div class="infoBox-viewCharacter">
               <h3>${data.name}</h3>
               <div class="itemsCharacters">
               <h6>Estado:</h6>
               <p>${data.status}</p>
               </div>
               <div class="itemsCharacters">
               <h6>Especie:</h6>
               <p>${data.species}</p>
               </div>
               <div class="itemsCharacters">
               <h6>Tipo:</h6>
               <p>${data.type !== "" ? data.type : "-" }</p>
               </div>
               <div class="itemsCharacters">
               <h6>Genero:</h6>
               <p>${data.gender}</p>
               </div>
               <div class="itemsCharacters">
               <h6>Origen:</h6>
               <p>${data.origin.name}</p>
               </div>
               <div class="itemsCharacters">
               <h6>Creado:</h6>
               <p>${Date(data.create)}</p>
               </div>
          </div>
       `;
    } catch (error) {
       $paintModalCharacter.innerHTML = `
       <article class="errors errors-characters display">
                <i class="fa-solid fa-circle-exclamation"></i>
                <p>No se pudo mostrar el contenido!</p> 
                <p>Intente cargar la pagina nuevamente</p>
        </article>
       `
    }
}


 const paintCharacters = (data, box) => {
    
    box.innerHTML = "";
    data.forEach(character => {
       box.innerHTML += `
       <div class="cardCharacter" id="${character.id}">
             <div class="characterImg">
               <img src="${character.image}" alt="Imagen de ${character.name}" />
             </div>
             <h5>${character.name}</h5>
           </div>
       `
    })
    const $$cardCharacter = $$(".cardCharacter")
    $$cardCharacter.forEach(box => box.addEventListener("click", (e) => {
       $modalCharacters.classList.remove("display");
       paintIndividualCharacter(box.id)
    }))
}



const loadDataCharacters = async(url) => {
    try{
       const response = await fetch(`${url}?page=${pageCharacters}${nameSearchCharacters}${statusCharacter}${locationCharacters}`)
       const data = await response.json();
       paintCharacters(data.results, $viewCharactersBox);
       $searchResultCharacters.innerText = "";
       $searchResultCharacters.innerText = `${data.info.count} resultados`;
       totalPagesCharacters = data.info.pages
       pagination(totalPagesCharacters);
       $errorsCharacters.classList.add("display");
    } catch (error) {
        // $errorsCharacters.classList.remove("display")
    }
}
 
 
const loadNextPageCharacters =() => {
    if(pageCharacters + 1 <= totalPagesCharacters ){
       pageCharacters = pageCharacters + 1
       loadDataCharacters("https://rickandmortyapi.com/api/character/");
    }}

 const loadLastPageCharacters = () => {
    if(pageCharacters !== totalPagesCharacters){
       pageCharacters = totalPagesCharacters;
       loadDataCharacters("https://rickandmortyapi.com/api/character/");
    }
    }

 const loadPreviousPageCharacters = () => {
    if(pageCharacters - 1 > 0 ){
       pageCharacters = pageCharacters - 1
       loadDataCharacters("https://rickandmortyapi.com/api/character/");
       }
    }

 const loadfirstpageCharacters = () => {
    if(pageCharacters !== 1){
        pageCharacters = 1;
    loadDataCharacters("https://rickandmortyapi.com/api/character/");
    }
 }

 const electionPageCharacters = () => {
    if($numPageCharacters.value > 0 && $numPageCharacters.value <= totalPagesCharacters ){
        pageCharacters = $numPageCharacters.value
       loadDataCharacters("https://rickandmortyapi.com/api/character/");
       }
    }
 
 
 
    const loadData = () => { 
        loadDataCharacters("https://rickandmortyapi.com/api/character/")
    }

    loadData();
 
 // -----  EVENTOS  -----

    // -- BTN Mood Light --

    $btnMoodLight.addEventListener("click", (e) => {
        $btnMoodLight.classList.toggle("active");
        $body.classList.toggle("moodLight");
        
    })

    // -- SECTION SEARCH--

    $search.addEventListener("change", (e) => {
        valueInputs();
        searchInput(valuesearch, valueType, valueStatus);
    })

    $optionCharacters.addEventListener("change", (e) => {
        valueInputs();
        charactersStatus(valueStatus);
    })

    // -- Sections pages--

    $selectType.addEventListener("change", (e) => {
        valueInputs();
        inputSelectType(valueType);
    })

   // --SECTION CHARACTERS --

    $firstPageCharacters.addEventListener("click" , (e) => {
        loadfirstpageCharacters()
    })

    $previousPageCharacters.addEventListener("click" , (e) => {
        loadPreviousPageCharacters()
    })

    $numPageCharacters.addEventListener("change" , (e) => {
        electionPageCharacters()
    })
    
    $nextPageCharacters.addEventListener("click" , (e) => {
        loadNextPageCharacters()
    })

    $lastPageCharacters.addEventListener("click" , (e) => {
        loadLastPageCharacters()
    }) 

    // --Modal Characters  -- 

    $btnCloseCharacters.addEventListener("click", (e) => {
        $modalCharacters.classList.add("display")
    })
})