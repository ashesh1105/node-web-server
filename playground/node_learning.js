const path = require('path')

const express = require('express')

const log = console.log

const app = express()

// Special note: command "nodemon ./src/app.js -e js,hbs" not only keeps the node server up
// all the time but also restarts whenever a change made to either .js and .hbs files!

// __dirname is a special variable that gives path of current directory from root of computer
// Below is the absolute path that __dirname will print:
// /Users/asheshsingh/Documents/techstuff/JavaScript/Node.JS/nodejs-project/03_web-server/playground
log('Absolute path of this directory from root:', __dirname)

// __filename is a special variable that gives path of current file from root of computer
// Below is the absolute path that __filename will print:
// /Users/asheshsingh/Documents/techstuff/JavaScript/Node.JS/nodejs-project/03_web-server/playground
log('Absolute path of this file from root:', __filename)

log('Manupulating the default path from root for this directory:')
// Below will go up by one direcotory (due to ..) and then add /public to it and print:
// /Users/asheshsingh/Documents/techstuff/JavaScript/Node.JS/nodejs-project/03_web-server/public
log(path.join(__dirname, '../public'))

// You can use above functionality of path to tell express to always use a directory for static contents:
// const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

/*
Once you set up app to use a static directory, meaning add that to "classpath", you can serve
static pages from there. index.html will be served by default from root but for other pages like help.html,
about.html, you will have to specify those routes on URL. When done, and since we are serving HTML
pages and not raw text or JSON data, below lines are not needed in app.js:
*/
// Help Page Route
// Path: http://localhost:5555/help.
// With app.get(), you can send plain text, JSON or even HTML data back
app.get('/help', (req, res) => {
    // Delivering JSON data. You can send one object like below or an array of objects [{}, []..]
    res.send({
        appName: 'WeatherApp',
        keyFunctionality: 'Tells Local Weather',
        homePage: 'http://localhost:' + port + '/'
    })
})

// About Page Route
// Path: http://localhost:5555/about
app.get('/about', (req, res) => {
    res.send('Let me know what are you curious to know about me!'
        + '<br><br><br><a href="http://localhost:'
        + port
        + '/"><b>Home Page:</b></a>')
})

// If you want nodemon command to restart server each time an hbs file also change instead of just
// the .js files by default, use this command nodemon <path+filename of app.js> -e js,hbs...
// So with -e option, we can give all the file extension to nodemon so server starts with their
// changes as well!

// Default method arguments
hello = (name) => {
    log('Hello', name)
}
hello('Ashesh') // will print Hello Ashesh
// How about this?
hello() // will print Hello undefined, right? Here's how you can avoid this:
helloAnother = (name = 'Someone') => {
    log('Hello', name)
}
helloAnother()  // will print: Hello Someone
helloAnother('David')   // will print Hello David


// Destructuring objects - setting default arguments for functions
const transactions = (type, { label, stock }) => {
    log(type, label, stock)
}
transactions('order', { label: 'Amazon', stock: 1000 }) // prints order Amazon 1000
// transactions('order')   // This line will cause as error as below:
// TypeError: Cannot destructure property `label` of 'undefined' or 'null'.
// Here's how we can fix above by setting a default as empty object
const transactionsAnother = (type, { label, stock = 0 } = {}) => {
    log(type, label, stock)
}
transactionsAnother('order')    // No error now! it will print: order undefined 0
transactionsAnother('sales', { label: 'Target', stock: 2000 })    // will print sales Target 2000 !!
// we can even construct an object and pass that:
const product = {
    label: 'Target',
    stock: 5000
}
transactionsAnother('sales', product)   // still prints sales Target 5000 !!