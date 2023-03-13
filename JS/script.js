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

    const $sectionEpisodes = $(".sectionEpisodes");
    const $errorsEpisodes = $(".errors-episodes");
    const $viewSeasons = $(".viewSeasons");
    const $episodesViewSeasons = $("#episodes-viewSeasons")
    const $season1 = $("#season1");
    const $season2 = $("#season2");
    const $season3 = $("#season3");
    const $season4 = $("#season4");
    const $season5 = $("#season5");
    const $season6 = $("#season6");
    const $season1Pages = $(".page-Season1");
    const $season2Pages = $(".page-Season2");
    const $season3Pages = $(".page-Season3");
    const $season4Pages = $(".page-Season4");
    const $season5Pages = $(".page-Season5");
    const $season6Pages = $(".page-Season6");
    const $modalEpisodes = $(".modalEpisodes");
    const $paintModalEpisodes = $(".paint-modalEpisodes");
    const $numPageEpisodes = $("#numPage-episodes")
    const $btnCloseEpisodes = $(".btnCloseEpisodes")

    let arrayEpisodes = [];
    let pagesEpisode = 1
    let episode = ""
    let searchNameEpisode = ""

      // --Section Locations--
 
    const $sectionLocations = $(".sectionLocations");
    const $viewLocationsBox = $("#view-locationsBox");
    const $errorsLocations = $(".errors-locations");
    const $modalLocations = $(".modalLocations");
    const $paintModalLocation = $(".paint-modalLocation");
    const $btnCloseLocation = $(".btnCloseLocation");

    let arrayLocation = [];
    let numInitLocation = 0
    let numFinalLocation = numInitLocation + 9
    let elementResto = 0
    let numPagesLocations = 1;
    let totalElementsLocation 
    let arrayOrder = []
    let locationsInfo = [] 
    let countLocations
    let searchLocation =""
    let pagesLocation = ""
    let location

    // --Location pages--
   const $firstPageLocations = $("#firstPage-locations");
   const $previousPageLocations = $("#previousPage-locations");
   const $numPageLocations = $("#numPage-locations");
   const $nextPageLocations = $("#nextPage-locations");
   const $lastPageLocations = $("#lastPage-locations");
 
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
       <article class="errors">
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
 

    
// -----  SECTION EPISODES  -----    

const desingEpisode = (episode) => {
    return episode.slice(0,3)
}

 
 const paintEpisodes = (elem) => {
    if(desingEpisode(elem.episode) === "S01"){
       $season1.innerHTML += `
           <tr>
               <td>${elem.name}</td>
               <td>${elem.air_date}</td>
               <td>${elem.created}</td>
               <td>${elem.episode}</td>
               <td class="view viewEpisode" id="${elem.id}">Ver +</td>
           </tr>
       `}
    if(desingEpisode(elem.episode) === "S02"){
       $season2.innerHTML += `
           <tr>
               <td>${elem.name}</td>
               <td>${elem.air_date}</td>
               <td>${elem.created}</td>
               <td>${elem.episode}</td>
               <td class="view viewEpisode" id="${elem.id}">Ver +</td>
           </tr>
       `}
    if(desingEpisode(elem.episode) === "S03"){
       $season3.innerHTML += `
           <tr>
               <td>${elem.name}</td>
               <td>${elem.air_date}</td>
               <td>${elem.created}</td>
               <td>${elem.episode}</td>
               <td class="view viewEpisode" id="${elem.id}">Ver +</td>
           </tr>
       `}
    if(desingEpisode(elem.episode) === "S04"){
           $season4.innerHTML += `
               <tr>
                   <td>${elem.name}</td>
                   <td>${elem.air_date}</td>
                   <td>${elem.created}</td>
                   <td>${elem.episode}</td>
                   <td class="view viewEpisode" id="${elem.id}">Ver +</td>
               </tr>
           `}
    if(desingEpisode(elem.episode) === "S05"){
       $season5.innerHTML += `
          <tr>
                <td>${elem.name}</td>
                <td>${elem.air_date}</td>
                <td>${elem.created}</td>
                <td>${elem.episode}</td>
                <td class="view viewEpisode" id="${elem.id}">Ver +</td>
          </tr>
       `}
    if(desingEpisode(elem.episode) === "S06"){
          $season6.innerHTML += `
                <tr>
                   <td>${elem.name}</td>
                   <td>${elem.air_date}</td>
                   <td>${elem.created}</td>
                   <td>${elem.episode}</td>
                   <td class="view viewEpisode" id="${elem.id}">Ver +</td>
                </tr>
          `}
 
 }
 
 
 
 const loadDataCharactersEpisode = async() => {
    try{
       const respose = await fetch(`https://rickandmortyapi.com/api/episode/${episode}`)
       const data = await respose.json()
      
       const arrayFetch = data.characters.map(character => fetch(character))
       
       const promeseAll = await Promise.all(arrayFetch)
       
       const info = await Promise.all(promeseAll.map(character =>character.json()))
       
       paintCharacters(info, $paintModalEpisodes);
 
    }
    catch(error){
        $paintModalEpisodes.innerHTML = `
        <article class="errors">
                <i class="fa-solid fa-circle-exclamation"></i>
                <p>No se pudo mostrar el contenido!</p> 
                <p>Intente cargar la pagina nuevamente</p>
        </article>
        `
    }
 }
 

 const loadDataEpisodes = async() => {
    try{
       const response = await fetch(`https://rickandmortyapi.com/api/episode/${searchNameEpisode}`)
       const data = await response.json()
 
       for(i = 1 ;i <= data.info.pages ; i++){
          arrayEpisodes.push(fetch(`https://rickandmortyapi.com/api/episode?page=${i}`))
       }
 
       const info = await Promise.all(arrayEpisodes)
       const dataArray = await Promise.all(info.map(ep => ep.json()))
 
       dataArray.forEach( page => {
          for(const elem of page.results) {
             paintEpisodes(elem)
             }})
 
       const $$viewEpisode = $$(".viewEpisode");
 
       $$viewEpisode.forEach(elem => elem.addEventListener("click", (e) => {
          episode = elem.id
          loadDataCharactersEpisode()
          $modalEpisodes.classList.remove("display")
          } ))
 
       } catch (error) {
        $errorsEpisodes.classList.remove("display")
       }
 
   }
 
 
 const episodePagesClassList = () => {
    if(pagesEpisode === 1){
       $season1Pages.classList.remove("display");
       $season2Pages.classList.add("display");
       $season3Pages.classList.add("display");
       $season4Pages.classList.add("display");
       $season5Pages.classList.add("display");
       $season6Pages.classList.add("display");
    }
    if(pagesEpisode === 2){
       $season1Pages.classList.add("display");
       $season2Pages.classList.remove("display");
       $season3Pages.classList.add("display");
       $season4Pages.classList.add("display");
       $season5Pages.classList.add("display");
       $season6Pages.classList.add("display");
    }
    if(pagesEpisode === 3){
       $season1Pages.classList.add("display");
       $season2Pages.classList.add("display");
       $season3Pages.classList.remove("display");
       $season4Pages.classList.add("display");
       $season5Pages.classList.add("display");
       $season6Pages.classList.add("display");
    }
    if(pagesEpisode === 4){
       $season1Pages.classList.add("display");
       $season2Pages.classList.add("display");
       $season3Pages.classList.add("display");
       $season4Pages.classList.remove("display");
       $season5Pages.classList.add("display");
       $season6Pages.classList.add("display");
    }
    if(pagesEpisode === 5){
       $season1Pages.classList.add("display");
       $season2Pages.classList.add("display");
       $season3Pages.classList.add("display");
       $season4Pages.classList.add("display");
       $season5Pages.classList.remove("display");
       $season6Pages.classList.add("display");
    }
    if(pagesEpisode === 6){
       $season1Pages.classList.add("display");
       $season2Pages.classList.add("display");
       $season3Pages.classList.add("display");
       $season4Pages.classList.add("display");
       $season5Pages.classList.add("display");
       $season6Pages.classList.remove("display");
    }
    $numPageEpisodes.value = pagesEpisode;
 }
 
 const selecCardSeason = (page) => {
    $viewSeasons.classList.add("display");
    $episodesViewSeasons.classList.remove("display");
    pagesEpisode = page
    episodePagesClassList();
 }
 
   const loadNextPageEpisodes =() => {
    if(pagesEpisode + 1 <= 6 ){
       pagesEpisode = pagesEpisode + 1;
      episodePagesClassList()
    }}
 
 const loadLastPageEpisodes = () => {
    if(pagesEpisode !== 6){
     pagesEpisode = 6
     episodePagesClassList()
    }
    }
 
 
 const loadPreviousPageEpisodes = () => {
    if(pagesEpisode - 1 > 0 ){
       pagesEpisode = pagesEpisode - 1;
      episodePagesClassList()
    }
    }
 
 const loadfirstpageEpisodes = () => {
    if(pagesEpisode !== 1){
    pagesEpisode = 1;
    episodePagesClassList();
    }
 }
 
 const paginationEpisodes = () => {
    pagesEpisode = Number($numPageEpisodes.value);
    episodePagesClassList();
 }



//  ---  SECTION LOCATIONS  ---

$numPageLocations.value = numPagesLocations;

const sortAZ = (array) => {
  return  array.sort((a,b) => {
        if(a.name > b.name){
         return 1
        }
        if(a.name < b.name){
         return -1
        }
        return 0;
     })
}

const sortZA = (array) => {
    return  array.sort((a,b) => {
          if(a.name < b.name){
           return 1
          }
          if(a.name > b.name){
           return -1
          }
          return 0;
       })
  }




const addOptionSelectLocation = (elem) => {
   $optionLocations.innerHTML += `
         <option value="${elem.url}">${elem.name}</option>
         `
}



const paintCardLocation = (elem) => {
   $viewLocationsBox.innerHTML += `
         <div class="cardLocation">
          <div>
          <h3>${elem.name}</h3>
          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Dimensión</th>
                <th>Creado</th>
                <th>Residentes</th>
              </tr>
          </thead>

         <tbody>
         <tr>
         <td>${elem.type}</td>
         <td>${elem.dimension}</td>
         <td>${elem.created}</td>
         <td class="view viewLocation" id="location${elem.id}">Ver +</td>
          </tr>
             
         </tbody>
        </table>
        </div>

        </div>
         `
}



const loadDataCharactersLocation = async() => {
   try{
      const respose = await fetch(`https://rickandmortyapi.com/api/location/${location}`)
      const data = await respose.json()
      
      const arrayFetch = data.residents.map(character => fetch(character))
      
      const promeseAll = await Promise.all(arrayFetch)
      
      const info = await Promise.all(promeseAll.map(character =>character.json()))
      
      paintCharacters(info, $paintModalLocation);

   }
   catch(error){
     $errorsLocations.classList.remove("display")
   }
}


 const paintPages = (totalElements, array) => {
   totalElementsLocation = totalElements
   elementResto = totalElementsLocation  % 10;

    for(i = `${numInitLocation}`; i <= `${numFinalLocation}` ; i++){
       paintCardLocation(array[i])
      }
    }
    
  
 const numerationPageLocation = () => {

   if(numInitLocation.toString().length === 2 || numInitLocation.toString().length === 1){
     numPagesLocations = Number(numInitLocation.toString().slice(0,1)) + 1
    
   } else {
      numPagesLocations = Number(numInitLocation.toString().slice(0,2)) + 1
     
   }
   $numPageLocations.value = numPagesLocations
 }



 const firstPageLocation = () =>{
   numInitLocation = 0
   numFinalLocation = numInitLocation + 9
   loadDataLocations("https://rickandmortyapi.com/api/location/")
   numerationPageLocation()
 }

 const lastPageLocation = () => {
   numInitLocation = totalElementsLocation -1 - elementResto
   numFinalLocation = totalElementsLocation -1
   loadDataLocations("https://rickandmortyapi.com/api/location/")
   numerationPageLocation()
 }

 const nextPageLocation = () => {
  
   if(numFinalLocation === totalElementsLocation - 1 - elementResto){
      numInitLocation = numInitLocation + 10;
      numFinalLocation = numFinalLocation + elementResto;
      loadDataLocations("https://rickandmortyapi.com/api/location/")
    } else if(numFinalLocation < totalElementsLocation - elementResto - 1){ 
      numInitLocation = numInitLocation + 10;
      numFinalLocation = numFinalLocation + 10;
      loadDataLocations("https://rickandmortyapi.com/api/location/")
    } 
    numerationPageLocation()
    
 }

 const previousPageLocation = () => {
   
   if(numFinalLocation === totalElementsLocation - 1){ 
         numInitLocation = numInitLocation - 10;
         numFinalLocation = numFinalLocation - 6;
         loadDataLocations("https://rickandmortyapi.com/api/location/")
       } else if(numInitLocation > 0){
         numInitLocation = numInitLocation - 10;
         numFinalLocation = numFinalLocation - 10;
         loadDataLocations("https://rickandmortyapi.com/api/location/")
       }
       
       numerationPageLocation()
   
 }

 
 const optionPaintLocation = (value, array) => {
   
   if(value === "z-a"){
      arrayOrder = sortZA(array)
   } else{
      arrayOrder = sortAZ(array)
   }
  
   return arrayOrder
 } 




const loadDataLocations = async(url) => {
   
      $errorsLocations.classList.add("display");
      locationsInfo = [] 
      arrayLocation = []
      try{
         const response = await fetch(`${url}${pagesLocation}${searchLocation}`)
         const data = await response.json()

         countLocations = data.info.count
         

         for(i = 1 ;i <= data.info.pages ; i++){
            arrayLocation.push(fetch(`https://rickandmortyapi.com/api/location?page=${i}`))
         }
         
         const info = await Promise.all(arrayLocation)
         const dataArray = await Promise.all(info.map(location => location.json()))
     
         

         $optionLocations.innerHTML = `<option value="all">Todos</option>`
         $viewLocationsBox.innerHTML = "",
        
         dataArray.forEach( page => {
            for(const elem of page.results) {
               addOptionSelectLocation(elem);
               locationsInfo.push(elem)
               // paintPages(data.info.count, elem);
               }})
               
         paintPages(data.info.count, optionPaintLocation(valueOrder, locationsInfo))

         

         const $$viewLocation = $$(".viewLocation");
   
         $$viewLocation.forEach(elem => elem.addEventListener("click", (e) => {
            location = elem.id.slice(8,11)
            loadDataCharactersLocation()
            $modalLocations.classList.remove("display")
            }))

         } catch (error) {
            // $errorsLocations.classList.remove("display");
         }
}


const inputPaginationLocations = (value) => {
 
   let totalCountPages = Math.ceil((countLocations -1) / 10)
  
       if( value === 1){
         numInitLocation = 0
         numFinalLocation = 9
         loadDataLocations("https://rickandmortyapi.com/api/location/")
       }
      if(value !== 1 && value !== totalCountPages){
         numInitLocation = Number(`${value - 1}${+ 0}`)
         numFinalLocation = Number(`${value - 1}${+ 0}`) + 9
         loadDataLocations("https://rickandmortyapi.com/api/location/")
      }
      if(value === totalCountPages){
         numInitLocation = Number(`${value - 1}${+ 0}`);
         numFinalLocation = countLocations -1;
         loadDataLocations("https://rickandmortyapi.com/api/location/")
      }
     
 }


   const searchLocations = async () => {
      valueInputs()
      if(valueLocations !== "all" ){ 
      try{
         const response = await fetch(`${valueLocations}`)
         const data = await response.json()
         $viewLocationsBox.innerHTML = "",
         paintCardLocation(data);
         $errorsLocation.classList.add("display");

      } catch (error) {
         $errorsLocation.classList.remove("display");
      }
     } else {
      loadDataLocations("https://rickandmortyapi.com/api/location/")
     }
    }
 
    const loadData = () => { 
        loadDataCharacters("https://rickandmortyapi.com/api/character/");
        loadDataEpisodes();
        loadDataLocations("https://rickandmortyapi.com/api/location/");
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

    $selectOrder.addEventListener("change", (e) => {
        valueInputs();
        loadDataLocations("https://rickandmortyapi.com/api/location/");
    })

    // -- Sections pages--

    $selectType.addEventListener("change", (e) => {
        valueInputs();
        inputSelectType(valueType);
    })

   // --SECTION CHARACTERS --

    //  -- BTN Page Chatacters -- 

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

    // SECTION EPISODES

    $(".cardSeason1").addEventListener("click", (e) => {
        selecCardSeason(1)
    });
  
    $(".cardSeason2").addEventListener("click", (e) => {
        selecCardSeason(2)
    });
  
    $(".cardSeason3").addEventListener("click", (e) => {
        selecCardSeason(3)
    });
  
    $(".cardSeason4").addEventListener("click", (e) => {
        selecCardSeason(4)
    });
  
    $(".cardSeason5").addEventListener("click", (e) => {
        selecCardSeason(5)
    });
  
    $(".cardSeason6").addEventListener("click", (e) => {
        selecCardSeason(6)
    })

    // -- BTN Page Episode

    $("#firstPage-episodes").addEventListener("click", (e) => {
        loadfirstpageEpisodes();
    });

    $("#previousPage-episodes").addEventListener("click", (e) => {
        loadPreviousPageEpisodes();
    });

    $("#nextPage-episodes").addEventListener("click", (e) => {
        loadNextPageEpisodes();
    });
  
    $("#lastPage-episodes").addEventListener("click", (e) => {
        loadLastPageEpisodes();
    });
  
    $numPageEpisodes.addEventListener("change", (e) => {
        paginationEpisodes();
    })

    // Modal episode

    $btnCloseEpisodes.addEventListener("click", (e) => {
     $modalEpisodes.classList.add("display")
    })

    // --- SECTION LOCATION  ---

    //  -- BTN Pages Locations -- 

   $nextPageLocations.addEventListener("click", (e) => {
      nextPageLocation();
   })

   $previousPageLocations.addEventListener("click", (e) => {
      previousPageLocation();
   })
 
   $numPageLocations.addEventListener("change", (e) => {
      inputPaginationLocations($numPageLocation.value);
   })

   $firstPageLocations.addEventListener("click", (e) => {
      firstPageLocation();
   })

   $lastPageLocations.addEventListener("click", (e) => {
      lastPageLocation();
   })


    // - Modal - 

    $btnCloseLocation.addEventListener("click" , (e) => {
        $modalLocations.classList.add("display")
    })
  
})