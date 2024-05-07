import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Button, Alert } from 'react-bootstrap'
import LendMachines from './../../components/LendMachines//LendMachines';

import './ThresherStyles.css'
import Message from './../../components/Message/Message';
import Loader from './../../components/Loader/Loader';

import { listLendMachineProducts } from './../../actions/productLendMachinesActions'
import Meta from '../../components/Helmet/Meta';

const Thresher_LendScreen = () => {
    const dispatch = useDispatch()

    const productLendMachinesList = useSelector(state => state.productLendMachinesList)
    const { loading, error, productLendMachines } = productLendMachinesList

    const [numberOfItems, setNumberOfItems] = useState(3);
    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        dispatch(listLendMachineProducts())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const showMore = () => {
        if (numberOfItems + 3 <= productLendMachines.length) {
            setNumberOfItems(numberOfItems + 3)
            setShowAlert(false); 
        } else {
            setNumberOfItems(productLendMachines.length)
            setShowAlert(true); 
        }
    }

    // Filter machines whose names contain the word "Threshers"
    // const filteredThreshers = productLendMachines.filter(machine => machine.category.toLowerCase().includes('thresher'));
    const filteredThreshers = productLendMachines.filter(machine => machine.category === 'Threshers');
    return (

        <div className="MachineLendScreen">
            <Meta
                title="Threshers"
            />
            <Container>
                <h1 className="p-3" style={{ textAlign: 'center' }}>Threshers</h1>
                {
                    loading
                        ? <Loader />
                        : error ? <Message variant='danger'>{error}</Message>
                            : (
                                <Row>
                                    {
                                        filteredThreshers
                                            .slice(0, numberOfItems)
                                            .map(machine => (
                                                <LendMachines
                                                    key={machine._id}
                                                    _id={machine._id}
                                                    name={machine.name}
                                                    image={machine.image}
                                                    targetPlant={machine.target_plant}
                                                    price={machine.price}
                                                    quantity={machine.quantity}
                                                />
                                            ))
                                    }
                                     {
                                        showAlert && numberOfItems >= productLendMachines.length && // Display alert conditionally
                                            <Alert style={{ backgroundColor: 'red' }} className="col-md-12 text-center">No more results!</Alert>
                                    }
                                    <Button className="col-md-12 text-center" variant="success outline-dark" onClick={showMore}>Show more</Button>
                                </Row>
                            )
                }
            </Container>
        </div>
    )
}

export default Thresher_LendScreen
