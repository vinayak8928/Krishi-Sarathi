import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "./../../components/CheckoutSteps/CheckoutSteps";
import FormContainer from "../../components/FormContainer/FormContainer";
import { saveShippingAddress } from "./../../actions/cartActions.js";
import Meta from "../../components/Helmet/Meta";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";

let val;
const ShippingScreen = ({}) => {
  const history = useHistory();
  const location = useLocation();
  const data = location.state;
  val=data.amt;

  const cart = useSelector((state) => state.cartSeed);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    // history.push("/payment");
    history.push({
        pathname: '/payment',
        state: { amt: val }
      });
    
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <FormContainer>
        <Meta title="Krishi Sarathi | Shipping" />
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>

        {/* <h1>Amt: {data.amt}</h1> */}

        <Form onSubmit={submitHandler} style={{ marginBottom: "40px" }}>
          <Form.Group controlId="address">
            <Form.Label>
              Address <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>
              City <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId="postalCode">
            <Form.Label>
              Postal Code <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>
              Country <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}></Form.Control>
          </Form.Group>
          <Button type="submit">Continue</Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default ShippingScreen;
