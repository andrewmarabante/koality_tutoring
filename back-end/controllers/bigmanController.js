const Schedule = require('../models/schedule');


function getSchedule(req,res){
    console.log('here')
    res.json('hit')
}

function newSchedule(req, res){

    const availability = req.body.availability;
    const week = req.body.week;

    const newScheduleDetails = {
        availability: availability,
        week: week
    }

    const newSchedule =  new Schedule(newScheduleDetails)

    newSchedule.save()
    .then(() => res.status(200).json('saved'))
    .catch(err => res.status(500).json(err))

}

module.exports = {
    getSchedule,
    newSchedule
}