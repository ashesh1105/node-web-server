const jwt = require('jsonwebtoken')

const myFunction = async () => {
    // sign method on jsonwebtoken takes two arguments. 1) Object (data) that will be embedded
    // inside JWT Token, 2) a secret that will be used to sign the jwt token
    // We return the generated to token to the user who logs in, so this can be reused.
    // JWT Token has 3 pieces of info speparated by dot(.): Header, Payload and Signature
    // Payload, the middle part, can easily be decoded using: https://www.base64decode.org/
    // You get your data and iat, which is is "issued at", the timestamp.
    // JWT helps verify if the data was tempered or not!
    // You can pass an object as well with options like expiresIn
    const token = jwt.sign({ _id: 'abc123' }, 'secret123', {
        expiresIn: '24 hours'   // takes values like english, like 1 hour, 7 days, 1 week, etc.
    })
    console.log(token)  // prints jwt token

    // verify method tells if data was tempered or not. Returns data or error
    // takes two argument, the token you have and the secret used to create the token
    const verifiedData = jwt.verify(token, 'secret123')
    console.log(verifiedData)   // You should get { _id: 'abc123', iat: 1579124939 }
}

myFunction()