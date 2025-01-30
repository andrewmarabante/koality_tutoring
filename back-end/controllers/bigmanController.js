function getSchedule(req,res){
    console.log('here')
    res.json('hit')
}

function newSchedule(req, res){
    console.log(req.body)
    res.json('working')
}

module.exports = {
    getSchedule,
    newSchedule
}