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

    // deleteMany example. Only filter should be enough, we don't have to pass options and
    // we can go for promise, so no callback is needed. In result, look for deletedCount: <number>
    db.collection('users').deleteMany({
        age: 26
    }).then((result) => {
        log(result)
    }).catch((error) => {
        log(error)
    })

    // deleteOne example. It is similar to above except this can delete only the first matched
    db.collection('users').deleteOne({
        interest: {
            $exists: true
        }
    }).then((result) => {
        log(result)
    }).catch((error) => {
        log(error)
    })
})
