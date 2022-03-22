const express = require('express')
const router = express.Router()

const {
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice
} = require('../controllers/invoices')


router.get('/', getInvoices)

router.post('/', createInvoice)

router.get('/:id', getInvoice)

router.put('/:id', updateInvoice)

router.delete('/:id', deleteInvoice)

module.exports = router
