import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ProductListHome from '../../components/DashBoard/ProductList/ProductListHome'
import Meta from '../../components/Helmet/Meta'
import SideBarComponents from '../../components/SideBar/SideBarComponents'

const ProductListScreen = () => {
    return (
        <div style={{ marginTop: "110px" }}>
            <Meta
                title="Krishi Sarathi | Admin Products"
            />
            <Container fluid className='all'>
                <Row>
                    <Col md={3}>
                        <h3 style={{fontFamily: "Poppins, sans-serif"}}>Krishi Sarathi Products</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <SideBarComponents />
                    </Col>
                    <Col md={9}>
                        <ProductListHome />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProductListScreen
