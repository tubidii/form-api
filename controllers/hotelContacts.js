const HotelContact = require('../models/HotelContact')

const getHotelContact = async (req, res, next) => {
  const hotelContacts = await HotelContact.find();
  res.status(200).json({count: hotelContacts.length, data: hotelContacts});
}

const getHotelContacts = async (req, res, next) => {
  const id = req.params.id
  const hotelContact = await HotelContact.findById(id).catch(() => {
    res.status(400)
      .json({data: 'Invalid id'})
  })

  if (!hotelContact) {
    res.status(404)
      .json({data: `HotelContact with id: ${id} not found`})
  }
  res.status(200)
    .json({count: 1, data: hotelContact})
}

const createHotelContact = async (req, res, next) => {
  const createdHotelContact = await HotelContact.create(req.body)
  res.status(201).json({success: true, data: createdHotelContact});
}

const updateHotelContact = async (req, res, next) => {
  const id = req.params.id
  const hotelContact = await HotelContact.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).catch(() => {
    res.status(500).json({data: 'Something went wrong updating the hotelContact'});
  })

  res
    .status(200)
    .json({count: 1, data: hotelContact})
}


const deleteHotelContact = async (req, res, next) => {
  const id = req.params.id
  const hotelContact = await HotelContact.findByIdAndDelete(id)
    .catch(() => {
      res
        .status(400)
        .json({data: 'Invalid id'})
    })

  if (!hotelContact) {
    res
      .status(404)
      .json({data: `HotelContact with id:${id} not found`})
  }
  res
    .status(200)
    .json({count: 1, data: hotelContact})
}


module.exports = {
  getHotelContacts,
  getHotelContact,
  createHotelContact,
  updateHotelContact,
  deleteHotelContact
}
