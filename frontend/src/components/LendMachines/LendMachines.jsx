import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Card, Col, Button } from "react-bootstrap";
import "./LendMachines.css";
import Rating from "../Rating/Rating";

const LendMachines = ({ _id, name, image,  price ,power, rating}) => {
  
  return (
    <Col sm={12} md={6} lg={4}>
      <Card className="my-3 p-3 my-card">
        <Card.Img
          className="image card-image mx-auto"
          src={image}
          variant="top"
        />
        <Card.Body>
          <LinkContainer to={`/farmers/lendMachines/${_id}`}>
            <Card.Title className="title">
              <h2><strong>{name}</strong></h2>
            </Card.Title>
          </LinkContainer>
          

          {/* <Card.Text>
            <span style={{ fontWeight: "bold" }}>Target Plants </span>
            <br /> {targetPlant}
          </Card.Text> */}

          <Card.Text>
            <h4>RS.{price}</h4>
          </Card.Text>
          <Rating value={rating}  color="#f8e825" />
          {/* <Rating value={rating} /> */}
          <LinkContainer to={`/farmers/lendMachines/${_id}`}>
            <Button className="btn-preview" varient="success">
              Preview here
            </Button>
          </LinkContainer>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default LendMachines;
