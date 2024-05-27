import axios from 'axios'
import {
    PRODUCT_MACHINE_LIST_REQUEST,
    PRODUCT_MACHINE_LIST_SUCCESS,
    PRODUCT_MACHINE_LIST_FAIL,
    PRODUCT_MACHINE_DETAILS_REQUEST,
    PRODUCT_MACHINE_DETAILS_SUCCESS,
    PRODUCT_MACHINE_DETAILS_FAIL,
    MACHINE_DELETE_REQUEST,
    MACHINE_DELETE_SUCCESS,
    MACHINE_DELETE_FAIL,
    MACHINE_CREATE_REQUEST,
    MACHINE_CREATE_SUCCESS,
    MACHINE_CREATE_FAIL,
    MACHINE_UPDATE_REQUEST,
    MACHINE_UPDATE_SUCCESS,
    MACHINE_UPDATE_FAIL,
    MACHINE_UPDATE_RESET,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,

    MACHINE_UPDATE_QUANTITY_REQUEST,
    MACHINE_UPDATE_QUANTITY_SUCCESS,
    MACHINE_UPDATE_QUANTITY_FAIL,
} from './../constants/productConstants.js'
import { logout } from './userActions'

export const listLendMachineProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_MACHINE_LIST_REQUEST })

        const { data } = await axios.get('/api/lendMachines')

        dispatch({
            type: PRODUCT_MACHINE_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_MACHINE_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const listLendMachineProductsDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_MACHINE_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/lendMachines/${id}`)

        dispatch({
            type: PRODUCT_MACHINE_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_MACHINE_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const deleteLendMachineProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: MACHINE_DELETE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        await axios.delete(`/api/lendMachines/${id}`, config)

        dispatch({
            type: MACHINE_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: MACHINE_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const createLendMachine = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: MACHINE_CREATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.post(`/api/lendMachines`, {}, config)

        dispatch({
            type: MACHINE_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: MACHINE_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const updateLendMachine = (machine) => async (dispatch, getState) => {
    try {
        dispatch({ type: MACHINE_UPDATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.put(`/api/lendMachines/${machine._id}`, machine, config)

        dispatch({
            type: MACHINE_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({ type: MACHINE_UPDATE_RESET })
        
    } catch (error) {
        dispatch({
            type: MACHINE_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const createProductReview = (productId, review) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.post(`/api/lendMachines/${productId}/reviews`, review, config)
  
      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      })
    }
  }



  export const updateMachineQuantity = (id, qty) => async (dispatch, getState) => {
    try {
      dispatch({ type: MACHINE_UPDATE_QUANTITY_REQUEST })
      const { userLogin: { userInfo } } = getState()
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      console.log('Sending request to update quantity:', { id, qty })
      const { data } = await axios.put(`/api/lendMachines/${id}/quantity`, { qty }, config)
      console.log('Received response from updating quantity:', data)
      dispatch({
        type: MACHINE_UPDATE_QUANTITY_SUCCESS,
        payload: data,
      })
    } catch (error) {
      console.error('Error updating quantity:', error.response && error.response.data.message ? error.response.data.message : error.message)
      dispatch({
        type: MACHINE_UPDATE_QUANTITY_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
    }
  }
  