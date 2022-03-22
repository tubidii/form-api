const invoice = require("../models/Invoice");

const getInvoice = async (req, res, next) => {
  const invoices = await invoice.find();
  res.status(200).json({count: invoices.length, data: invoices});
}

const getInvoices = async (req, res, next) => {
  const id = req.params.id
  const invoice = await invoice.findById(id).catch(() => {
    res.status(400)
      .json({data: 'Invalid id'})
  })

  if (!invoice) {
    res.status(404)
      .json({data: `Invoice with id: ${id} not found`})
  }
  res.status(200)
    .json({count: 1, data: invoice})
}

const createInvoice = async (req, res, next) => {
  const createdInvoice = await invoice.create(req.body)
  res.status(201).json({success: true, data: createdInvoice});
}

const updateInvoice = async (req, res, next) => {
  const id = req.params.id
  const invoice = await invoice.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).catch(() => {
    res.status(500).json({data: 'Something went wrong updating the Invoice'});
  })

  res
    .status(200)
    .json({count: 1, data: invoice})
}


const deleteInvoice = async (req, res, next) => {
  const id = req.params.id
  const invoice = await invoice.findByIdAndDelete(id)
    .catch(() => {
      res
        .status(400)
        .json({data: 'Invalid id'})
    })

  if (!invoice) {
    res
      .status(404)
      .json({data: `Invoice with id:${id} not found`})
  }
  res
    .status(200)
    .json({count: 1, data: invoice})
}


module.exports = {
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice
}
