import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import EditProfile from '../../components/DashBoard/Profile/EditProfile'
import Meta from '../../components/Helmet/Meta'
import SideBarComponents from '../../components/SideBar/SideBarComponents'

const ProfileScreen = () => {
    return (
        <div style={{ marginTop: "110px" }}>
            <Meta
                title="Krishi Sarathi | Admin Profile"
            />
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <h3 style={{fontFamily: "Poppins, sans-serif"}}>Admin Profile</h3>
                    </Col>
                    <Col md={9}>
                        <h2 style={{ marginLeft: "30px" ,marginTop: '15px'}}>Edit Profile</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <SideBarComponents />
                    </Col>
                    <Col md={9}>
                        <EditProfile />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProfileScreen
