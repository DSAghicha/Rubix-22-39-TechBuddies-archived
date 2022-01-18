const express = require('express')
const bodyParser = require('body-parser')

require("dotenv").config({path: "./config.env"})
const port = process.env.PORT || 5000

// User Model
// const userModel = require('.')


const app = express()

// Body Parser Middleware
app.use(bodyParser.json())


const driver = require("./db/connect")

app.listen(port, () => {
    driver.connectToServer(function(err){
        if (err) console.error(err);
    })

    console.log(`Server running @${port}`);
})