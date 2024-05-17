import React, { useEffect, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "./../../components/CheckoutSteps/CheckoutSteps";
import FormContainer from "../../components/FormContainer/FormContainer";
import { savePaymentMethod } from "./../../actions/cartActions.js";
import Meta from "../../components/Helmet/Meta";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { setAmt } from "./../../actions/cartActions";

let val_amt;
let val_duration;
let val_inp;

const PaymentScreen = ({}) => {
  const history = useHistory();
  const location = useLocation();
  const data = location.state;

  
  val_amt = data && data.amt ? data.amt : 0;
  val_duration = data && data.selectedDurations ? data.selectedDurations : 0;
  val_inp = data && data.enteredDurations ? data.enteredDurations : 0;

  // console.log("inp is", val_inp);
  const cart = useSelector((state) => state.cartSeed);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAmt(val_amt));
  }, [dispatch,val_amt]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    // history.push("/placeorder");
    history.push({
      pathname: "/placeorder",
     state: { amt: val_amt,
          selectedDurations:val_duration,
          enteredDurations:val_inp,

        },
    });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <FormContainer>
        <Meta title="Krishi Sarathi | Payment" />
        <CheckoutSteps step1 step2 step3 />

        <h1>Payment Method</h1>
        {/* <h1>Amt: {data.amt}</h1> */}
        <Form onSubmit={submitHandler} style={{ marginBottom: "40px" }}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>

            <Col>
              <Form.Check
                type="radio"
                label="Paypal or Credit Card"
                id="paypal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
              <Form.Check
                type="radio"
                label="Stripe"
                id="Stripe"
                name="paymentMethod"
                value="Stripe"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
            </Col>
          </Form.Group>
          <Button type="submit">Continue</Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default PaymentScreen;
