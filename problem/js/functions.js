
// G
// CODE According to specification
function click_filter_element (event) {

  /*
    ARGUMENTS
      event: event-object created when user clicks on one of the filter elements.

    SIDE-EFFECTS
      Marks the clicked filter element as selected / unselected.
      Since a filter element will have changed after the click, the list of
      programmes must be updated.

      Attention VG
        Careful with the propagation of the click-event

    NO RETURN VALUE

  */

      event.target.classList.toggle("selected");
      event.stopPropagation();
        update_programmes();
}


// G
// CODE according to specification
function create_filter_element (data) {

  /*
    ARGUMENTS
      data: object that contains the following keys:
        class (string): a class-name given to the created element
        textContent (string): the text that the element contains
        parent (reference to HTML-element): the HTML-element that is the parent of the created element

      No control of arguments.

    SIDE-EFFECTS
      Creates a new dom-element with the tag "li".
      Gives the new dom-element the class contained in data.class
      Appends the new dom-element to the element referenced in data.parent
      Sets the text content of the new dom-element to data.textContent
      Sets the function click_filter_element as a listener to "click" for the new dom-element

    RETURN VALUE
      Returns a reference to the new dom-element
  */

      const klass = data.class; 
      const textContent = data.textContent;
      const parent = data.parent;

      const new_element = document.createElement("li");
      new_element.classList.add(klass);
      parent.append(new_element);
      new_element.textContent = textContent;
      new_element.addEventListener("click", click_filter_element);

      return new_element;

}


// VG
// CODE according to specification
function add_group_toggling (filter_container_dom) {

  /*
    ARGUMENT
      filter_container_dom: reference to a HTML-element that contains a set of fliter_elements
            Exempel: the <ul> that contains the filters for Language.

    SIDE EFFECTS
      The function makes sure that when the user clicks on filter_container_dom, all the
      filter_elements that it contains are selected / unselected.
      Since some filter elements will have changed after the click, the list of
      programmes must be updated.

    NO RETURN VALUE

  */

    filter_container_dom.parentElement.addEventListener("click", toggleGroups);
  
    function toggleGroups(event) {

        if (filter_container_dom.firstChild.classList.value === "selected"){
          for (let i = 0; i < filter_container_dom.children.length; i++) {
            filter_container_dom.children[i].classList.remove("selected");
          }
        } else {
          for (let i = 0; i < filter_container_dom.children.length; i++) {
            filter_container_dom.children[i].classList.add("selected");
          }
        }
      
      update_programmes ()
    }

}

// VG
// CODE according to specifications
function toggle_cities (event) {

  /*

    ARGUMENTS
      This function does not take any arguments

    SIDE EFFECTS
      This function checks the state of the first city-filter-element (Madrid).
      If it is selected then it de-selects ALL city-filter-elements
      If it is de-selected then it selects ALL city-filter-elements 

    NO RETURN VALUE

  */

  const madrid = document.querySelector("#country_0 > ul").children[0];
  const everyCountry = document.querySelectorAll(".country > ul");

    if (madrid.classList.value === "selected"){
      for (let i = 0; i < everyCountry.length; i++) {
        for (let ii = 0; ii < everyCountry[i].children.length; ii++) {
          document.querySelectorAll(".country > ul")[i].children[ii].classList.remove("selected");
        }
      } 
    } else {
      for (let i = 0; i < everyCountry.length; i++) {
        for (let ii = 0; ii < everyCountry[i].children.length; ii++) {
          document.querySelectorAll(".country > ul")[i].children[ii].classList.add("selected");
        }
      } 
    }

    update_programmes ()
}


// WRITE SPECIFICATION
// ATTENTION: You need to write the specification of all three functions:
//            create_countries_cities_filters, create_country and create_city

  //create_countries_cities_filters
    /*
      ARGUMENTS
        den här funktionen tar inte emot några argument.
  
      SIDE-EFFECTS
        för varje objekt i COUNTRIES, anropar create_country.
  
      RETURN VALUE
        funktionen returnerar ingenting.
    */
  
  //create_country
    /*
      ARGUMENTS
        country: objekt som inkluderar följande nycklar:
          id: ett nummer
          namn: en sträng
          (i detta fallet används COUNTRIES från database.js)
        
        ingen kontroll utförs
  
      SIDE-EFFECTS
        skapar och appendar en div under parent "#country_filter > ul" med klasserna:
        "country" och "filter_container"
        och id:
        "country_" + "(country's id)".
        
        I div:en skapas en h1 med countrys namn och en ul med klassen "filter_list".

        för varje objekt i CITIES som har samma id som country, 
        anropar create_city med argument cities (en array med objekt i CITIES som har samma id som country)
  
      RETURN VALUE
        funktionen returnerar ingenting.
    */
  
  //create_city
    /*
      ARGUMENTS
        city: ett objekt
        (i detta fallet används utvalda objekt från array "cities")

        ingen kontroll utförs
  
      SIDE-EFFECTS
        skapar och appendar en li under parent "#country_${citys countryID} > ul" med klassen:
        "selected"
        och dataset id:
        city's id
        och textContent:
        namnet på city:n.

  
      RETURN VALUE
        funktionen returnerar ingenting.
    */

function create_countries_cities_filters () {
  function create_country (country) {
    const dom = document.createElement("div");
    dom.classList.add("country");
    dom.classList.add("filter_container");
    dom.id = "country_" + country.id;
    document.querySelector("#country_filter > ul").append(dom);
    
    dom.innerHTML = `
      <h1>${country.name}</h1>
      <ul class="filter_list"></ul>
    `;
    
    const cities = array_filter(CITIES, test_function);
    function test_function (city) {
      return city.countryID === country.id;
    }

    array_each(cities, create_city);
  }
  function create_city (city) {

    const dom = create_filter_element({
      parent: document.querySelector(`#country_${city.countryID} > ul`),
      class: "selected",
      textContent: city.name,
    });
    dom.dataset.id = city.id;

  }

  array_each(COUNTRIES, create_country);
}


// G
// ABSTRACT AND WRITE SPECIFICATION
//    As you can see, all three functions below do basically the same thing.
//    Abstract them to one function, and write the specification of that function.

function create_filter (){
  /*
    ARGUMENT
      den här funktionen tar inte emot några argument
      (funktionen "create_options" som finns inuti funktionen tar dock emot en array 
      och en sträng (ingen kontroll utförs))

    SIDE EFFECTS
      funktionen skapar tre olika filter, "level", "subject" och "language" som li
      element. den loopar igenom en array för varje filter ("LEVELS", "SUBJECTS" och 
      "LANGUAGES", respektive) och fyller dem med klassen "selected", 
      textContent blir namnet av "filter" och dess förälder blir 
      "#${(level/subject/language beroende på vilken som anropas)}_filter > ul".

    NO RETURN VALUE

  */

  function create_options (array, parent) {
    for (const filter of array) {
        const dom = create_filter_element({
        parent: document.querySelector(`#${parent}_filter > ul`),
        class: "selected",
        textContent: filter.name
      });
      dom.dataset.id = filter.id;
    }
  }
  create_options(LEVELS, "level");
  create_options(SUBJECTS, "subject");
  create_options(LANGUAGES, "language");
}


// G / VG (see details in specification)
// CODE according to specifications
function create_programme (programme) {
  
  /*

    ARGUMENT
      programme (object): One of the objects from PROGRAMMES

    SIDE-EFFECTS
      This function creates the HTML-element that contains all the information
      about one programme, as seen in the video / image.
      
      VG: The background image is a random image from among the images of the city
          in which the programme is (via the university)
      G:  No background image required.


      VG: The "see more" interaction must be included.
      G:  The "see more" element is not required. And that information needs not be in place.

    NO RETURN VALUE

  */  

    // skapa element
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("programme");
    document.querySelector("#programmes > ul").append(mainDiv);

    const uniInfo = document.createElement("div");
    uniInfo.classList.add("uni_info"); // klassen gör inget men skapar bättre läsbarhet tycker jag
    
    const seeMore = document.createElement("div");
    seeMore.classList.add("more_info");
    const extraInfo = document.createElement("div");
    extraInfo.classList.add("extra_info");
    seeMore.append(extraInfo);
    
    const sunIndex = document.createElement("div");
    sunIndex.classList.add("bottom_programme");

    mainDiv.append(uniInfo);
    mainDiv.append(seeMore);
    mainDiv.append(sunIndex);

    // see more funktionalitet
    seeMore.addEventListener("click", seeLess);
    function seeLess () {
      mainDiv.classList.toggle("show_more");

      extraInfo.innerHTML = `
      <p>Average entry grade: ${array_average (programme.entryGrades)}</p>
      <p>Success rate: ${array_average (programme.successRate)}%</p>
      <p>Exchange ratio: ${programme.exchangeStudents}/${programme.localStudents}</p>
      `
    }
    
  // innehållet i programme boxarna

  // det här ser absolut inte bra ut men det funkar
  // försök gärna komma på en bättre lösning senare
  // lite bättre?
    for (const university of UNIVERSITIES) {
      if ((university.id === programme.universityID)) {
        for (const city of CITIES) {
          if (city.id === university.cityID) {
            for (const country of COUNTRIES) {
              if (country.id === city.countryID) {
                uniInfo.innerHTML = 
                `
                <p><b>${programme.name}</b></p>
                <p>${university.name}</p>
                <p>${city.name}, ${country.name}</p>
                `
            
                sunIndex.innerHTML = 
                `
                <p>${city.name}, sun-index: ${city.sun} (${percenter(city.sun, 365)}%)</p>
                `
            
                mainDiv.style.backgroundImage = `url(media/geo_images/${array_random_element (city.imagesNormal)})`
              }
            }
          }
        }
      }
    }

    let levelSubjectLanguage = document.createElement("p");
    uniInfo.append(levelSubjectLanguage);

    for (const level of LEVELS) {
      if (level.id === programme.levelID) {
        levelSubjectLanguage.append(document.createElement.textContent = `${level.name}, `)
      }
    }

    for (const subject of SUBJECTS) {
      if (subject.id === programme.subjectID) {
        levelSubjectLanguage.append(document.createElement.textContent = `${subject.name}, ` )
      }
    }

    for (const language of LANGUAGES) {
      if (language.id === programme.languageID) {
        levelSubjectLanguage.append(document.createElement.textContent = `${language.name}` )
      }
    }
}

// G
// CODE according to the specification
function update_programmes () {

  /*
      NO ARGUMENTS

      SIDE EFFECTS
        This function updates the programmes shown on the page according to
        the current filter status (which filter elements are selected / unselected).
        It uses the function read_filters to know which programmes need to be included.

        VG: The top images (header) need to be updated here

      NO RETURN VALUE

  */

    // reset
    document.querySelector("#programmes > ul").innerHTML = "";

    // add
    array_each(read_filters(), create_programme);

    // "Inga program upfyller nuvarande filter."
    if (read_filters ().length !== 0){
        document.querySelector("#programmes > p").textContent = "";
    } else {
      document.querySelector("#programmes > p").textContent = "Inga program upfyller nuvarande filter."
    }

    // random image
    const topImages = document.querySelectorAll("#top_images > div");
    for (const div of topImages) {
      div.style.backgroundImage = `url(media/geo_images/${array_random_element (array_random_element (COUNTRIES).imagesNormal)})`
    }

}


// G
// WRITE SPECIFICATION
// You must understand how this function works. There will be questions about it
// in the code review (kodredovisning)

// Optional VG: Which parts of the function's code could be abstracted?
//              Implement it

/*

    ARGUMENT
    den här funktionen tar inte emot några argument.

    SIDE-EFFECTS
    funktionen söker igenom alla "filter"-knappar efter vilka element som har klassen 
    "selected" och jämför dess data-id med relevanta arrayer från database.js för att se 
    vilka array objekt som har motsvarande id och bör inkluderas i en array 
    (se return value),
    samt gör sökfunktionen interagerbar genom att den responderar på input från användaren.

    RETURN VALUE
    en array med objekt från array "PROGRAMMES" som uppfyller "kraven" av
    elementen med klassen "selected" ("kraven" beskrivs i side-effects)
    och (om sökfunktionen är ifylld) inkluderar strängen från input.

    om inga program uppfyller kraven returnerar funktionen en tom array.

*/

function read_filters () {
  
  const city_selected_dom = document.querySelectorAll("#country_filter li.selected");

  const city_id_selected = [];
  function callback_add_cityID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    city_id_selected.push(id_as_integer);
  }
  array_each(city_selected_dom, callback_add_cityID);

  const universities = [];
  for (let i = 0; i < city_id_selected.length; i++) {
    const city_id = city_id_selected[i];
    for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
      const university = UNIVERSITIES[ii];
      if (university.cityID === city_id) {
        universities.push(university);
      }
    }
  }

  let programmes = [];
  function callback_add_programmes (university) {
    const university_id = university.id;
    for (let i = 0; i < PROGRAMMES.length; i++) {
      const programme = PROGRAMMES[i];
      if (programme.universityID === university_id) {
        programmes.push(programme);
      }
    }
  }
  array_each(universities, callback_add_programmes);



  const level_selected_dom = document.querySelectorAll("#level_filter li.selected");
  const level_id_selected = [];
  function callback_add_levelID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    level_id_selected.push(id_as_integer);
  }
  array_each(level_selected_dom, callback_add_levelID);

  function test_function_level (programme) {
    return level_id_selected.includes(programme.levelID);
  }
  programmes = array_filter(programmes, test_function_level);



  const language_selected_dom = document.querySelectorAll("#language_filter li.selected");
  const language_id_selected = [];
  function callback_add_languageID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    language_id_selected.push(id_as_integer);
  }
  array_each(language_selected_dom, callback_add_languageID);



  function test_function_language (programme) {
    return language_id_selected.includes(programme.languageID);
  }
  programmes = array_filter(programmes, test_function_language);



  const subject_selected_dom = document.querySelectorAll("#subject_filter li.selected");
  const subject_id_selected = [];
  function callback_add_subjectID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    subject_id_selected.push(id_as_integer);
  }
  array_each(subject_selected_dom, callback_add_subjectID);



  function test_function_subject (programme) {
    return subject_id_selected.includes(programme.subjectID);
  }
  programmes = array_filter(programmes, test_function_subject);



  const search_string = document.querySelector("#search_field input").value;
  if (search_string !== "") {
    function test_function (programme) {
      return programme.name.includes(search_string);
    }
    programmes = array_filter(programmes, test_function);
  }

  return programmes;
}
