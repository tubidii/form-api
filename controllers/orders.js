const Order = require("../models/Order");

const getOrder = async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json({count: orders.length, data: orders});
}

const getOrders = async (req, res, next) => {
  const id = req.params.id
  const order = await Order.findById(id).catch(() => {
    res.status(400)
      .json({data: 'Invalid id'})
  })

  if (!order) {
    res.status(404)
      .json({data: `Order with id: ${id} not found`})
  }
  res.status(200)
    .json({count: 1, data: order})
}

const createOrder = async (req, res, next) => {
  const createdOrder = await Order.create(req.body)
  res.status(201).json({success: true, data: createdOrder});
}

const updateOrder = async (req, res, next) => {
  const id = req.params.id
  const order = await Order.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).catch(() => {
    res.status(500).json({data: 'Something went wrong updating the Order'});
  })

  res
    .status(200)
    .json({count: 1, data: order})
}


const deleteOrder = async (req, res, next) => {
  const id = req.params.id
  const order = await Order.findByIdAndDelete(id)
    .catch(() => {
      res
        .status(400)
        .json({data: 'Invalid id'})
    })

  if (!order) {
    res
      .status(404)
      .json({data: `Order with id:${id} not found`})
  }
  res
    .status(200)
    .json({count: 1, data: order})
}


module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder
}
