// CRUD Operations on MongoDB

// const mongodb = require('mongodb')  // npm library - native driver for MongoDB
// const MongoClient = mongodb.MongoClient // Need this to connect to MongoDB
// const ObjectID = mongodb.ObjectID

// Instead of doing above, you can use destructuring shortcut as below:
const { MongoClient, ObjectID } = require('mongodb')

// "locahost" sometimes slows down connection, so better to use IP: 127.0.0.1
const connectionURL = 'mongodb://127.0.0.1:27017'   // 27017 is defaut port for MongoDB
const databaseName = 'task-manager'

const log = console.log

// Create our own id instead of relying on MongoDB's ObjectId
const id = new ObjectID()   // incase we want to provide our own id
log(id) // prints the id, like: 5e124d663847cd5bebd1ecb1
// First 4 bytes of MongoDB ObjectId contains time in seconds since Unix epoch (Midnight Jan 1, 1970)
// returnns the timestamp on which this id was generated:
log(id.getTimestamp())  // prints something like: 2020-01-05T20:56:06.000Z

// Also note that MongoDB uses binary representation of ObjectId to compress the size to 12 bytes
// If we convert that to a string, size will doubled, as shown below
log(id.id.length)   // prints 12
log(id.toHexString().length)    // prints 24


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

    // Find by any set of fields
    db.collection('users').findOne({ name: 'Jen' }, (error, user) => {
        if (error) {
            return log('Could not find user!')
        }
        log(user)
    })

    // Find by _id. Remember you need to wrap the string id with new ObjectID function
    // since ObjectId is binary, you can't pass a string to it
    db.collection('users').findOne({ _id: new ObjectID('5e123b7e40ece2384049f23b') }, (error, user) => {
        if (error) {
            return log('Could not find user!')
        }
        log(user)
    })

    // Find multiple documents. find does not take callbacks, it returns a cursor which has 
    // methods like toArray(), which take callback, but not all of them, as documented here:
    // http://mongodb.github.io/node-mongodb-native/3.4/api/Cursor.html
    db.collection('users').find({ name: 'Ashesh' }).toArray((error, users) => {
        if (error) {
            return log('Count not find users')
        }
        log(users)
    })

    // Same query as above but using count function on returned cursor
    db.collection('users').find({ name: 'Ashesh' }).count((error, count) => {
        if (error) {
            return log('Could not reach documents to count!')
        }
        log('count:', count)
    })

    // Find last task in tasks collection
    db.collection('tasks').findOne({ _id: new ObjectID('5e1249130cd0ff5292a15e2c') }, (error, user) => {
        if (error) {
            return log('Count not find user in tasks collection with specified _id!')
        }
        log(user)
    })

    // Find taks which are not complete
    db.collection('tasks').find({ completed: false }).toArray((error, incompleteTasksArray) => {
        if (error) {
            return log('Error fetching incomplete tasks!')
        }
        log(incompleteTasksArray)
    })
})
