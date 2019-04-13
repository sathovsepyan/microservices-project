const bookingSchema = (joi) => ({
    doctorName: joi.string(),
    doctorType: joi.number(),
    start: joi.date().min('now'),
    duration: joi.number(),
    address: joi.string()
  })
  
  module.exports = bookingSchema
  