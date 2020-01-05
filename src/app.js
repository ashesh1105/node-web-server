// Core Modules
const path = require('path')

// npm packages
const express = require('express')  // if node can't find node_modules, do npm install from root
const hbs = require('hbs')

// Custom packages
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const log = console.log
// const port = 5555    // Don't use port numer when deploying to Heroku! Heroku sets their own
// This helps Heroku to set port everytime dynamically. || helps to run same file locally,
// meaning when process.env.PORT is undefined, 5555 is assigned to port variable, use it locally!
const port = process.env.PORT || 5555

// Define paths (express configs)
const publicDirectoryPath = path.join(__dirname, '../public')   // For static contents like images, css
const viewsPath = path.join(__dirname, '../templates/views')  // change hbr default "views" location
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

// Set up handlebars engine and views locations

// Tell express that we want to use npm hbs package as templating engine which uses npm handlebars package
// which inturn uses mustache behind the scene. It is hard to make handlebars directly with express
// Once done, we can use hbs to create some dynamic templates, say, for header and footer
// hbs can also be done to set up homepage, other than index.html. I am keeping it under /views folder
app.set('view engine', 'hbs')   // 'view engine' must be typed as it is!

// By default express looks for handlebars templates under /views location. If you change views to
// say, templates, you'll get error like this: Failed to lookup view "index" in views directory 
// "/Users/asheshsingh/Documents/techstuff/JavaScript/Node.JS/nodejs-project/03_web-server/views"
// To fix it, i.e., to change the default location for dynamic templates from "views" to whatever
// you need, define a constant viewsPath (like above) and set that with key as 'views'
app.set('views', viewsPath)

// Set up static directory to serve from
// to use public directory for static contents. Think if of it as "public" directory added to "classpath"
// Hence root of the app will now serve index.html from public directory!
app.use(express.static(publicDirectoryPath))

// Set partials path (say for header, footer, etc)
hbs.registerPartials(partialsPath)

// Imagine we own a domain app.com with routes like app.com/help and app.com/about
// Path: http://localhost:5555/ (since we use 5555 port while starting the server)
// Since we set up public directory with app.use above, root of app will serve index.html under it.
// Hence below res.send will actually never run, so it is commented out here:
// app.get('', (req, res) => {
//     res.send('<h1>Weather App</h1><br />Hello express from node web-server!')
// })

// Below route allows hbs templates to run! Note we use res.render here and not res.send
// Also note, we don't need extention, just res.render('index') is enough for express to use hbs,
// check for index.hbs template inside /views folder. converts it to html and render that on browser!
// Second argument passed to render allows us to inject key-value pairs to be used in templates

// Base path for this app
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Ashesh"
    })
})

// about path
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Weather App",
        name: "Ashesh"
    })
})

// help path
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        helpText: "How may I help you?",
        name: "Ashesh"
    })
})

// Path for anything after /help: /help/*
// Catch All for help page. Something like /help/<anything here>, e.g., /help/test will see this route
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 - Help Page',
        notFoundMessage: 'Help article not found!',
        name: 'Ashesh'
    })
})

// Weather Page Route
// Path: http://localhost:5555/weather?address=San%20Jose,%20CA (query string can be anything)
// Make address as mandatory to be passed with this route as query string
app.get('/weather', (req, res) => {

    let address = req.query.address
    if (!address) {
        // return is needed here so node doesn't complain for another res.send below this if statement
        return res.send({
            error: 'You must send a valid address to fetch local weather!'
        })
    }

    // Call MapBox to get geocode
    geocode(address, (error, geoDataResponse) => {
        if (error) {
            return res.send({
                error: 'Error getting geocode data. Try another search.'
            })
        } else {
            // Pass geocode to Dark Sky API to get weather data and send the response
            weather(geoDataResponse.latitude, geoDataResponse.longitude, (error, weatherResponse) => {
                if (error) {
                    return res.send({
                        error: 'Error fetching weather data.'
                    })
                } else {
                    // Valid case when address is actually sent
                    res.send({
                        forecast: weatherResponse.summary
                            + ' There\'s currently ' + weatherResponse.temperature
                            + ' degrees out. There is a ' + weatherResponse.precipProbability * 100
                            + '% chances of rain.',
                        location: address
                    })
                }
            })
        }
    })
})

// Path /products, path could also be like: http://localhost:5555/products?search=games&rating=5
app.get('/products', (req, res) => {
    // log(req.query)  // Will print key value pairs passed, e.g., { search: 'games', rating: '5' }
    if (!req.query.search) {
        // return is needed here so node doesn't complain for another res.send below this if statement
        return res.send({
            error: 'You must provide the search term as query string!'
        })
    }

    res.send({
        products: []
    })
})

// 404 Path with wildcard character (*) as path. Catch All Path
// This path needs to be at the end since when no path matches till this point, below path gets in action
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        notFoundMessage: 'My 404 Page',
        name: 'Ashesh'
    })
})

// Start the node server now. Run it in browser as: http://localhost:5555/
app.listen(port, () => {
    log('Node server is up on port', port)
})