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

    // collection method on db is used to insert data to a collection by specifying it as argument
    db.collection('users').insertOne({  // inserts one record at a time
        _id: id,    // So we can provide objectId of our own, if we need to
        name: 'Vikram',
        age: 26
    }, (error, result) => {
        if (error) {
            return log('Unable to insert user')
        }
        // ops is an array of documents (one document in this case)
        log(result.ops)
    })

    // http://mongodb.github.io/node-mongodb-native/3.4/api/Collection.html#insertMany
    db.collection('users').insertMany([
        {
            name: 'Jen',
            age: 28
        }, {
            name: 'Gunther',
            age: 31
        }
    ], (error, result) => {
        if (error) {
            return log('Unable to insert documents!')
        }
        log(result.ops)
    })

    db.collection('tasks').insertMany([
        {
            description: "Go to South San Jose today at 5 PM",
            completed: false
        },
        {
            description: "Submit feedbacks for interview last Friday",
            completed: false
        },
        {
            description: "Follow up with Airline Company for Refunds",
            completed: true
        }
    ], (error, result) => {
        if (error) {
            return log('Unable to insert documents!')
        }
        log(result.ops)
    })
})
