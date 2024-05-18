import mongoose from 'mongoose'

const orderSeedSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [
        {
            name: { type: String, requried: true },
            qty: { type: Number, requried: true },
            image: { type: String, requried: true },
            price: { type: Number, requried: true },
            seed: { 
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'farmer_product_seeds',
             },
            duration: {
                amount: { type: Number, required: true },
                unit: { type: String, enum: ['hours', 'days', 'weeks'], required: true },
              }
        }
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        slotBooking:{
            startDateTime: { type: Date,required: true },
            endDateTime: { type: Date,required: true },
        },
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date,
    },
    isReturned: {
        type: Boolean,
        required: true,
        default: false
    },
    returnedAt: {
        type: Date,
    },
}, {
    timestamps: true
})

const orderSeed = mongoose.model('orderSeed', orderSeedSchema);

export default orderSeed;



// import mongoose from 'mongoose'

// const orderItemSchema = mongoose.Schema({
//     name: { type: String, required: true },
//     qty: { type: Number, required: true },
//     image: { type: String, required: true },
//     price: { type: Number, required: true },
//     seed: { 
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: 'farmer_product_seeds',
//     },
//     duration: { type: String, required: true }, // Add duration field for each order item
// });

// const orderSeedSchema = mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: 'User'
//     },
//     orderItems: [orderItemSchema], // Use the modified orderItemSchema
//     shippingAddress: {
//         address: { type: String, required: true },
//         city: { type: String, required: true },
//         postalCode: { type: String, required: true },
//         country: { type: String, required: true },
//     },
//     paymentMethod: {
//         type: String,
//         required: true,
//     },
//     paymentResult: {
//         id: { type: String },
//         status: { type: String },
//         update_time: { type: String },
//         email_address: { type: String },
//     },
//     taxPrice: {
//         type: Number,
//         required: true,
//         default: 0.0
//     },
//     shippingPrice: {
//         type: Number,
//         required: true,
//         default: 0.0
//     },
//     totalPrice: {
//         type: Number,
//         required: true,
//         default: 0.0
//     },
//     isPaid: {
//         type: Boolean,
//         required: true,
//         default: false
//     },
//     paidAt: {
//         type: Date,
//     },
//     isDelivered: {
//         type: Boolean,
//         required: true,
//         default: false
//     },
//     deliveredAt: {
//         type: Date,
//     }
// }, {
//     timestamps: true
// });

// const orderSeed = mongoose.model('orderSeed', orderSeedSchema);

// export default orderSeed;
