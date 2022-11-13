const loadMoreButton = document.getElementById('loadMoreButton')
const maxPageRecords = {
    people: 9,
    planets: 6,
    species: 4
}
let page = 1
let curDisplaying = ''
const models = [
    [
        'name',
        'height',
        'mass',
        'birth_year',
        'gender'
    ],
    [
        'name',
        'diameter',
        'climate',
        'gravity',
        'population'
    ],
    [
        'name',
        'classification',
        'designation',
        'average_height',
        'average_lifespan'
    ]
]

// Capitalize the first letter of a String
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Returns a HTML String with content to be displayed
function convertObjectToLi(object) {
    let model = [];
    if(object.height){
        model = models[0];
    } else if(object.diameter) {
        model = models[1];
    } else {
        model = models[2];
    }

    return `
        <div class="contentCard">
            <div class="detail">
                <h2>${object[model[0]]}</h2>
                <div class="info">
                    <div class="first-row">
                        <h3>${capitalize(model[1])}</h3>
                        <h3>${capitalize(model[2])}</h3>
                        <h3>${capitalize(model[3])}</h3>
                        <h3>${capitalize(model[4])}</h3>
                    </div>
                    <div class="second-row">
                        <h3>${object[model[1]]}</h3>
                        <h3>${object[model[2]]}</h3>
                        <h3>${object[model[3]]}</h3>
                        <h3>${object[model[4]]}</h3>
                    </div>
                </div>
            </div>
        </div> 
    `
}

// Requests the object and add it to the page
function loadObjectItens(page, requesting) {
    swApi.getObject(page, requesting).then((objects = []) =>{
        const newHtml = objects.map(convertObjectToLi).join('')
        contentGrid.innerHTML += newHtml
    })
}

// Changes style of selected and unselected buttons
function selectedButton(selected, diselect1, diselect2) {
    selected.setAttribute('style', 'background: yellow; color: black;');
    diselect1.setAttribute('style', 'background: none; color: white;');
    diselect2.setAttribute('style', 'background: none; color: white;');
}

loadCharactersButton.addEventListener('click', () => {
    if(!loadMoreButton){
        pagination.appendChild(loadMoreButton);
    }
    loadMoreButton.setAttribute('style', 'display: block');
    if(curDisplaying !== 'people'){
        curDisplaying = 'people';
        page = 1;
        selectedButton(loadCharactersButton, loadPlanetsButton, loadSpeciesButton);
    }
    if(page == 1) {
        document.getElementById("contentGrid").innerHTML = '';
        loadObjectItens(page, curDisplaying);
        page += 1;
    }
})

loadPlanetsButton.addEventListener('click', () => {
    loadMoreButton.setAttribute('style', 'display: block');
    if(curDisplaying !== 'planets'){
        curDisplaying = 'planets';
        page = 1;
        selectedButton(loadPlanetsButton, loadCharactersButton, loadSpeciesButton);
    }
    if(page == 1) {
        document.getElementById("contentGrid").innerHTML = '';
        loadObjectItens(page, curDisplaying);
        page += 1;
    }
})

loadSpeciesButton.addEventListener('click', () => {
    loadMoreButton.setAttribute('style', 'display: block');
    if(curDisplaying !== 'species'){
        curDisplaying = 'species';
        page = 1;
        selectedButton(loadSpeciesButton, loadPlanetsButton, loadCharactersButton);
    }
    if(page == 1) {
        document.getElementById("contentGrid").innerHTML = '';
        loadObjectItens(page, curDisplaying);
        page += 1;
    }
})

loadMoreButton.addEventListener('click', () => {   
    function requestNextPage(page, maxRecordsPossible, curDisplaying){
        if(page >= maxRecordsPossible) {
            loadObjectItens(page, curDisplaying);
            loadMoreButton.setAttribute('style', 'display: none');
        } else {
            loadObjectItens(page, curDisplaying);
        }
    }

    requestNextPage(page, maxPageRecords[curDisplaying], curDisplaying)
    page += 1;
})