const express = require('express')
const router = express.Router()

const {
  getHotelContacts,
  getHotelContact,
  createHotelContact,
  updateHotelContact,
  deleteHotelContact
} = require('../controllers/hotelContacts')


router.get('/', getHotelContacts)

router.post('/', createHotelContact)

router.get('/:id', getHotelContact)

router.put('/:id', updateHotelContact)

router.delete('/:id', deleteHotelContact)

module.exports = router
