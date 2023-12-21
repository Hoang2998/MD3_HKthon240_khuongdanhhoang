const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const cors = require('cors')
app.use(cors())
const route = require('./routes/Routes')
require('dotenv').config()

app.use("/", route)

app.listen( process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})