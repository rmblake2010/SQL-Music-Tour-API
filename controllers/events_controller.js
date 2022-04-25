//DEPENDENCIES
const events = require('express').Router()
const db = require('../models')
const { Event } = db

//ROUTES

//Index 
events.get('/', async (req, res) => {
    try{
        const foundEvents = await Event.findAll()
        res.status(200).json(foundEvents)
    } catch(error) {
        res.status(500).json(error)
    }
})

//Event by ID
events.get('/:id', async (req, res) => {
    try{
        const foundEvent = await Event.findOne({
            where: { event_id: req.params.id }
        })
        res.status(200).json(foundEvent)
    } catch(error) {
        res.status(500).json(error)
    }
})

//Post event
events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Success!',
            data: newEvent
        })
    } catch(error) {
        res.status(500).json(error)
    }
})

//Update Event
events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvents} event(s)`
        })
    }catch (error){
        res.status(500).json(error)
    }
})

//Delete Event
events.delete('/:id', async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} event(s)`
        })
    } catch(error){
        res.status(500).json(error)
    }
})

//EXPORT
module.exports = events