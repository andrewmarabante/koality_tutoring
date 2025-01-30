const Schedule = require('../models/schedule');


function getSchedule(req,res){

    Schedule.aggregate([
        {
          $sort: { createdAt: -1 } // Sort by creation date (newest first)
        },
        {
          $group: {
            _id: { 
                start: { $dateToString: { format: "%Y-%m-%d",           date: {
                    $dateFromParts: {
                      year: { $year: { date: "$week.start", timezone: "America/Los_Angeles" } }, 
                      month: { $month: { date: "$week.start", timezone: "America/Los_Angeles" } }, 
                      day: { $dayOfMonth: { date: "$week.start", timezone: "America/Los_Angeles" } }
                    }
                  } } } 
              }, // Group by week.start
            latestSchedule: { $first: "$$ROOT" } // Pick the first (latest) document in each group
          }
        },
        {
          $replaceRoot: { newRoot: "$latestSchedule" } // Replace result structure
        }
      ])
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => res.status(500).json(err))
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