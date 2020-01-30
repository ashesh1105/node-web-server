require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')

// Promise chaining helps run as many nested calls as we want without nesting them and making
// it difficult to read and maintain the code! Trick here is to add "return" when another
// async call is made within a "then" call. return statement helps return another promise and
// you can then add your "then" statement for that (2nd) call outside of the first "then" block.
// Also, you can add catch block once you're done with "then" calls. This keeps the code super clean!
User.findByIdAndUpdate('5e18819de91d358e4baf2a8b', {
    age: 1
}).then((user) => {
    // Use the result from first async call to make another async call.
    return User.countDocuments({ age: 1 }) // return statement here, so a new promise is returned!
}).then((count) => {    // Note, the 2nd then statement is outside of first then block!
    console.log('Count of users with age 1:', count)
}).catch((e) => {   // catch can be put at the end, so no nesting at all!!
    console.log(e)
})

// Another promise chaining example. Delete one doc with id given and then count all with criteria
Task.findByIdAndDelete('5e195cb133fae741789fc368').then((task) => {
    console.log('Deleted Task:', task)
    return Task.countDocuments({ completed: false })
}).then((count) => {
    console.log('Count of uncompleted tasks:', count)
}).catch((e) => {
    console.log(e)
})

// Let's try to redo above using async - await feature and see how it simplifies code
// Define the function with async - await and wrap the async calls in it
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })  // ES6 syntax: {age: age} not needed!
    const count = await User.countDocuments({ age })
    return count
}
// Now call that function. Much simpler and easier to read, right?
updateAgeAndCount('5e18819de91d358e4baf2a8b', 1).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})

// Same way, let's define another function above with promise chaining
const deleteOneAndCountIncompletedTasks = async (id) => {
    // If you don't need task, you could also do: await Task.findByIdAndDelete(id) for same result
    const task = await Task.findByIdAndDelete(id)
    console.log(task)
    const count = Task.countDocuments({ completed: false })
    return count
}
// Now call this function - again easier than even promise chaining, right?
deleteOneAndCountIncompletedTasks('5e195cb133fae741789fc368').then(result => {
    console.log(result)
}).catch(e => {
    console.log(e)
})
