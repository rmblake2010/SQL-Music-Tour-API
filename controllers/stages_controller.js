//DEPENDENCIES
const stages = require('express').Router()
const db = require('../models')
const { Stage } = db

//Routes

//Index
stages.get('/', async (req, res) => {
    try{
    const foundStages = await Stage.findAll()
    res.status(200).json(foundStages)
    } catch(error) {
        res.status(500).json(error)
    }
}) 

//Stage by ID
stages.get('/:id', async (req, res) => {
    try{
        const foundStage = await Stage.findOne({
            where: { stage_id: req.params.id }         
        })  
        res.status(200).json(foundStage)
    } catch(error) {
        res.status(500).json(error)
    }
})

//Post stage
stages.post('/', async (req, res) => {
    try{
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'Successfully created new stage!',
            data: newStage
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

//Update stage
stages.put('/:id', async (req, res) => {
    try{
        const updatedStage = await Stage.update(req.body, {
            where: {stage_id : req.params.id}
        })
        res.status(200).json({
            message: `Succesfully updated ${updatedStage} stage(s)`
        })
    } catch(error) {
        res.status(500).json(error)
    }
})

//Delete Stage
stages.delete('/:id', async (req, res) => {
    try{
        const deletedStage = await Stage.destroy({
            where: {stage_id: req.params.id}
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStage} stages(s)`
        })
    } catch(error){
        res.status(500).json(error)
    }
})


//EXPORT
module.exports = stages