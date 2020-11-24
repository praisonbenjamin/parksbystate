'use strict';

function displayResults(json){
    console.log(json);

    $('#results-list').empty();
    for (let i= 0; i < json.data.length; i++){
        $('#results-list').append(
            `<li><h3>${json.data[i].fullName}</h3>
            <p>${json.data[i].description}</p>
            <a href="${json.data[i].directionsUrl}"> Get directions</a>
            </li>`
        );
        $('#results').removeClass('hidden');
    }
}

function getResults(url){
    console.log(url);
    fetch(url, {
        headers: {
            'Content-Type' : 'application/json'            
        },
    }).then((response)=> response.json())
    .then((json)=>{
        displayResults(json);
    })
    .catch(err=>console.log(err));
}

function getParks(code,maxResults=10){
    console.log(code);
    console.log(maxResults);

    const api_key= 'ZN0bKuwplRkwTTESneMMjubge41Hq7lKhwkKa1Cs';
    const baseUrl= 'https://developer.nps.gov/api/v1/parks';

    let stateCodes = code.split(',');
    console.log(stateCodes);
    let stateCodeStr = '';
    for (let i =0; i<stateCodes.length; i++){
        stateCodeStr += `stateCode=${stateCodes[i].trim().toLowerCase()}&`
    }

    console.log(stateCodeStr);
    // const param = {
    //     stateCode
    // }

    let requestUrl = `${baseUrl}?${stateCodeStr}limit=${maxResults}&api_key=${api_key}`;

    getResults(requestUrl);

}

function handleParkSearch(){
    $('form').submit(event =>{
        event.preventDefault();
        let searchCode = $('#js-search-code').val();
        let maxResults = $('#js-max-results').val();
        getParks(searchCode,maxResults);
    })
}


function main(){
    handleParkSearch();


}

$(main);