import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import "./ourSerices.css";

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
            <h5 className="sub-title">Heavy Machine</h5>
            <Image className="img" src="images/services/heavy.svg" fluid />
            <p className="sub-desc">
              No need to worry of labour costing more. Just rent all types of
              machine here!!
            </p>
          </Col>
          {/* <Col md={3}>
                        <h5 className="sub-title">Gardening Kits</h5>
                        <Image className="img" src="images/services/gardening.svg" fluid />
                        <p className="sub-desc">We provides all of the gardening related products i.e seeds, pestisides and heavy machine.</p>
                    </Col> */}
          <Col md={4}>
            <h5 className="sub-title">Supplier</h5>
            <Image className="img" src="images/services/supplier.svg" fluid />
            <p className="sub-desc">
              Now you produce. And we are here to sell your product. Just list
              your sell, and get proper pay for it.
            </p>
          </Col>
          <Col md={4}>
            <h5 className="sub-title">Consumer</h5>
            <Image className="img" src="images/services/consumer.svg" fluid />
            <p className="sub-desc">
              Why to visit Super Store and Pay High? Order all products and get
              deliver at your doorstep.
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default OurServices;
