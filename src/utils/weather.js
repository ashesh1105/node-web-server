const request = require('request')

const log = console.log

// Define weather API with callback so caller can leverage response anyway (s)he needs
const weather = (latitude, longitude, callback) => {
    const weatherUrl = 'https://api.darksky.net/forecast/c296769972699e2135f03709f04c6266/'
        + latitude + ',' + longitude
    request({ url: weatherUrl, json: true }, (error, response) => {
        if (error) {
            callback('Error connecting to Dark Sky URL!', undefined)
        } else if (!response.body.daily) {
            log(response.body)
        } else if (response.body.daily.data.length === 0) {
            callback('Unable to get response from Dark Sky API!', undefined)
        } else {
            // Since we'e passing parameter json: true with request, response will already be an 
            // object. Hence, no parsing required as below line
            // const data = JSON.parse(response.body)
            callback(undefined, {
                "summary": response.body.daily.data[0].summary,
                "temperature": response.body.currently.temperature,
                "precipProbability": response.body.currently.precipProbability,
                "highTemperature": response.body.daily.data[0].temperatureHigh,
                "lowTemperature": response.body.daily.data[0].temperatureLow
            })
        }
    })
}

module.exports = weather

