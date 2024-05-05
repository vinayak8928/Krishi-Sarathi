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
import Message from './../../../components/Message/Message'
import Loader from './../../../components/Loader/Loader'
import FormContainer from './../../../components/FormContainer/FormContainer'
import { listLendMachineProductsDetails, updateLendMachine } from './../../../actions/productLendMachinesActions'
import { MACHINE_UPDATE_RESET } from '../../../constants/productConstants'
import Meta from '../../../components/Helmet/Meta'

const MachineListEdit = ({ match }) => {

    const [seller, setSeller] = useState('')
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [machine_power, setMachine_power] = useState('')
    const [uploading, setUploading] = useState(false)

    const productId = match.params.id

    const dispatch = useDispatch()
    let history = useHistory()

    const productLendMachinesDetails = useSelector(state => state.productLendMachinesDetails)
    const { loading, productLendMachines, error } = productLendMachinesDetails

    const LendMachinesUpdate = useSelector(state => state.LendMachinesUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = LendMachinesUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: MACHINE_UPDATE_RESET })
            // history.push('/admin/productlist')
            history.push(`/farmers/lendMachines/${productLendMachines._id}`)

        } else {
            if (!productLendMachines.seller || productLendMachines._id !== productId) {
                dispatch(listLendMachineProductsDetails(productId))
            } else {
                setSeller(productLendMachines.seller)
                setName(productLendMachines.name)
                setDescription(productLendMachines.description)
                setPrice(productLendMachines.price)
                setImage(productLendMachines.image)
                setCategory(productLendMachines.category)
                setQuantity(productLendMachines.quantity)
                setMachine_power(productLendMachines.machine_power)
            }
        }
    }, [history, productLendMachines, dispatch, productId, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateLendMachine({
            _id: productId,
            name,
            image,
            price,
            seller,
            description,
            category,
            quantity,
            machine_power
        }))
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

            setImage(data)
            setUploading(false)

        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const goBackHandler = () => {
        history.push(`/farmers/lendMachines/${productLendMachines._id}`);
      };

    return (
        <Container style={{ marginBottom: '50px' }}>
            <Meta
                title="Krishi Sarathi | Machine Edit"
            />
            <FormContainer>
                <h2 style={{ marginTop: '120px', textAlign: 'center' }}>Lend Machines</h2>
                <Link to="#" className="btn btn-light my-3" onClick={goBackHandler}>
                    GO BACK
                </Link>
                {loading && <Loader />}
                {error && <Message variant='danger'>{error}</Message>}
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {successUpdate && <Message variant='success'>Profile Updated!</Message>}
                <Form onSubmit={submitHandler}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="name"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="price"
                                    placeholder="Enter price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='seller'>
                                <Form.Label>Seller Name</Form.Label>
                                <Form.Control
                                    type="name"
                                    placeholder="Enter seller name"
                                    value={seller}
                                    onChange={(e) => setSeller(e.target.value)}
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
                                    placeholder="Enter description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                        <Form.Group controlId='category'>
                                <Form.Label>Category</Form.Label>
                                {/* <Form.Control
                                    type="category"
                                    placeholder="Enter Category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                ></Form.Control> */}
                                <Form.Control
                                    type="category"
                                    as='select'
                                    // placeholder="Enter Category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}>
                                    <option value=''>Choose category...</option>
                                    <option value='1'>Threshers</option>
                                    <option value='2'>Tillages</option>
                                    <option value='3'>Tractors</option>
                                    <option value='4'>Harrows</option>
                                    <option value='5'>Harvesters</option>
                                    <option value='6'>Mowers</option>
                                    <option value='7'>Irrigation</option>
                                    <option value='8'>Sprayers</option>
                                </Form.Control>
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
                            <Form.Group controlId='machinepower'>
                                <Form.Label>Machine Power</Form.Label>
                                <Form.Control
                                    type="machinepower"
                                    placeholder="Enter machine power"
                                    value={machine_power}
                                    onChange={(e) => setMachine_power(e.target.value)}
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

export default MachineListEdit 
