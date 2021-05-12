/* 
! Steps /  Goals to follow:
    1 - Use the picutre of the day API to pull up the potd and display it.
        - Using that same API, pull up info about that picutre.
    2 - Using a second API, pull up a variety of photos from the mars rover photos
    3 - Pull up weather from the mars weather API
    
! Concepts / Adjustments:
    - Have some form of search feature or input that allows user interaction. Like the NYT API project

*/



const podURL = 'https://api.nasa.gov/planetary/apod';
const weaURL = 'https://api.nasa.gov/insight_weather/';
const rovURL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/';
const key = 'etNSjeDShl1hKrd1Wy8BSTb4YGndNYpgbDa77COF';
let picUrl;
let weatherUrl;
let roverUrl;
const searchForm = document.querySelector('form');
const dailyImgSection = document.querySelector('section');
const roverSection = document.querySelector('.roverPicSection');


const potd = document.querySelector('.potdSection');


console.log(searchForm);
console.log(dailyImgSection);
console.log(roverSection);

// searchForm.addEventListener('submit', fetchRover);



    picUrl = `${podURL}?api_key=${key}`;
    weatherUrl = `${weaURL}?api_key=${key}&feedtype=json&ver-1.0`;
    roverUrl = `${rovURL}?api_key=${key}`
    console.log(picUrl);
    console.log(weatherUrl);
    console.log(roverUrl);
    

    // PICTURE OF THE  DAY
    fetch(picUrl)
    .then (function (result){
        // console.log(result);
        return result.json();
    })
    .then(function (json) {
        console.log(json);
        
      
        let img = document.createElement('img');
        let description = document.createElement('p');


        let dailyImage = img=json.url;
        let dailyDescript = json.explanation;

    
        console.log(dailyDescript);
        console.log(dailyImage);

        document.getElementById('dailyImage').src=dailyImage;
        dailyImgSection.appendChild(description);
        
        description.innerText=dailyDescript;
        
        
       
    
        
    })

    // WEATHER ON MARS
    
    fetch(weatherUrl)
    .then (function (result){
        // console.log(result);
        return result.json();
    })
    .then(function (json) {
        console.log(json);
        
    })




    // ROVER IMAGES

    fetch(roverUrl)
    .then (function (result){
        // console.log(result);
        return result.json();
    })
    .then(function (json) {
        console.log(json);
        
    })


    
    // function fetchRover(e){
    //     e.preventDefualt()
    //     roverUrl = `${rovURL}?api_key=${key}`;
        
    // fetch(roverUrl)
    // .then (function (result){
    //     console.log(result);
    //     return result.json();
    // })
    // .then(function (json) {
    //     console.log(json);
    //     displayRover(json);
        
    // })
    // }


    // function displayRover(json) {
    //     console.log('Display Results', json);
    //     while (roverSection.firstChild){
    //         section.removeChild(section.firstChild);
    //     }
    //     let rovers = json.rovers;
    // }




