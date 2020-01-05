// Let's grab the form element from HTML file that embeds this client side JavaScript
const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')

// querySelector takes a # befor id name. For UI elements, you can use as such, like 'input'
const forecastPlaceholder = document.querySelector('#message-1')
const locationPlaceholder = document.querySelector('#message-2')

// Add listener to form element
weatherForm.addEventListener('submit', (e) => {
    // Prevent browser to get reloaded so values associated with DOM elements and console are not lost!
    e.preventDefault()

    // Extract user input from search input text box and form the URL to be sent to Weather API
    let location = searchInput.value
    let baseUrl = '/weather'
    let url = baseUrl + '?address=' + location

    // Clear other placeholders and show 'Loading...' on first one till data gets fetched
    forecastPlaceholder.textContent = 'Loading...'
    locationPlaceholder.textContent = ''

    // fetch is not a Node API and can only be used on browsers, not at back-end
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                forecastPlaceholder.textContent = 'Error: ' + data.error
                locationPlaceholder.textContent = ''
            } else {
                forecastPlaceholder.textContent = 'Forecast: ' + data.forecast
                locationPlaceholder.textContent = 'Location: ' + data.location
            }
        })
    })
})