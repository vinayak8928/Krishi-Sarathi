import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Button, Alert } from 'react-bootstrap'
import LendMachines from './../../components/LendMachines//LendMachines';

import './HarrowsStyles.css'
import Message from './../../components/Message/Message';
import Loader from './../../components/Loader/Loader';

import { listLendMachineProducts } from './../../actions/productLendMachinesActions'
import Meta from '../../components/Helmet/Meta';

const Harrows_LendScreen = () => {
    const dispatch = useDispatch()

    const productLendMachinesList = useSelector(state => state.productLendMachinesList)
    const { loading, error, productLendMachines } = productLendMachinesList

    const [numberOfItems, setNumberOfItems] = useState(3);
    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        dispatch(listLendMachineProducts())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const harrowsList  = productLendMachines.filter(machine => machine.category === 'Harrows');

    const showMore = () => {
        if (numberOfItems + 3 <= harrowsList.length) {
            setNumberOfItems(numberOfItems + 3)
        } else {
            setNumberOfItems(harrowsList.length)
        }
    }

    // Filter machines whose names contain the word "Threshers"

    // const thresherss = productLendMachines.filter(machine => machine.category === 'Thresher');
    return (

        <div className="MachineLendScreen">
            <Meta
                title="Harrows"
            />
            <Container>
                <h1 className="p-3" style={{ textAlign: 'center' }}>HARROWS</h1>
                {
                    loading
                        ? <Loader />
                        : error ? <Message variant='danger'>{error}</Message>
                            : (
                                <Row>
                                    {
                                        harrowsList
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
                                     {numberOfItems >= harrowsList.length ? (
                                    <Alert
                                        style={{ backgroundColor: "red" }}
                                        className="col-md-12 text-center">
                                        No more results!
                                    </Alert>
                                    ) : (

                                    <Button
                                    className="col-md-12 text-center"
                                    variant="success outline-dark"
                                    onClick={showMore}>
                                    show more
                                    </Button>
                                    )}
                                </Row>
                            )
                }
            </Container>
        </div>
    )
}

export default Harrows_LendScreen
