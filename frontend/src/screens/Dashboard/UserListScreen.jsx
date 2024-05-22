import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import UserList from '../../components/DashBoard/UserList/UserList'
import Meta from '../../components/Helmet/Meta'
import SideBarComponents from '../../components/SideBar/SideBarComponents'

const UserListScreen = () => {
    return (
        <div style={{ marginTop: "110px" }}>
            <Meta
                title="Krishi Sarathi | Admin Users"
            />
            <Container fluid className='all'>
                <Row>
                    <Col md={3}>
                        <h3 style={{fontFamily: "Poppins, sans-serif"}}>Krishi Sarathi Users</h3>
                    </Col>
                    <Col md={9}>
                        <h2 style={{ marginLeft: "30px",marginTop: '15px', fontFamily: "Poppins, sans-serif" }}>User List</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <SideBarComponents />
                    </Col>
                    <Col md={9}>
                        <UserList />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UserListScreen
