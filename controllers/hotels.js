const Hotel = require('../models/Hotel')

const getHotels = async (req, res, next) => {
  const hotels = await Hotel.find();
  return res.status(200).json({
    count: hotels.length,
    data: hotels
  });
}


const getHotel = async (req, res, next) => {
  const id = req.params.id
  const hotel = await Hotel.findById(id)
  if (!hotel) {
    return res.status(404).json({data: `Hotel with id: ${id} not found`})
  }
  return res.status(200).json({count: 1, data: hotel})
}


const createHotel = async (req, res, next) => {
  const createdHotel = await Hotel.create(req.body)
  return res.status(201).json({success: true, data: createdHotel});
}

const updateHotel = async (req, res, next) => {
  const id = req.params.id
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
    return res.status(200).json({count: 1, data: hotel})
  } catch (e) {
    return res.status(500).json({message: 'An error has occurred'})
  }
}


const deleteHotel = async (req, res, next) => {
  const id = req.params.id
  const hotel = await Hotel.findByIdAndDelete(id)
    .catch(() => {
      res
        .status(400)
        .json({data: 'Invalid id'})
    })

  if (!hotel) {
    return res
      .status(404)
      .json({data: `Hotel with id:${id} not found`})
  }
  return res
    .status(200)
    .json({count: 1, data: hotel})
}


module.exports = {
  getHotels,
  getHotel,
  createHotel,
  updateHotel,
  deleteHotel
}
