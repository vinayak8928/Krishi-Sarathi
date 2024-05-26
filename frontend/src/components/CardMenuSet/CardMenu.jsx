import React from 'react'
import {
    Container,
    Row,
    Card,
    CardDeck,
    Button
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './CardMenuStyles.css'

const CardMenu = () => {
    return (
        <Container><Row>
            <CardDeck className='card-deck'>
                {/* <Card border='primary'>
                    <Card.Body>
                        <Card.Title className='title'>Farmer</Card.Title>
                        <Card.Text className='card-text'>If you are a farmer then you are at perfect platfrom from where you can rent variety of farming related tools and machines.</Card.Text>
                        <Link to='/farmer'>
                            <Button variant="success" className="btn-explore btn-md m-2">EXPLORE MORE</Button>
                        </Link>
                    </Card.Body>
                </Card> */}
                <Card border='primary'>
                    <Card.Body className="text-center">
                        <Card.Title className='title'>Supplier</Card.Title>
                        <Card.Text className='card-text'>
                            Rent your wide variety of products related to farming, through our platform. We have millions of farmers connected from all parts of country.
                        </Card.Text>
                        <Link to='login?redirect=supplier'>
                            <Button variant="success" className="btn-explore btn-md m-2">EXPLORE MORE</Button>
                        </Link>
                    </Card.Body>
                </Card>
                <Card border='primary'>
                    <Card.Body className="text-center">
                        <Card.Title className='title'>Consumer</Card.Title>
                        <Card.Text className='card-text'>
                            No need to buy heavy machines and equipments everytime!!! Just order here and and get all kinds of equipments for rent at cheaper rate. Why to wait? Go and order.
                        </Card.Text>
                        <Link to='/farmer'>
                            <Button variant="success" className="btn-explore btn-md m-2">EXPLORE MORE</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </CardDeck>
        </Row></Container>
    )
}

export default CardMenu
