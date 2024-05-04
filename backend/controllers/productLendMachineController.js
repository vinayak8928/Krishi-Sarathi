import express from 'express'
import asyncHandler from 'express-async-handler'

import ProductLendMachines from './../models/productLendMachineModel.js';

// @desc    Fetch all lending Machines
// @rout    GET /lendMachines
// @access  public
const getLendMachnines = asyncHandler(async(req, res) => {
    const productLendMachine = await ProductLendMachines.find({})
    res.json(productLendMachine);
})

// @desc    Fetch machine by id
// @rout    GET /lendMachines/:id
// @access  public
const getLendMachnineById = asyncHandler(async(req, res) => {
    const productLendMachine = await ProductLendMachines.findById(req.params.id);

    if(productLendMachine) {
        res.json(productLendMachine);
    } else {
        res.status(404)
        throw new Error('Machine not Found')
    }
})

// @desc    Fetch machine by id
// @rout    GET /lendMachines/:id
// @access  private/admin
const deleteLendMachnine = asyncHandler(async(req, res) => {
    const lendMachine = await ProductLendMachines.findById(req.params.id);

    if(lendMachine) {
        lendMachine.remove()
        res.json({ message: 'Machine Removed' });
    } else {
        res.status(404)
        throw new Error('Machine not Found')
    }
})

// @desc    Create Lend Machine
// @rout    POST /lendMachines/
// @access  private/ Admin
const createLendMachine = asyncHandler(async (req, res) => {
    const lendMachine = new ProductLendMachines({
        seller: req.user.name,
        name: '',
        user: req.user._id,
        image: '',
        description: '',
        category: '',
        price: '',
        quantity: 1,
        machine_power: '0HP',
        numReviews: 0,
    })

    const createdLendMachine = await lendMachine.save()
    res.status(201).json(createdLendMachine)
})

// @desc    Update Lend Machine
// @rout    PUT /lendMachines/:id
// @access  private/ Admin
const updateLendMachine = asyncHandler(async (req, res) => {
    const { name, price,seller, image, description, category, quantity, machine_power } = req.body

    const updateLendMachine = await ProductLendMachines.findById(req.params.id)

    if (updateLendMachine) {

        updateLendMachine.name = name
        updateLendMachine.price = price
        updateLendMachine.seller = seller
        updateLendMachine.image = image
        updateLendMachine.description = description
        updateLendMachine.category = category
        updateLendMachine.quantity = quantity
        updateLendMachine.machine_power = machine_power

        const updatedMachine = await updateLendMachine.save()
        res.status(201).json(updatedMachine)
    } else {
        res.status(401)
        throw new Error('Product not found')
    }
})

// @desc    Update Product Review
// @rout    POST /seeds/:id/review
// @access  private/ Admin
const createMachineProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const lendMachine = await ProductLendMachines.findById(req.params.id)

    if (lendMachine) {
        const alreadyReviewed = lendMachine.reviews.find(r => r.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        lendMachine.reviews.push(review)

        lendMachine.numReviews = lendMachine.reviews.length

        lendMachine.rating = lendMachine.reviews.reduce((acc, item) => item.rating + acc, 0) / lendMachine.reviews.length

        await lendMachine.save()
        
        res.status(201).json({ message: 'Review added' })

    } else {
        res.status(401)
        throw new Error('Product not found')
    }
})

export { 
    getLendMachnines, 
    getLendMachnineById, 
    deleteLendMachnine,
    createLendMachine,
    updateLendMachine,
    createMachineProductReview
}