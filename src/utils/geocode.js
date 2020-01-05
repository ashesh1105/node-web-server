const request = require('request')
const log = console.log

// Define Geocoding API with callback so caller can leverage response anyway (s)he needs
const geocode = (address, callback) => {  // vicinity could be state, may be
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
        + encodeURIComponent(address)
        + '.json?access_token=pk.eyJ1IjoiYXNoZXNoMTEwNSIsImEiOiJjazRvcnkwMTAybDkyM21sYjNlcTEwbnFiIn0.L3_GGgwfyCMhK57dN5t6Pg'

    request({ url: geoCodeUrl, json: true }, (error, response) => {
        if (error) {
            callback('Error connecting to Mapbox Service!', undefined)
        } else if (response.body.error || response.body.features.length === 0) {
            callback('Unable to find location! Try another search!')
        } else {
            let geoData = response.body.features[0]
            if (geoData) {
                callback(undefined, {
                    "place": geoData.place_name,
                    "longitude": geoData.center[0],
                    "latitude": geoData.center[1]
                })
            } else {
                callback(undefined, {
                    "NoResultsErr": "Unable to find geo location! Try another search!"
                })
            }

        }
    })
}

module.exports = geocode