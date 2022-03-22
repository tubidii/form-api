const express = require('express')
const router = express.Router()

const {
  getHotels,
  getHotel,
  createHotel,
  updateHotel,
  deleteHotel
} = require('../controllers/hotels')


router.get('/', getHotels)

router.post('/', createHotel)

router.get('/:id', getHotel)

router.put('/:id', updateHotel)

router.delete('/:id', deleteHotel)

module.exports = router
