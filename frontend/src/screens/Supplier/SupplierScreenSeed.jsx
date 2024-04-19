// import React from 'react'
// import {
//     Container,
// } from 'react-bootstrap';
// import Meta from '../../components/Helmet/Meta';
// import AddSupplierProduct from '../../components/SupplierProduct/AddSupplierProduct';
// import './supplierStyles.css'

// const SupplierScreen = () => {
//     return (
//         <Container className='supplierContainer'>
//             <Meta
//                 title="Krishi Sarathi | Supplier"
//             />
//             <h1 className='title'>SUPPLIER</h1>
//             <h4 className="supplier-title">
//                 Sell your wide variety of products related to farming, through our platform. We have millions of farmers connected from all parts of country.</h4>
//             <br />
//             <AddSupplierProduct />
//         </Container>
//     )
// }

// export default SupplierScreen
import mongoose from 'mongoose'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Form,
    Button,
    Container,
    Row,
    Col
} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import Message from './../../../components/Message/Message'
import Message from '../../components/Message/Message'
import Loader from '../../components/Loader/Loader'
import FormContainer from '../../components/FormContainer/FormContainer'
import { listSeedProducts, listSeedProductsDetails, updateSeedProducts, createSeedProducts } from '../../actions/productSeedActions'
import { listLendMachineProducts, deleteLendMachineProduct, createLendMachine } from '../../actions/productLendMachinesActions'
import { SEED_UPDATE_RESET } from '../../constants/productConstants'
import { SEED_CREATE_RESET } from '../../constants/productConstants'
import Meta from '../../components/Helmet/Meta'

const SeedListEdit = ({match}) => {

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [uploading, setUploading] = useState(false)

    const productId = match.params.id

    const dispatch = useDispatch()
    let history = useHistory()

    const prodcutSeedDetails = useSelector(state => state.prodcutSeedDetails)
    const { loading, productSeed, error } = prodcutSeedDetails

    const seedUpdate = useSelector(state => state.seedUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = seedUpdate

    const prodcutSeedList = useSelector(state => state.prodcutSeedList)
    const { loading: loadingSeed, error: errorSeed, productSeeds } = prodcutSeedList

    const prodcutSeedDelete = useSelector(state => state.prodcutSeedDelete)
    const { success: successSeedDelete, loading: loadingDelete, error: errorDelete } = prodcutSeedDelete

    const [newProduct, setNewProduct] = useState({
        name: '',
        image: '',
        description: '',
        category: '',
        price: 0,
        countInStock: 0
    });

    const seedCreate = useSelector(state => state.seedCreate)
    const {
        success: successSeedCreate,
        loading: loadingCreate,
        error: errorCreate,
        product: productCreate
    } = seedCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
            if (successUpdate) {
                // dispatch({ type: SEED_UPDATE_RESET })
                history.push('/farmers')
            }
    }, [history, productSeed, dispatch, productId, successUpdate])
    // useEffect(() => {
    //     if (successUpdate) {
    //         dispatch({ type: SEED_UPDATE_RESET })
    //         history.push('/admin/productlist')
    //     } else {
    //         if (!productSeed.name || productSeed._id !== productId) {
    //             dispatch(listSeedProductsDetails(productId))
    //         } else {
    //             setName(productSeed.name)
    //             setDescription(productSeed.description)
    //             setPrice(productSeed.price)
    //             setCategory(productSeed.category)
    //             setImage(productSeed.image)
    //             setCountInStock(productSeed.countInStock)
    //         }
    //     }
    // }, [history, productSeed, dispatch, productId, successUpdate])
    // useEffect(() => {
    //     dispatch({ type: SEED_UPDATE_RESET }); // Reset update state
    
    //     if (!productSeed || productSeed._id !== productId) {
    //       // Fetch product details if not loaded or not the current product
    //       dispatch(listSeedProductsDetails(productId));
    //     } else {
    //       // Pre-fill form with existing product data
    //       setName(productSeed.name);
    //       setImage(productSeed.image);
    //       setDescription(productSeed.description);
    //       setPrice(productSeed.price);
    //       setCategory(productSeed.category);
    //       setCountInStock(productSeed.countInStock);
    //     }
    //   }, [dispatch, history, productId, productSeed, successUpdate]);
    useEffect(() => {
        dispatch({ type: SEED_CREATE_RESET })
        if (!userInfo) {
            history.push('/login')
        } else {
            if (successSeedCreate) {
    //         history.push('/admin/productlist')
                history.push(`/admin/productlist/seed/${productCreate._id}/edit`)
                
                // dispatch(updateSeedProducts({
                //     _id: productCreate._id,
                //     name:productCreate.name,
                //     image:productCreate.image,
                //     description:productCreate.description,
                //     category:productCreate.category,
                //     price:productCreate.price,
                //     countInStock:productCreate.countInStock
                // }))
                // history.push(`/farmers/purchaseSeeds/${productCreate._id}`)
                
            } else {
                if(successUpdate){
                dispatch({ type: SEED_UPDATE_RESET })
                history.push('/farmers')
                }
            }
        }
    }, [dispatch, history, userInfo, successSeedDelete, successSeedCreate, productCreate])
    
    // Function to handle form submission
    // const createProductHandler = async (e) => {
    //     // e.preventDefault();
    //     // const newProduct = {
    //     //     name,
    //     //     image,
    //     //     description,
    //     //     category,
    //     //     price,
    //     //     countInStock,
    //     // };
    //     dispatch(createSeedProducts())

    // };
    const createProductHandler = async (e) => {
        e.preventDefault();
      
        const { name, image, description, category, price, countInStock } = newProduct; // Access state values
      
        try {
            // dispatch(createSeedProducts())
          dispatch(updateSeedProducts({ _id: match.params.id, name, image, description, category, price, countInStock }));
          history.push(`/admin/productlist/seed/${match.params.id}`); // Redirect on success
        } catch (error) {
          console.error(error);
          // Handle errors appropriately, e.g., display an error message to the user
        }
      };
      
    const submitHandler = async(e) => {
        e.preventDefault()
        dispatch(updateSeedProducts({
            _id: productId,
            name,
            image,
            description,
            category,
            price,
            countInStock
        }))
    }

    const createSeedProductHandler = async(e) => {
        // e.preventDefault();
        dispatch(createSeedProducts())
    }
    // const createSeedProductHandler = () => {
    //         dispatch(updateSeedProducts())
    //     }
    

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
            console.log('Uploaded data:', data);

            // setImage(data)
            setNewProduct({
                ...newProduct,
                image: data
            });
            // newProduct.image({ ...newProduct, data: e.target.value})
            setUploading(false)

        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const createMachineProductHandler = () => {
        dispatch(createLendMachine())
    }

    return (
        <Container style={{ marginBottom: '50px' }}>
            <Meta

                title="Krishi Sarathi | Supplier"

            />
            <FormContainer>
                <h2 style={{ marginTop: '120px', textAlign: 'center' }}>Seed Profile</h2>
                <Link to='/farmer' className='btn btn-light my-3'>
                    GO BACK
                </Link>
                <Button className='my-3' onClick={createMachineProductHandler}>
                        <i className='fas fa-plus'></i> 
                </Button>
                {loading && <Loader />}
                {error && <Message variant='danger'>{error}</Message>}
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {successUpdate && <Message variant='success'>Profile Updated!</Message>}
                <Form onSubmit={createProductHandler}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter image url"
                                    value={newProduct.image}
                                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                                ></Form.Control>
                                <Form.File
                                    id='image-file'
                                    label='Choose File'
                                    custom
                                    onChange={uploadFileHandler}
                                ></Form.File>
                                {uploading && <Loader />}
                            </Form.Group>
                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    type="description"
                                    placeholder="Enter description"
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type="category"
                                    placeholder="Enter category"
                                    value={newProduct.category}
                                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="price"
                                    placeholder="Enter price"
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='countInStock'>
                                <Form.Label>Count in stock</Form.Label>
                                <Form.Control
                                    type="countInStock"
                                    placeholder="Enter count in stock"
                                    value={newProduct.countInStock}
                                    onChange={(e) => setNewProduct({ ...newProduct, countInStock: e.target.value })}
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

export default SeedListEdit 
