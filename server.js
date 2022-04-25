// DEPENDENCIES
const express = require('express')
const app = express()
const { Sequelize } = require('sequelize')

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//SEQUELIZE CONNECTION
const sequelize = new Sequelize(process.env.PG_URI, {password : "Vuh97426", username: 'user'})

sequelize.authenticate()
const connect = async () => {
    try{
        console.log(`Connect with Sequelize at ${process.env.PG_URI}`)
    } catch(err) {
        console.log(`Unable to connect to PG ${err}`)
    }
}
connect()


// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})


//CONTROLLERS
const bandsController = require('./controllers/bands_controller')
app.use('/bands', bandsController)
const eventsController = require('./controllers/events_controller')
app.use('/events', eventsController)


// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})