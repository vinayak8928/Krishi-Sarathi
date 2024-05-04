import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Button, Alert } from 'react-bootstrap'
import LendMachines from './../../components/LendMachines//LendMachines';

import './PlowsStyles.css'
import Message from './../../components/Message/Message';
import Loader from './../../components/Loader/Loader';

import { listLendMachineProducts } from './../../actions/productLendMachinesActions'
import Meta from '../../components/Helmet/Meta';

const Plows_LendScreen = () => {
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
    const filteredPlows = productLendMachines.filter(machine => machine.category.toLowerCase().includes('plows'));
    // const thresherss = productLendMachines.filter(machine => machine.category === 'Thresher');
    return (

        <div className="MachineLendScreen">
            <Meta
                title="Plows"
            />
            <Container>
                <h1 className="p-3" style={{ textAlign: 'center' }}>PLOWS</h1>
                {
                    loading
                        ? <Loader />
                        : error ? <Message variant='danger'>{error}</Message>
                            : (
                                <Row>
                                    {
                                        filteredPlows
                                            .slice(0, numberOfItems)
                                            .map(machine => (
                                                <LendMachines
                                                    key={machine._id}
                                                    _id={machine._id}
                                                    name={machine.name}
                                                    image={machine.image}
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

export default Plows_LendScreen