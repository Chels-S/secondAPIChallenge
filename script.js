/* 
! Steps /  Goals to follow:
    1 - Use the picutre of the day API to pull up the potd and display it.
        - Using that same API, pull up info about that picutre.
    2 - Using a second API, pull up a variety of photos from the mars rover photos

  
    
! Concepts / Adjustments:
    - Have some form of search feature or input that allows user interaction. Like the NYT API project
        - Allow use to select from the 3 rovers: Curiosity, Opportunity and Spirit. Then let the user input an earth date to pull up photos from that rover. 
            -If possible or for a later time - input a way to show the three rovers at the same time for the same date under an ALL option

*/




// NASA BASE URLS
const podURL = 'https://api.nasa.gov/planetary/apod';
const curiosityURL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
const opportunityURL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos';
const spiritURL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos';


// KEYS
const nasaKey = 'etNSjeDShl1hKrd1Wy8BSTb4YGndNYpgbDa77COF';

// DYNAMIC URLS
let picUrl;
let curiosityUrl;
let opportunityUrl;
let spiritUrl;



// SEARCH FORM
const spiritDate = document.querySelector('.spirit-date');
const opportunityDate = document.querySelector('.opportunity-date');
const curiosityDate = document.querySelector('.curiosity-date');
const solDate = document.querySelector('.sol-date');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const searchSpirit = document.querySelector('.spirit');
const searchOpportunity = document.querySelector('.opportunity');
const searchCuriosity = document.querySelector('.curiosity');




// RESULTS SECTION
const section = document.querySelector('section');

searchSpirit.addEventListener('submit', fetchSpirit);
searchOpportunity.addEventListener('submit', fetchOpportunity);
searchCuriosity.addEventListener('submit', fetchCuriosity);



const dailyImgSection = document.querySelector('section');
const potd = document.querySelector('#potdSection');
const roverSection = document.querySelector('.roverImages');
console.log(potd);
console.log(roverSection);

// const earthDateTemp = '2020-6-3'; // fix to be user input
// need to make sure we implement a result for if no images were taken on that day
// console.log(earthDateTemp);




// ! IMPORTANT NOTE ABOUT ROVER DATES:
/*
    - Opportunity can only pull up images from 1/25/2004 - 6/11/18
    - Spirit can only pull up images from 1/4/2004 - 3/21/2010
    - Curiosity can only pull up images from 8/6/2012 - 5/12-21

*/

// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2019-6-3&api_key=etNSjeDShl1hKrd1Wy8BSTb4YGndNYpgbDa77COF
console.log(dailyImgSection);



// NASA URLS
    picUrl = `${podURL}?api_key=${nasaKey}`;


// PICTURE OF THE  DAY

    fetch(picUrl)
    .then (function (result){
        // console.log(result);
        return result.json();
    })
    .then(function (json) {
        console.log(json);
        
      
        
        let title = document.createElement('h3');
        let description = document.createElement('p');


        let dailyImage = img=json.url;
        let dailyTitle = json.title;
        let dailyDescript = json.explanation;

    
        // console.log(dailyDescript);
        // console.log(dailyImage);
        console.log(dailyTitle);

        dailyImgSection.appendChild(title);
        document.getElementById('dailyImage').src=dailyImage;
        dailyImgSection.appendChild(description);
        
        description.innerText=dailyDescript;
        title.innerText = dailyTitle;
        
    
        
    })



//  ROVER IMAGES 

//! PROBLEMS TO SOLVE: 
/*
    - Connecting the select form to each rovers individual api link
    - When a rover is selected and submitted, pulling up a new form that allows the user to select an earth date

    - Implementing a search form to allow users to select which rover they'd like to see
    - Implementing a search form via Earth Date to allow users to see images from the specified rover at that date
        - Remember to limit dates via rover for they're available dates.
    - Displaying said results to the DOM for the user to see.
        -Possibly need to limit results.

*/




// FETCH FUNCTIONS


function fetchSpirit(e){
    e.preventDefault();

    console.log(e);

    if (spiritDate.value == '') {
        console.log('No earth date to load for Spirit.')
        return;
    }

    fetch(spiritURL + '?earth_date=' + spiritDate.value + '&api_key=' + nasaKey)
    .then(function(result){
            console.log(result);
            return result.json();
        })
        .then(function(json){
            displaySpirit(json);
    });     
}


function fetchOpportunity(e){
    e.preventDefault();

    console.log(e);

    if (opportunityDate.value == ''){
        console.log('No date found for Opportunity!');
        return;
    }

    fetch(opportunityURL + '?earth_date=' + opportunityDate.value + '&api_key=' + nasaKey)
    .then(function(result) {
        console.log(result);
        return result.json();
    })
    .then(function(json) {
        displayOpportunity(json);
    });
}


function fetchCuriosity(e){
    e.preventDefault();

    console.log(e);

    if (curiosityDate.value == ''){
        console.log('No date found for curiosity!');
        return;
    }

    fetch(curiosityURL + '?earth_date=' + curiosityDate.value + '&api_key=' + nasaKey)
    .then(function(result){
            console.log(result);
            return result.json();
        })
    .then(function(json){
            displayCuriosity(json);
        });
}




// DISPLAY FUNCTIONS

function displaySpirit(json){
    console.log('Display Spirit Results', json);
    while (roverSection.firstChild){
        roverSection.removeChild(roverSection.firstChild);
    }
    
    let photos = json.photos;
    
    if(photos.length === 0) {
        console.log("No Results for this day")
        return;
    }

    for (let i = 0; i < photos.length; i++){
        
        let photo = document.createElement('img');
        
        let current = photos[i];
        
        photo.src = current.img_src;
        
        roverSection.appendChild(photo);
    }  
}


function displayOpportunity(json){
    console.log('Display Opportunity Results', json);
    while (roverSection.firstChild){
        roverSection.removeChild(roverSection.firstChild);
    }

    let photos = json.photos;
    
    if(photos.length === 0){
        console.log("No Results for this day")
        return;
    }

    for (let i = 0; i < photos.length; i++){

        let photo = document.createElement('img');
        
        let current = photos[i];

        photo.src = current.img_src;

        roverSection.appendChild(photo);
    }
}


function displayCuriosity(json){
    console.log('Display Curiosity Results', json);
    while (roverSection.firstChild){
        roverSection.removeChild(roverSection.firstChild);
    }

    let photos = json.photos;

    if(photos.length === 0){
        console.log("No Results for this day")
        return;
    }

    for (let i = 0; i < photos.length; i++){

        let photo = document.createElement('img');
        
        let current = photos[i];

        photo.src = current.img_src;

        roverSection.appendChild(photo);
    }
}




// /8itUrl= `${spiritURL}?earth_date=${earthDate}&api_key=${nasaKey}`;

    // console.log(picUrl);
    // console.log(curiosityUrlTemp);
    // console.log(opportunityUrl);
    // console.log(spiritUrl);



     // curiosityUrl= `${curiosityURL}?earth_date=${earthDate}&api_key=${nasaKey}`;
    // curiosityUrl = `${curiosityURL}`;
    // curiosityV2 = `${curiosityURL}?api_key=${nasaKey}`;
    // opportunityUrl= `${opportunityURL}?earth_date=${earthDate}&api_key=${nasaKey}`;
    // spiritUrl= `${spiritURL}?earth_date=${earthDate}&api_key=${nasaKey}`;

    // console.log(curiosityUrl);
    // console.log(opportunityUrl);
    // console.log(spiritUrl);



    // let photoTest = json.photos;
    // console.log(photos);
    // console.log("photo Test", photoTest);

    // console.log(current.img_srSc); // does find img src photo link

        // img.src = current.id;
        // console.log(img.src); 

        // console.log("current", current);

           // if (photos.length === 10){
    //     nav.style.display = 'block';
    // }else {
    //     nav.style.display = 'none';
    // }


    // function fetchResults(e){
//     e.preventDefault();

//     console.log(e);


//     if (earthDate.value !== ''){
//         console.log(earthDate.value);
//         curiosityUrl = curiosityURL + '?earth_date=' + earthDate.value + '&api_key=' + nasaKey;
//         opportunityUrl = opportunityURL + '?earth_date=' + earthDate.value + '&api_key=' + nasaKey;
//         spiritUrl = spiritURL + '?earth_date=' + earthDate.value + '&api_key=' + nasaKey;

//     }



//     fetch(spiritUrl)
//     .then(function(result){
//             console.log(result);
//              return result.json();
//         })
//     .then(function(json){
//             displaySpirit(json);
//         });

//     fetch(opportunityUrl)
//     .then(function(result){
//             console.log(result);
//             return result.json();
//         })
//     .then(function(json){
//             displayOpportunity(json);
//         });
  
//     fetch(curiosityUrl)
//     .then(function(result){
//             console.log(result);
//             return result.json();
//         })
//     .then(function(json){
//             displayCuriosity(json);
//         });




// }
