// Normal function
const doWork = () => {

}

// An async function. Just add async keyword before function
const doAsyncWork = async () => {

}

// If we do not return anything fromn a function, we know JavaScript returns undefined
console.log(doWork())   // returns: undefined

// If we now call our async function, we will get a Promise instead and inside value of that
// again will be undefined, since we aren't returning anything from doAsyncWork
console.log(doAsyncWork())  // returns: Promise { undefined }

// Another async function, let's return something from it
const doAsyncReturn = async () => {
    return 'Ashesh'
}

// Call above async function
// A promise will be retunred which got fulfilled with String 'Ashesh' 
console.log(doAsyncReturn())  // returns Promise { 'Ashesh' }

// Since doAsyncReturn function returns a promise with result, if we call it directly:
doAsyncReturn().then((result) => {
    console.log(result) // This line will print: 'Ashesh'
}).catch((error) => {
    console.log(error)
})

// This is how we can return an error from an async function, which will then return a Promise
// to called which has been rejected with error message:
const doAyncRejected = async () => {
    throw new Error('Error! ' + 'Your computing went wrong!')
}

// Call above function now and see the rejected promise:
doAyncRejected().then((result) => {
    console.log(result)
}).catch((error) => {
    // Below will execute in this case since we get a rejected Promise!
    console.log(error)  // returns: 'Error: Your computing went wrong!'
})

// Now, what is await and what it does? That's the other half of async - await feature
// Both of them together make it easier to make it easier to work with async functions
// Say, we have an async function that returns a promise where we resolve a result:
const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Say, we wait all the arguments to be a positive number
            if (a < 0 || b < 0) {
                // return with reject helps stop the execution right here
                return reject('Error! You need to pass positive numbers!')
            }
            resolve(a + b)
        }, 2000)    // wait 2 seconds and then send a promise with value a+b
    })
}
// In above, if we have to use it 2 times with promise chaining, 
// and without async - await, this is how we will use it:
add(3, 4).then((sum) => {
    return add(sum, 7)
}).then((result) => {
    console.log(result) // This line with execute and print: 14 (after about 4 seconds)
}).catch((error) => {
    console.log(error)
})

// With async - await, you do not have to change the underlying or preexisting async functions,
// You just wrap them around your own async function and use await inside yours for everything
// to look more like a sync call, and improve the code readability and maintainability!
// With async - await, if you have to call add function twice, this is how you do it:
const doAddWork = async () => {
    const sum = await add(3, 4) // await makes async function call more like sync ones!
    const sum2 = await add(sum, 7)
    const sum3 = await add(sum2, 8)
    // You call sum as many times as you want, and finally use the result..
    return sum3
}
doAddWork().then((result) => {
    console.log(result) // You get result as 22 after about 6 seconds
}).catch((error) => {
    // Below would execute if 1st, 2nd or 3rd call passed a negative number as defined in add function
    // Time it will take to get here will depend on which add call passes negative number
    console.log(error)
})

// Another big advantage with async - await is, you have access to all the intermediate variables
// in same scope, like sum, sum2, sum3, etc., and not like promise chaining where you have next
// intermediate result under next then block, which is outside of current one, so you're forced
// to use global variables, whcih is bad!


