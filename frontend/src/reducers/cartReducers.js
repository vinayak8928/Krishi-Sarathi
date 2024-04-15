import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
    CART_RESET,
    CART_SAVE_SHIPPING_ADDRESSS,
    CART_SAVE_PAYMENT_METHOD, 
} from './../constants/cartConstants'

export const cartSeedReducer = (state = { cartItems: [], shippingAddress: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
    const item = action.payload;
    const existItem = state.cartItems.find(x => x.seed === item.seed);

    if (existItem) {
        return {
            ...state,
            cartItems: state.cartItems.map(x => x.seed === existItem.seed ? item : x),
            durationValues: {
                ...state.durationValues,
                [item.seed]: item.duration // Update duration value
            }
        }
    } else {
        return {
            ...state,
            cartItems: [...state.cartItems, item],
            durationValues: {
                ...state.durationValues,
                [item.seed]: item.duration // Store duration value
            }
        }
    }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.seed !== action.payload),
            }
        case CART_RESET:
            return {
                ...state,
                cartItems: []
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