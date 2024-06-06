// import express from 'express'
// import asyncHandler from 'express-async-handler'

// import orderSeed from './../models/orderSeedModel.js';

// // @desc    create new order
// // @rout    POST /api/orders
// // @access  private
// const addOrderItems = asyncHandler(async (req, res) => {
//     const {
//         orderItems,
//         shippingAddress,
//         paymentMethod,
//         itemsPrice,
//         taxPrice,
//         shippingPrice,
//         totalPrice,startDateTime,
//         endDateTime,
//     } = req.body

//     if (orderItems && orderItems.length === 0) {
//         res.status(400)
//         throw new Error('No Order Items')
//     } else {
//         const order = new orderSeed({
//             orderItems,
//             user: req.user._id,
//             shippingAddress,
//             paymentMethod,
//             itemsPrice,
//             taxPrice,
//             shippingPrice,
//             totalPrice,
//         })

//         const createdOrder = await order.save()

//         res.status(201).json(createdOrder)
//     }
// })

// // @desc    Get order by ID
// // @rout    GET /api/orders/:id
// // @access  private
// const getOrderById = asyncHandler(async (req, res) => {
//     const order = await orderSeed.findById(req.params.id).populate('user', 'name email')

//     if (order) {
//         res.json(order);
//     } else {
//         res.status(404)
//         throw new Error('Order not Found')
//     }
// })

// // @desc    Update order to paid
// // @rout    PUT /api/orders/:id/pay
// // @access  private
// const updateOrderToPaid = asyncHandler(async (req, res) => {
//     const order = await orderSeed.findById(req.params.id)

//     if (order) {
//         order.isPaid = true,
//             order.paidAt = Date.now(),
//             order.paymentResult = {
//                 id: req.body.id,
//                 status: req.body.status,
//                 update_time: req.body.update_time,
//                 email_address: req.body.payer.email_address
//             }

//         const updatedOrder = await order.save()

//         res.json(updatedOrder)
//     } else {
//         res.status(404)
//         throw new Error('Order not Found')
//     }
// })

// const updateOrderToPaidCOD = asyncHandler(async (req, res) => {
//     const order = await orderSeed.findById(req.params.id)

//     if (order) {
//         order.isPaid = true,
//         order.paidAt = Date.now()

//         const updatedOrder = await order.save()

//         res.json(updatedOrder)
//     } else {
//         res.status(404)
//         throw new Error('Order not Found')
//     }
// })

// // @desc    Update order to delivered
// // @rout    PUT /api/orders/:id/deliver
// // @access  private/Admin
// const updateOrderToDelivered = asyncHandler(async (req, res) => {
//     const order = await orderSeed.findById(req.params.id)

//     if (order) {
//         order.isDelivered = true
//         order.deliveredAt = Date.now()

//         const updatedOrder = await order.save()

//         res.json(updatedOrder)
//     } else {
//         res.status(404)
//         throw new Error('Order not Found')
//     }
// })

// // @desc    Update order to returned
// // @rout    PUT /api/orders/:id/return
// // @access  private/Admin
// const updateOrderToReturnRequested = asyncHandler(async (req, res) => {
//     const order = await orderSeed.findById(req.params.id)

//     if (order) {
//         order.isReturnRequested = true
//         order.returnRequestedAt = Date.now()

//         const updatedOrder = await order.save()

//         res.json(updatedOrder)
//     } else {
//         res.status(404)
//         throw new Error('Order not Found')
//     }
// })

// // @desc    Update order to returned
// // @rout    PUT /api/orders/:id/return
// // @access  private/Admin
// const updateOrderToReturned = asyncHandler(async (req, res) => {
//     const order = await orderSeed.findById(req.params.id)

//     if (order) {
//         order.isReturned = true
//         order.returnedAt = Date.now()

//         const updatedOrder = await order.save()

//         res.json(updatedOrder)
//     } else {
//         res.status(404)
//         throw new Error('Order not Found')
//     }
// })

// // @desc    Get logged in user orders
// // @route   GET /api/orders/myorders
// // @access  Private
// const getMyOrders = asyncHandler(async (req, res) => {
//     const orders = await orderSeed.find({ user: req.user._id })
//     res.json(orders)
// })

// // @desc    Get all orders
// // @route   GET /api/orders
// // @access  Private/Admin
// const getOrders = asyncHandler(async (req, res) => {
//     const orders = await orderSeed.find({}).populate('user', 'id name')
//     res.json(orders)
// })

// export {
//     addOrderItems,
//     getOrderById,
//     updateOrderToPaid,
//     updateOrderToPaidCOD,
//     getMyOrders,
//     getOrders,
//     updateOrderToDelivered,
//     updateOrderToReturnRequested,
//     updateOrderToReturned
// }

import express from 'express'
import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'
import orderSeed from './../models/orderSeedModel.js';
import dotenv from 'dotenv'
dotenv.config()


//orderContoller.js
// let transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: process.env.SMTP_MAIL, // generated ethereal user
//         pass: process.env.SMTP_PASSWORD, // generated ethereal password
//     },
// })
const calculateTotalPrice = (qty, amount, unit, price) => {
    if (unit === "hours") {
      return qty * amount * price;
    } else if (unit === "weeks") {
      return qty * amount * price * 60;
    } else if (unit === "days") {
      return qty * amount * price * 10;
    } else {
      return 0;
    }
  };

// Function to send email
const sendEmail = async (email, subject, message) => {
    var mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: subject,
        text: message,
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log("Email sent successfully!")
        }
    })
}
// @desc    create new order
// @rout    POST /api/orders
// @access  private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice, startDateTime,
        endDateTime,
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No Order Items')
    } else {
        const order = new orderSeed({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }
})

// @desc    Get order by ID
// @rout    GET /api/orders/:id
// @access  private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await orderSeed.findById(req.params.id).populate('user', 'name email')

    if (order) {
        res.json(order);
    } else {
        res.status(404)
        throw new Error('Order not Found')
    }
})

// @desc    Update order to paid
// @rout    PUT /api/orders/:id/pay
// @access  private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await orderSeed.findById(req.params.id)

    if (order) {
        order.isPaid = true,
            order.paidAt = Date.now(),
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address
            }

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not Found')
    }
})

const updateOrderToPaidCOD = asyncHandler(async (req, res) => {
    const order = await orderSeed.findById(req.params.id)

    if (order) {
        order.isPaid = true,
            order.paidAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not Found')
    }
})

// @desc    Update order to delivered
// @rout    PUT /api/orders/:id/deliver
// @access  private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    // const order = await orderSeed.findById(req.params.id)
    const order = await orderSeed.findById(req.params.id).populate('user', 'email')
    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()
        // Send email confirmation
        const email = order.user.email
        const subject = `Your Krishi Sarathi Order ${order._id} Confirmation`
        // const message = `Order confirmed ${order._id}`
        let message = `<h2>Order Confirmation - Order ID: ${order._id}</h2>`
        message += `<h3>Thank you for your order!!`
        message += `<h3>Order Details:</h3>`
        order.orderItems.forEach(item => {
            message += `<div><strong>Item Name: </strong>${item.name}</div>`
            message += `<div><strong>Quantity: </strong>${item.qty}</div>`
            message += `<div><strong>Duration: </strong>${item.duration.amount} ${item.duration.unit}</div>`
            message += `<div><strong>Item Price: RS. </strong>${item.price}</div>`
            message += `<div><strong>Total Price: RS. </strong>${calculateTotalPrice(item.qty, item.duration.amount, item.duration.unit, item.price)}</div>`
            message += `<div><strong>Start Date & Time: </strong>${new Date(item.slotBooking.startDateTime).toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            })}</div>`
            message += `<div><strong>End Date & Time: </strong>${new Date(item.slotBooking.endDateTime).toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            })}</div><br/>`
        })

        message += `<h3>Order Summary:</h3>`
        message += `<div><strong>Items: </strong>${order.orderItems.reduce((acc, item) => acc + item.qty, 0)}</div>`
        
        message += `<div><strong>Tax: RS. </strong>${order.taxPrice}</div>`
        message += `<div><strong>Total: RS. </strong>${order.totalPrice}</div>`

        // Configure the email transport using nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD
            }
        })

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: order.user.email,
            subject: subject,
            html: message
        }
        
        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error)
            } else {
                console.log(`Email sent from: ${mailOptions.from}, response: ${info.response}`)
            }
        })


        // await sendEmail(email, subject, message)

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not Found')
    }
})

// @desc    Update order to returned
// @rout    PUT /api/orders/:id/return
// @access  private/Admin
const updateOrderToReturnRequested = asyncHandler(async (req, res) => {
    const order = await orderSeed.findById(req.params.id)

    if (order) {
        order.isReturnRequested = true
        order.returnRequestedAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not Found')
    }
})

// @desc    Update order to returned
// @rout    PUT /api/orders/:id/return
// @access  private/Admin
const updateOrderToReturned = asyncHandler(async (req, res) => {
    const order = await orderSeed.findById(req.params.id)

    if (order) {
        order.isReturned = true
        order.returnedAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not Found')
    }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await orderSeed.find({ user: req.user._id })
    res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await orderSeed.find({}).populate('user', 'id name')
    res.json(orders)
})

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToPaidCOD,
    getMyOrders,
    getOrders,
    updateOrderToDelivered,
    updateOrderToReturnRequested,
    updateOrderToReturned
}