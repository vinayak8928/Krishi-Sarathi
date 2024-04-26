import React from 'react'
import {
    Container,
    Row,
    CardDeck,
    Card,
    Button
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import Meta from '../../components/Helmet/Meta';
import './FarmerStyle.css'

const FarmerScreen = () => {
    return (
        <div>
            <Meta
                title="Krishi Sarathi | CONSUMER"
            />
            <Container className='farmerContainer'>

                {/* <h1 className='title'>CONSUMER</h1> */}
                <h1 className='title' style={{ fontWeight: 'bold' }}>Farmers</h1>
                <h4 className="farmer-title">Welcome to Krishi Sarathi! Discover a convenient platform for renting heavy machines and farming equipment. Reduce your financial burden by renting equipment from fellow farmers, promoting cost-effective and collaborative farming practices.</h4>



                {/* <h4 className="farmer-title">Welcome to Krishi Sarathi! If you are a farmer then you are at perfect platfrom from where you can rent variety of farming related tools and machines.</h4> */}
                {/* <Row className="row-one justify">

//                 <h1 className='title'>CONSUMER</h1>
//                 <h4 className="farmer-title">Welcome to Krishi Sarathi! If you are a farmer then you are at perfect platfrom from where you can rent variety of farming related tools and machines.</h4>
//                 <Row className="row-one justify">

                    <CardDeck>
                        {/* <Card border="primary" style={{ width: '25rem' }}>
                            <Card.Body>
                                <Card.Title className="card-titile">Purchase Seeds, Pesticides & Fertilizer</Card.Title>
                                <LinkContainer to="/farmers/purchaseSeeds">
                                    <Button className="btn-explore btn-md m-2">EXPLORE MORE</Button>
                                </LinkContainer>
                            </Card.Body>
                        </Card> }
                        <Card border="primary" style={{ width: '35rem' }}>
                            <Card.Body>
                                <Card.Title className="card-titile">Sell Your Producing Material through Us</Card.Title>
                                <LinkContainer to="/login?redirect=supplier">
                                    <Button className="btn-explore btn-md m-2">EXPLORE MORE</Button>
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                        <Card border="primary" style={{ width: '35rem' }}>
                            <Card.Body>
                                <Card.Title className="card-titile">Lend All of Heavy Machine And Tractros</Card.Title>
                                <LinkContainer to="/farmers/lendMachines">
                                    <Button className="btn-explore btn-md m-2">EXPLORE MORE</Button>
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </Row> */}
                    <div style={{ marginBottom: '40px' }}></div>
                    <Card border="primary" style={{ width: '40rem', margin: 'auto' }}>
                    <Card.Body className="text-center">
                        <Card.Title className="card-title">Rent Heavy Machines And Farming Equipment Here</Card.Title>
                        <LinkContainer to="/farmers/lendMachines">
                            <Button className="btn-explore btn-md m-3" style={{ width: '800px', margin: 'auto' }}>EXPLORE MORE</Button>
                        </LinkContainer>
                    </Card.Body>
                    </Card>
            </Container>
        </div>
    )
}

export default FarmerScreen
