const express = require('express')
const router = express.Router()

const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder
} = require('../controllers/orders')


router.get('/', getOrders)

router.post('/', createOrder)

router.get('/:id', getOrder)

router.put('/:id', updateOrder)

router.delete('/:id', deleteOrder)

module.exports = router
