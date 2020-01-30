const mongoose = require('mongoose')
const validator = require('validator')  // npm package to validate anything

const connectionURL = 'mongodb://127.0.0.1:27017/'
const databaseName = 'task-manager-api'
mongoose.connect(connectionURL + databaseName, {    // db name is part of URL in mongoose
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const log = console.log

// Create model(s)
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,  // Makes this field mandatory to be provided
        trim: true  // coming from npm validator. remove spaces before and after
    },
    age: {
        type: Number,
        validate(value) {   // available from JavaScript
            if (value <= 0) {
                throw new Error('Please provide a valid age (>= 0 years)!')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true, // coming from npm validator - order of these options are not important
        lowercase: true, // coming from npm validator
        validate(value) {
            // Using validator npm package. There are many more validations with npm validator:
            // as documented on their site: https://www.npmjs.com/package/validator
            if (!validator.isEmail(value)) {
                throw new Error('Please enter valid email address!')
            }
        }
    }
})

// Instantiate the model to create a user (using a variable)
// Mongoose will change User to "users" and save that as collection name!
const david = new User({
    name: '    Ashesh   ',  // npm validator will trim the space since model specifies it!
    // npm validator will trim the space and lowercase it since model specifies it!
    email: '  MYEMAIL@ashesh.com  ',    // validator will also ensure email is valid!
    // age: 49  // Not required since we did not say required: true for age!
})

// Save the model. This should go successfully
david.save().then((david) => {
    log(david)
}).catch((error) => {
    log('Error!', error)
})

// Error situation
new User({
    name: 'Chris',
    // age: "age"   // should be Number, so it will cause error like User validation failed: age:..
    // age: -1 // Same here, this will be an error: "User validation failed: age: Please provide a valid age"
    // age: 0  // Again, your custom validation will kick in here too and age: 0 will not be allowed
    age: 34, // This will go through and user Amy will be created!
    // email: 'abcd'   // This will throw an error as 'Please enter valid email address!'
    // email: 'xyz@gmail'  // Same as above, since xyz@email.com is not a valid email address!
    email: 'abc@vrf.com'    // This will go through!
}).save().then((user) => {
    log(user)
}).catch((error) => {
    log('Error!', error)
})

// Create one more model and save an instance of that
// Mongoose will change "Tasks" to "tasks" and save that as collection name
const Tasks = mongoose.model('Tasks', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false   // ensures there's default values saved in DB, if not provided!
    }
})

const task = new Tasks({
    description: "Learn the Mongoose Library",
    completed: false
})

task.save().then((task) => {
    log(task)
}).catch((error) => {
    log('Error!', error)
})

new Tasks({
    description: "  Complete NodeJS tutorial asap!  ",   // trim will help here!
    completed: false // false is default value provided from model anyway!
}).save().then((task) => {
    log(task)
}).catch((error) => {
    log('Error!', error)
})