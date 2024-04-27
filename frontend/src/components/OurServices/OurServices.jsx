import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import "./ourSerices.css";
import { Link } from 'react-router-dom';

const OurServices = () => {
  return (
    <Container className="main" fluid>
      <h1 className="main-title">COMPREHENSIVE SERVICES</h1>
      <p className="description">
        Krishi Sarathi is your go-to platform for revolutionizing agriculture.
        We're dedicated to simplifying the process of renting essential farm
        equipment, eliminating the burdens of ownership and maintenance. For
        farmers, this means access to high-quality tools without the hefty
        upfront costs. Our platform is a game-changer, fostering a collaborative
        community where farmers can both rent and supply equipment. By sharing
        resources, farmers can optimize equipment usage, supporting each other's
        productivity and success. Krishi Sarathi is all about efficiency and
        empowerment. With us, productivity isn't just a goal; it's a guarantee.
        Join Krishi Sarathi today and be part of the agricultural revolution.
        Together, we're reshaping farming for the better, one rental at a time.
      </p>
      <Container className="services">
        <Row>
          <Col md={4}>
            <Link to="/supplier">
            <h5 className="sub-title">Heavy Machine & Equipments</h5>
            <Image className="img" src="images/services/heavyg2.svg" fluid />
            <p className="sub-desc">
              No need to worry of labour costing more. Just rent all types of
              equipments here.
            </p>
            </Link>
          </Col>
          {/* <Col md={3}>
                        <h5 className="sub-title">Gardening Kits</h5>
                        <Image className="img" src="images/services/gardening.svg" fluid />
                        <p className="sub-desc">We provides all of the gardening related products i.e seeds, pestisides and heavy machine.</p>
                    </Col> */}
          <Col md={4}>
          <Link to="/supplier">
            <h5 className="sub-title">Supplier</h5>
            <Image className="img" src="images/services/supplierb1.svg" fluid />
            <p className="sub-desc">
              Just list your equipment, and get proper pay for it by renting.
            </p>
            </Link>
          </Col>
          <Col md={4}>
          <Link to="/farmer">
            <h5 className="sub-title">Consumer</h5>
            <Image className="img" src="images/services/consumerb1.svg" fluid />
            <p className="sub-desc">
              Why to visit Super Store and Pay High? Order required equipments and give it back.
            </p>
          </Link>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default OurServices;
