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

    useEffect(() => {
        dispatch(listLendMachineProducts())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const showMore = () => {
        if (numberOfItems + 3 <= productLendMachines.length) {
            setNumberOfItems(numberOfItems + 3)
        } else {
            setNumberOfItems(productLendMachines.length)
        }
    }

    // Filter machines whose names contain the word "Threshers"
    const filteredThreshers = productLendMachines.filter(machine => machine.name.toLowerCase().includes('thresher'));

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
                                        numberOfItems >= filteredThreshers.length
                                            ? <Alert style={{ backgroundColor: 'red' }} className="col-md-12 text-center">Finished</Alert>
                                            : ''
                                    }
                                    <Button className="col-md-12 text-center" variant="success outline-dark" onClick={showMore}>show more</Button>
                                </Row>
                            )
                }
            </Container>
        </div>
    )
}

export default Thresher_LendScreen
