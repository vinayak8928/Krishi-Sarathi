// import { 
//     CART_ADD_ITEM, 
//     CART_REMOVE_ITEM, 
//     CART_SAVE_SHIPPING_ADDRESSS,
//     CART_SAVE_PAYMENT_METHOD 
// } from './../constants/cartConstants'

// export const cartSeedReducer = (state = { cartItems: [], shippingAddress: [] }, action) => {
//     switch (action.type) {
//         case CART_ADD_ITEM:
//     const item = action.payload;
//     const existItem = state.cartItems.find(x => x.seed === item.seed);

//     if (existItem) {
//         return {
//             ...state,
//             cartItems: state.cartItems.map(x => x.seed === existItem.seed ? item : x),
//             durationValues: {
//                 ...state.durationValues,
//                 [item.seed]: item.duration // Update duration value
//             }
//         }
//     } else {
//         return {
//             ...state,
//             cartItems: [...state.cartItems, item],
//             durationValues: {
//                 ...state.durationValues,
//                 [item.seed]: item.duration // Store duration value
//             }
//         }
//     }
//         case CART_REMOVE_ITEM:
//             return {
//                 ...state,
//                 cartItems: state.cartItems.filter(x => x.seed !== action.payload),
//             }
//         case CART_SAVE_SHIPPING_ADDRESSS:
//             return {
//                 ...state,
//                 shippingAddress: action.payload,
//             }
//         case CART_SAVE_PAYMENT_METHOD:
//             return {
//                 ...state,
//                 paymentMethod: action.payload,
//             }
//         default:
//             return state
//     }
// }







// import {
//     CART_ADD_ITEM,
//     CART_REMOVE_ITEM,
//     CART_SAVE_SHIPPING_ADDRESSS,
//     CART_SAVE_PAYMENT_METHOD,
//     SET_DURATION_VALUES,
//     SET_DURATION_INPUTS,
//     UPDATE_SUBTOTAL,
// } from './../constants/cartConstants'
// const initialState = {
//     cartItems: [], // Initialize cartItems array
//     shippingAddress: [],
//     durationValues: {},
//     durationInputs: {},
//     subtotal: 0,
// };
// // export const cartSeedReducer = (state = { cartItems: [], shippingAddress: [], durationValues: {}, durationInputs: {}, initialState }, action) => {

// export const cartSeedReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case CART_ADD_ITEM:
//             const item = action.payload;
//             const existItem = state.cartItems.find(x => x.seed === item.seed);

//             if (existItem) {
//                 return {
//                     ...state,
//                     cartItems: state.cartItems.map(x => x.seed === existItem.seed ? item : x),
//                     durationValues: {
//                         ...state.durationValues,
//                         [item.seed]: item.duration // Update duration value
//                     }
//                 }
//             } else {
//                 return {
//                     ...state,
//                     cartItems: [...state.cartItems, item],
//                     durationValues: {
//                         ...state.durationValues,
//                         [item.seed]: item.duration // Store duration value
//                     }
//                 }
//             }
//         case UPDATE_SUBTOTAL:
//             return {
//                 ...state,
//                 subtotal: action.payload,
//             };
//         case CART_REMOVE_ITEM:
//             return {
//                 ...state,
//                 cartItems: state.cartItems.filter(x => x.seed !== action.payload),
//             }
//         case CART_SAVE_SHIPPING_ADDRESSS:
//             return {
//                 ...state,
//                 shippingAddress: action.payload,
//             }
//         case CART_SAVE_PAYMENT_METHOD:
//             return {
//                 ...state,
//                 paymentMethod: action.payload,
//             }
//         case SET_DURATION_VALUES:
//             return {
//                 ...state,
//                 durationValues: action.payload,
//                 // Preserve the existing duration inputs
//                 durationInputs: { ...state.durationInputs },
//             }

//         case SET_DURATION_INPUTS:
//             return {
//                 ...state,
//                 durationInputs: action.payload,
//             }
//         default:
//             return state
//     }
// }


//original
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESSS,
    CART_SAVE_PAYMENT_METHOD
} from './../constants/cartConstants'

export const cartSeedReducer = (state = { cartItems: [], shippingAddress: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.seed === item.seed)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.seed === existItem.seed ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.seed !== action.payload),
            }
        case CART_SAVE_SHIPPING_ADDRESSS:
            return {
                ...state,
                shippingAddress: action.payload,
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            }
        default:
            return state
    }
}