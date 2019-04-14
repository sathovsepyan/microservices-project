'use strict';
const status = require('http-status')
const uuid = require('uuid/v1');
const fs = require('fs')

const slots_path = "./slots.json"

module.exports = (app) => {
    //list all available slots
    app.get('/booking/slots', (req, res, next) => {
        let slots;
        try {
            slots = JSON.parse(fs.readFileSync(slots_path, 'utf8'));
            slots = slots.filter(slot => slot.available);
        } catch (err) {
            console.error(err)
            slots = [];
        }
        res.status(status.OK).json(slots)
    })

    //create new slot
    app.post('/booking/slots/slot', (req, res, next) => {
        try {
            let slots = JSON.parse(fs.readFileSync(slots_path, 'utf8'));
            slots.push(req.body)

            fs.writeFileSync(slots_path, JSON.stringify(slots))
        } catch (err) {
            console.error(err)
            return res.status(500).json({
                message: err.message
            });
        }

        res.status(status.OK).json({
            message: "Slot successfully added!"
        });
    })

    //book current slot
    app.post('/booking/slots/:id/book', (req, res, next) => {
        let id = req.params.id;

        try {
            let slots = JSON.parse(fs.readFileSync(slots_path, 'utf8'));
            let slot = slots.find(slot => slot.id = id);
            slot.available = false;

            fs.writeFileSync(slots_path, JSON.stringify(slots))
        } catch (err) {
            console.error(err)
            return res.status(500).json({
                message: "An error accured booking the slot."
            });
        }
        res.status(status.OK).json({
            message: "The slot was successfully booked"
        });
    })
}