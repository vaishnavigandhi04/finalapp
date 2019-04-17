const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 8080;

var app = express();
const request = require('request');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    response.render('main.hbs');
});

// var result='';
// var country = 'canada'
// var errormessage = ''
// var getWeather = async function()
// {
//     try{
//         capitalResult =  await from_api.getcapital(country);
//         weatherResult = await from_api.getWeather(capitalResult,country);
//         result = `the weather in ${capitalResult}, capital of ${country} is
//         ${JSON.stringify(Weatherresult.temp)} with wind speed of ${JSON.stringify(Weatherresult.wind)}`;
//     }
//     catch(error) {
//         result = error;
//     }
// }

nasakey = 'iC3vGezsVjUwXz4DVYkhkHBHmaHFrycCLW0zrhPE';

var result='';
var country = 'canada'
var getcapital = ((country) => {
    return new Promise((resolve, reject) =>{
        request({
            // https://restcountries.eu/rest/v2/name/canada?fullText=true
            url: `https://restcountries.eu/rest/v2/name/` + encodeURIComponent(country) + `?fullText=true`,
            json: true
        }, (error, response, body) => {
            // console.log(body)
            if(error) {
                reject(error);
            }
            else if (body.status == '404')
            {
                reject(body.message);
            }
            else
            {
                resolve(body[0].capital);
            }
        });
    });
});

var getWeather = ((city, country) => {
    return new Promise((resolve, reject) => {
        request({
            // https://api.openweathermap.org/data/2.5/weather?q=ottawa,canada&appid=2264e3b73dc094131aeb3adfa3d71b61
            url: `https://api.openweathermap.org/data/2.5/weather?q=`+ encodeURIComponent(city) +',' + encodeURIComponent(country) + `&appid=2264e3b73dc094131aeb3adfa3d71b61`,
            json:true
        }, (error, response, body) => {
            resolve({
                temp: body.main.temp,
                wind: body.wind.speed

            });
        });
    });
});
getcapital(country).then((capital) =>{
    getWeather(capital, country).then((weather) =>{
        result = `the weather in ${capital}, capital of ${country} is 
        ${JSON.stringify(weather.temp)} with wind speed of ${JSON.stringify(weather.wind)}`;
    })
}).catch((error) =>{
    result = error;
});

app.get('/weather', (request, response)=> {
    response.render('weather.hbs', {
        weather: result
    });
});

app.get('/info', (request, response) => {
    response.send('my info page');
});

app.get('/404', (request, response) => {
    response.send({
        error: "page not found"

    })
});
app.listen(port, () => {
    console.log(`server is up on the port ${port}`);
});