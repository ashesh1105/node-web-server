const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 5555
const log = console.log

const multer = require('multer')    // helps on file upload, form-data, etc: https://www.npmjs.com/package/multer
const myUpload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000  // bytes in size. trying to upload file > 1MB will get error: "MulterError: File too large"
    },
    // Restrict upload to certain file extension, say PDF
    fileFilter(req, file, cb) { // cb means call back. Documentation: https://www.npmjs.com/package/multer

        if (!file.originalname.match(/\.(doc|docx)$/)) {    // use regex with match method
            return cb(new Error('Please upload Word Documents only!'))
        }

        cb(undefined, true)

        // This is how to call cb for error or no error conditions:
        // cb(new Error('Please upload PDF files only!'))  // send error message
        // cb(undefined, false)    // Failure but silently rejecting it
        // cb(undefined, true) // Successful case

    }
})

// upload.single() is the middleware function coming from multer
app.post('/upload', myUpload.single('uploadFileName'), (req, res) => {    // 'uploadName' needs to match the key sent via form-data!
    res.send()
}, (error, req, res, next) => { // This will handle any errors coming from our middleware function myUpload.single()
    res.status(400).send({ error: error.message })
})


