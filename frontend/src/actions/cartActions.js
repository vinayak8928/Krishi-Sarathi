// import axios from "axios";
// import {
//     CART_ADD_ITEM,
//     CART_REMOVE_ITEM,
//     CART_SAVE_SHIPPING_ADDRESSS,
//     CART_SAVE_PAYMENT_METHOD,
//     SET_DURATION_VALUES,
//     SET_DURATION_INPUTS,
//     UPDATE_TOTAL_PRICE,
//     UPDATE_SUBTOTAL,
// }
//     from "../constants/cartConstants";
// export const addToCart = (id, qty, duration, durationInput) => async (dispatch, getState) => {
//     try {
//         const { data } = await axios.get(`/api/seeds/${id}`);
//         const price = data.price; // Get the price from the fetched data
//         dispatch({
//             type: CART_ADD_ITEM,
//             payload: {
//                 seed: data._id,
//                 name: data.name,
//                 image: data.image,
//                 price: data.price,
//                 countInStock: data.countInStock,
//                 qty,
//                 duration, // Include duration in payload
//                 durationInput,
//             }
//         })
//         dispatch(calculateSubtotal()); // Dispatch the action to calculate subtotal
//     } catch (error) {
//         // Handle errors
//     }
//     try {
//         const { data } = await axios.get(`/api/lendMachines/${id}`);
//         const price = data.price; // Get the price from the fetched data
//         dispatch({
//             type: CART_ADD_ITEM,
//             payload: {
//                 seed: data._id,
//                 name: data.name,
//                 image: data.image,
//                 price: data.price,
//                 countInStock: data.countInStock,
//                 qty,
//                 duration,// Include duration in payload
//                 durationInput

//             }
//         })
//         dispatch(updateTotalPrice());
//     }

//     catch (error) {
//         try {
//             const { data } = await axios.get(`/api/lendMachines/${id}`);
//             const price = data.price; // Get the price from the fetched data
//             dispatch({
//                 type: CART_ADD_ITEM,
//                 payload: {
//                     seed: data._id,
//                     name: data.name,
//                     image: data.image,
//                     price: data.price,
//                     countInStock: data.countInStock,
//                     qty,
//                     duration, // Include duration in payload
//                     durationInput,
//                 }
//             })
//             dispatch(calculateSubtotal()); // Dispatch the action to calculate subtotal
//         } catch (error) {
//             // Handle errors
//             console.error("Error adding item to cart:", error);
//         }



//         try {
//             const { data } = await axios.get(`/api/lendMachines/${id}`)
//             dispatch({
//                 type: CART_ADD_ITEM,
//                 payload: {
//                     seed: data._id,
//                     name: data.name,
//                     image: data.image,
//                     price: data.price,
//                     countInStock: data.quantity,
//                     qty,
//                     duration,// Include duration in payload
//                     durationInput

//                 }
//             })
//         }
//         catch (error) {
//             const { data } = await axios.get(`/api/consumer/${id}`)
//             dispatch({
//                 type: CART_ADD_ITEM,
//                 payload: {
//                     seed: data._id,
//                     name: data.prod_name,
//                     image: data.image,
//                     price: data.price,
//                     countInStock: data.quantity,
//                     qty,
//                     duration,
//                     durationInput,
//                 }
//             })
//         }
//     }
//     const updateTotalPrice = () => (dispatch, getState) => {
//         const { cartSeed } = getState();
//         const itemsPrice = cartSeed.cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
//         const shippingPrice = itemsPrice > 100 ? 0 : 50;
//         const taxPrice = 0.15 * itemsPrice;
//         const totalPrice = itemsPrice + shippingPrice + taxPrice;

//         dispatch({
//             type: UPDATE_TOTAL_PRICE,
//             payload: { itemsPrice, shippingPrice, taxPrice, totalPrice },
//         });
//     };

//     const calculateSubtotal = () => (dispatch, getState) => {
//         const { cartSeed } = getState();
//         if (!cartSeed) return; // Check if cartSeed is defined

//         const { cartItems, durationOptions, durationInput } = cartSeed;
//         if (!cartItems || !durationOptions || !durationInput) return; // Check if cartItems, durationOptions, and durationInput are defined


//         let subtotalValue = cartItems.reduce((acc, item) => {
//             const duration = durationOptions[item.seed] || "hours";
//             const durationValue = durationInput[item.seed] || 1;
//             let subtotal = item.price;
//             // Check the duration selected for each item and adjust the price accordingly
//             if (duration === "hours") {
//                 subtotal *= item.qty * durationValue; // Multiply by the number of hours
//             } else if (duration === "days") {
//                 subtotal *= item.qty * 10 * durationValue; // Multiply by 10X the number of days
//             } else if (duration === "weeks") {
//                 subtotal *= item.qty * 60 * durationValue; // Multiply by 60X for weeks
//             }
//             return acc + subtotal;
//         }, 0);

//         dispatch({
//             type: UPDATE_SUBTOTAL,
//             payload: subtotalValue.toFixed(2),
//         });
//     };


//     localStorage.setItem('cartItems', JSON.stringify(getState().cartSeed.cartItems))
//     localStorage.setItem('durationValues', JSON.stringify(getState().cartSeed.durationValues)); // Store duration values in local storage
// }

// export const removeFromCart = (id) => (dispatch, getState) => {
//     dispatch({
//         type: CART_REMOVE_ITEM,
//         payload: id
//     })

//     localStorage.setItem('cartItems', JSON.stringify(getState().cartSeed.cartItems))
// }

// export const saveShippingAddress = (data) => (dispatch) => {
//     dispatch({
//         type: CART_SAVE_SHIPPING_ADDRESSS,
//         payload: data
//     })

//     localStorage.setItem('shippingAddress', JSON.stringify(data))
// }

// export const savePaymentMethod = (data) => (dispatch) => {
//     dispatch({
//         type: CART_SAVE_PAYMENT_METHOD,
//         payload: data
//     })

//     localStorage.setItem('paymentMethod', JSON.stringify(data))
// }

// export const setDurationValues = (values) => (dispatch) => {
//     dispatch({
//         type: SET_DURATION_VALUES,
//         payload: values,
//     });
// };

// export const setDurationInputs = (inputs) => (dispatch) => {
//     dispatch({
//         type: SET_DURATION_INPUTS,
//         payload: inputs,
//     });
// };
// export const updateSubtotal = (newSubtotal) => (dispatch) => {
//     dispatch({
//         type: UPDATE_SUBTOTAL,
//         payload: newSubtotal,
//     });
// };

//original
import axios from 'axios'
import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESSS,
    CART_SAVE_PAYMENT_METHOD
} from './../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/seeds/${id}`)
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                seed: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty,
            }
        })
    } catch (error) {
        try {
            const { data } = await axios.get(`/api/lendMachines/${id}`)
            dispatch({
                type: CART_ADD_ITEM,
                payload: {
                    seed: data._id,
                    name: data.name,
                    image: data.image,
                    price: data.price,
                    countInStock: data.quantity,
                    qty,
                }
            })
        } catch (error) { 
            const { data } = await axios.get(`/api/consumer/${id}`)
            dispatch({
                type: CART_ADD_ITEM,
                payload: {
                    seed: data._id,
                    name: data.prod_name,
                    image: data.image,
                    price: data.price,
                    countInStock: data.quantity,
                    qty,
                }
            })
        }
    }

    localStorage.setItem('cartItems', JSON.stringify(getState().cartSeed.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cartSeed.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESSS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}




