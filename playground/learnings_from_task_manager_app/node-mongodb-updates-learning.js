const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const log = console.log

// Create our own id instead of relying on MongoDB's ObjectId
const id = new ObjectID()   // incase we want to provide our own id during inserts

// Connect to MongoDB. Old URL Parser has been deprecated, so specifying new one under options { }
MongoClient.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error, client) => {
    if (error) {
        return log('Unable to connect to database!')    // return helps to not run anything after this
    }

    // db method on client gives reference to a specific database
    const db = client.db(databaseName)

    // updateOne example with promise. You can assign a variable when you create a promise
    const updateOnePromise = db.collection('users').updateOne({ _id: ObjectID('5e1242c730d7464423e9fe57') },
        {
            // $set only affects the fields we list it out, if none, no change it'll cause!
            $set: {
                name: 'Mike',
                interest: 'Golf'
            }
        })
    // Now, let's call the update function now and print either result or error
    // You can decide to define and call the update function at the same time too
    // More update operators are here: https://docs.mongodb.com/manual/reference/operator/update/
    updateOnePromise.then((result) => {
        log(result)
    }).catch((error) => {
        log(error)
    })

    // Another updateOne example with promise and $inc operator. Increment age of Jen by 5!
    // While running this, note the modifiedCount and matchedCount as part of results:
    db.collection('users').updateOne({ _id: ObjectID('5e124703b9f6da4e1beb67db') },
        {
            // Increment operator. It increments the field by given number (+ve or -ve)
            $inc: {
                age: 5
            }
        }).then((result) => {
            log(result) // This should execute and Jen's age should increment by 5!
        }).catch((error) => {
            log(error)  // Sorry if you get here instead of success :(
        })

    // updateMany example 
    // https://docs.mongodb.com/manual/reference/method/db.collection.updateMany/index.html
    db.collection('tasks').updateMany(
        // Filter criteria
        { completed: false },
        // List of operation we want to do. Using $set operator here
        {
            $set: {
                completed: true
            }
        }).then((result) => {
            log(result)
        }).catch((error) => {
            log(error)
        })
})
