import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import OrderList from '../../components/DashBoard/OrderList/OrderList'
import Meta from '../../components/Helmet/Meta'
import SideBarComponents from '../../components/SideBar/SideBarComponents'

const OrderListScreen = () => {
    return (
        <div style={{ marginTop: "110px" }}>
            <Meta
                title="Krishi Sarathi | Admin Orders"
            />
            <Container fluid className='all'>
                <Row>
                    <Col md={3}>
                        <h3 style={{fontFamily: "Poppins, sans-serif"}}>Orders</h3>
                    </Col>
                    <Col md={9}>
                        <h2 style={{ marginLeft: "30px", fontFamily: "Poppins, sans-serif", marginTop: '15px'} }>All Orders</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <SideBarComponents />
                    </Col>
                    <Col md={9}>
                        <OrderList />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default OrderListScreen
