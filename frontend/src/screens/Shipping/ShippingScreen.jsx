import React, { useEffect, useState } from "react";
import { Form, Button,Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "./../../components/CheckoutSteps/CheckoutSteps";
import FormContainer from "../../components/FormContainer/FormContainer";
import { saveShippingAddress } from "./../../actions/cartActions.js";
import Meta from "../../components/Helmet/Meta";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { setAmt } from "./../../actions/cartActions";
// import {AddressValidator} from "react-address-validator";

let val_amt;
let val_duration;
let val_inp;
const ShippingScreen = ({}) => {
  const history = useHistory();
  const location = useLocation();
  const data = location.state;
  
  // console.log("vall",vall);
  val_amt = data && data.amt ? data.amt : 0;
  val_duration = data && data.selectedDurations ? data.selectedDurations : 0;
  val_inp = data && data.enteredDurations ? data.enteredDurations : 0;


  const cart = useSelector((state) => state.cartSeed);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAmt( val_amt));
  }, [dispatch,  val_amt]);

  const isValidIndianPostalCode = (postalCode) => {
    const indianPostalCodePattern = /^\d{6}$/;
    return indianPostalCodePattern.test(postalCode);
  };
  
  const submitHandler = (e) => {
    e.preventDefault();
    if (!isValidIndianPostalCode(postalCode)) {
      // Set error message for invalid postal code
      setError("Please enter a valid Indian postal code.");
      return;
    }
    // Clear error message
    setError("");
    // Save shipping address and navigate to payment screen
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    // history.push("/payment");
    history.push({
        pathname: '/payment',
        state: { amt: val_amt,
          selectedDurations:val_duration,
          enteredDurations:val_inp,

        },
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
               {error && <Alert variant="danger">{error}</Alert>}
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


