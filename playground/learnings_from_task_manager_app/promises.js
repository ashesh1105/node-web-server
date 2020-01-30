// Promises build on callback pattern, making it easier to accomplish it.
// Let's see examples of callbacks Vs promise and compare them:

// A callback example:
const doWorkCallback = (callback) => {
    setTimeout(() => {
        // You can either have error:
        callback('This is my error from callback!', undefined)
        // Or no error but result:
        // callback(undefined, [1, 4, 7])
    }, 2000)
}

// This is how you call a function with callback:
doWorkCallback((error, result) => {
    if (error) {
        return console.log(error)   // if error, this will print: This is my error!
    }

    console.log('result from callback: ', result) // will print [1, 4, 7], if no error
})


// Now, this is how an equivalent Promise will look like:
const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // You can either have error where you'll reject with one argument as error message:
        reject('This is my error from promise!')
        // Or no error but result and you'll resolve with result found:
        // Since we called reject already above, below line will never get executed!
        resolve([2, 5, 9])
    }, 2000)
})

// And this is how you call a function that returns a Promise:
doWorkPromise.then((result) => {
    // will execute if promise resolved it
    console.log("result from promise:", result)
}).catch((error) => {
    // will execute if promise rejected it
    console.log(error)  // Only this get executed since reject called first in promise!
})

/*
Difference between callbacks and promises:
1) Only one argument is sent via Promise at a time, no need to add another one as undefined.
   So called does not has to expect and check both of them in nested function for promises.
2) With callbacks, its upto developers to write if-else to manage error or no error situation,
   which can be error prone. With promises, we get two separate functions (then and catch) and
   only one of them get run, so it is easier to manage these asynchronous tasks.
3) Another advantage with Promise is, it is not easy to mess up as someone provising a function.
   Meaning, I can not miss to pass results and undefined in different order, as I can do with
   callbacks, since promises allow us to either resolve or reject as two distinct functions and
   both of them take only one argument, not two! Once resolve or reject is called, we can not go
   back and change it as caller of the function.
*/

