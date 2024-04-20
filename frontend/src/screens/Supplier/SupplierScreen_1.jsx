import React, { useState, useEffect } from 'react'
import './supplierStyles.css'
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios'
import {
    Table,
    Form,
    Button,
    Container,
    Row,
    Col
} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
// import { listSeedProducts, listSeedProductsDetails, updateSeedProducts, createSeedProducts } from '../../actions/productSeedActions'
// import { SEED_UPDATE_RESET } from '../../constants/productConstants'
// import { SEED_CREATE_RESET } from '../../constants/productConstants'
import { listConsumerProducts, deleteConsumerProduct, createConsumer } from '../../actions/consumerProductAction'
import { CONSUMER_CREATE_RESET } from '../../constants/productConstants'
import FormContainer from '../../components/FormContainer/FormContainer'
import { listConsumerProductsDetails, updateConsumer } from '../../actions/consumerProductAction'
import { CONSUMER_UPDATE_RESET } from '../../constants/productConstants'
import Meta from '../../components/Helmet/Meta'

const ConsumerList = ({ match }) => {

    const [prodName, setProdName] = useState('')
    const [image, setImage] = useState('')
    const [sellerName, setSellerName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState('')
    const [avalaibleLoc, setAvalaibleLoc] = useState('')
    const [uploading, setUploading] = useState(false)

    const productId = match.params.id

    const dispatch = useDispatch()
    let history = useHistory()

    const consumerProductList = useSelector(state => state.consumerProductList)
    const { loading: loadingConsumer, error: errorConsumer, consumerProducts } = consumerProductList

    const consumerProductDetails = useSelector(state => state.consumerProductDetails)
    const { loading, error } = consumerProductDetails

    const consumerUpdate = useSelector(state => state.consumerUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = consumerUpdate

    const consumerProductDelete = useSelector(state => state.consumerProductDelete)
    const { loading: deleteLoadingConsumer, error: errorDeleteConsumer, success: successDelete } = consumerProductDelete

    const consumerCreate = useSelector(state => state.consumerCreate)
    const {
        loading: createLoadingConsumer,
        error: errorcreateConsumer,
        success: successCreate,
        product: consumerProduct
    } = consumerCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: CONSUMER_CREATE_RESET })
        if (!userInfo) {
            history.push('/login')
        } else {
            if (successCreate) {
                history.push(`/admin/productlist/consumer/${consumerProduct._id}/edit`)
            } else {
                if(successUpdate){
                dispatch(listConsumerProducts())
                history.push('/consumer')
                }
            }
        }
    }, [dispatch, history, successUpdate, productId, userInfo, successDelete, successCreate, consumerProduct])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteConsumerProduct(id))
        }
    }

    const createConsumerProductHandler = (e) => {
        e.preventDefault()
        try {
            const newConsumerProduct = {
                prodName,
                sellerName,
                image,
                price,
                description,
                quantity,
                avalaibleLoc
            }
            dispatch(createConsumer(newConsumerProduct))
            history.push('/consumer') // Redirect on success
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
            if (successUpdate) {
                // dispatch({ type: SEED_UPDATE_RESET })
                history.push('/consumer')
            }
    }, [dispatch, history, userInfo, successDelete, successCreate, consumerProduct])

    // const submitHandler = (e) => {
    //     e.preventDefault()
    //     try {
    //         dispatch(updateConsumer({
    //             _id: match.params.id,
    //             prod_name: prodName,
    //             image: image,
    //             price: price,
    //             seller_name: sellerName,
    //             description: description,
    //             quantity: quantity,
    //             avalaible_location: avalaibleLoc
    //         }))
    //         history.push(`/admin/productlist/consumer/${consumerProduct._id}/edit`) // Redirect on success
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const newConsumerProduct = {
                prodName,
                sellerName,
                image,
                price,
                description,
                quantity,
                avalaibleLoc
            }
            await dispatch(createConsumer(newConsumerProduct))
            history.push('/consumer') // Redirect on success
        } catch (error) {
            console.error(error);
        }
    }
    

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/upload', formData, config)

            // setImage(data)
            const imagePath = data.replace(/\\/g, '/');
            console.log(imagePath)
            setImage(imagePath);
            setUploading(false)

        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }
     
    return (
        <Container style={{ marginBottom: '50px' }}>
            <Meta
                title="Krishi Sarathi | Consumer"
            />
            <FormContainer>
                <h2 style={{ marginTop: '120px', textAlign: 'center' }}>Consumer Profile</h2>
                <Link to='/' className='btn btn-light my-3'>
                    GO BACK
                </Link>
                <Col className="text-right">
                    <Button className='my-3' onClick={createConsumerProductHandler}>
                        <i className='fas fa-plus'></i>
                    </Button>
                </Col>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading && <Loader />}
                {error && <Message variant='danger'>{error}</Message>}
                {successUpdate && <Message variant='success'>Profile Updated!</Message>}
                <Form onSubmit={submitHandler}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId='prodname'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="prodName"
                                    placeholder="Enter Product Name"
                                    value={prodName}
                                    onChange={(e) => setProdName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter image url"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                ></Form.Control>
                                <Form.File
                                    id='image-file'
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                ></Form.File>
                                {uploading && <Loader />}
                            </Form.Group>
                            <Form.Group controlId='sellerName'>
                                <Form.Label>Seller Name</Form.Label>
                                <Form.Control
                                    type="sellerName"
                                    placeholder="Enter seller name"
                                    value={sellerName}
                                    onChange={(e) => setSellerName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="price"
                                    placeholder="Enter price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    type="description"
                                    placeholder="Enter Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='quantity'>
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="countInStock"
                                    placeholder="Enter quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='avalaibleLoc'>
                                <Form.Label>Machine Power</Form.Label>
                                <Form.Control
                                    type="avalaibleLoc"
                                    placeholder="Enter Machine Power"
                                    value={avalaibleLoc}
                                    onChange={(e) => setAvalaibleLoc(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Button type="submit" variant="primary">Update</Button>
                        </Col>
                    </Row>
                </Form>
            </FormContainer>
        </Container>
    )
}

export default ConsumerList
