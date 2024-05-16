import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "./../../components/CheckoutSteps/CheckoutSteps";
import Message from "../../components/Message/Message";
import { createOrder } from "./../../actions/orderAction";
import Meta from "../Helmet/Meta";
import { setAmt } from "./../../actions/cartActions";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
let val;
let val_duration;
let val_inp;
const PlaceOrder = ({}) => {
  const history = useHistory();
  const location = useLocation();
  const data = location.state;

  val = data && data.amt ? data.amt : 0; //item amt
  val_duration = data && data.selectedDurations ? data.selectedDurations : 0;
  val_inp = data && data.enteredDurations ? data.enteredDurations : 0;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAmt(val));
  }, [dispatch, val]);

  const cart = useSelector((state) => state.cartSeed);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSelectDate = () => {
    // Navigate to the Duration page with selected date and item details
    history.push({
      pathname: "/duration",
      state: {
        selectedDate: selectedDate,
        cartItems: cart.cartItems,
        val_inp: val_inp,
        val_duration: val_duration,
      },
    });
  };
  // Calculate Price
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  cart.shippingPrice = val > 100 ? 0 : 50;
  cart.taxPrice = addDecimals(Number(0.04 * val).toFixed(2));
  cart.totalPrice = (
    Number(val) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, success]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: val,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  // Function to validate the selected date and time based on user input
  const validateSelectedDate = (item, index) => {
    let durationInMillis = 0;
    if (val_duration[item.seed] === "hours") {
      durationInMillis = val_inp[item.seed] * 60 * 60 * 1000;
    } else if (val_duration[item.seed] === "days") {
      durationInMillis = val_inp[item.seed] * 24 * 60 * 60 * 1000;
    } else if (val_duration[item.seed] === "weeks") {
      durationInMillis = val_inp[item.seed] * 7 * 24 * 60 * 60 * 1000;
    }

    const selectedDuration =
      dates[index].endDate.getTime() - dates[index].startDate.getTime();
    const durationDifference = Math.abs(selectedDuration - durationInMillis);
    const tolerance = 1000; // Adjust tolerance as needed
    // console.log("dif is",dates[index].startDate.getTime());
    return durationDifference <= tolerance;
  };
  const handleDateChange = (date, index, type) => {
    const newDates = [...dates];
    const newDate =
      type === "start"
        ? { ...newDates[index], startDate: date }
        : { ...newDates[index], endDate: date };
    newDates[index] = newDate;
    setDates(newDates);

    // Validate date and time when changing
    const isValid = validateSelectedDate(cart.cartItems[index], index);
    const newDateErrors = [...dateErrors];
    newDateErrors[index] = !isValid;
    setDateErrors(newDateErrors);
  };
  // useEffect(() => {
  //   // Initialize dates array
  //   const initialDates = cart.cartItems.map(() => ({
  //     startDate: new Date(),
  //     endDate: new Date()
  //   }));
  //   setDates(initialDates);
  // }, [cart.cartItems]);
  const initialDates = cart.cartItems.map(() => ({
    startDate: new Date(),
    endDate: new Date(),
  }));
  const [dates, setDates] = useState(initialDates);
  const [dateErrors, setDateErrors] = useState(
    Array(cart.cartItems.length).fill(false)
  );
  return (
    <div style={{ marginTop: "100px" }}>
      <Container>
        <Meta title="Krishi Sarathi | Order" />
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <CheckoutSteps step1 step2 step3 step4 />
          </Col>
        </Row>
        {/* <h1>Amt: {data.amt}</h1> */}
        <Row>
          <Col md={8}>
            <ListGroup variant="flush" className="mb-3">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Address : </strong>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                  {cart.shippingAddress.postalCode},{" "}
                  {cart.shippingAddress.country}
                </p>
              </ListGroup.Item>
              {/* <ListGroup.Item>
                <h2>Slot Booked</h2>
                <p>
                  <strong>Start Date & Time : </strong>
                  {new Date(cart.shippingAddress.slotBooking.startDateTime).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                </p>
                <p>
                  <strong>End Date & Time : </strong>
                  {new Date(cart.shippingAddress.slotBooking.endDateTime).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                </p>
              </ListGroup.Item> */}
              <ListGroup.Item>
                {/* Button to select date and time */}
                <Button onClick={handleSelectDate}>Select Date and Time</Button>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method : </strong>
                  {cart.paymentMethod}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>
                {cart.cartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          {/* Row headings */}
                          <Col md={1}>
                            <strong>Item Image</strong>
                          </Col>
                          <Col>
                            <strong>Item Name</strong>
                          </Col>
                          <Col md={2}>
                            <strong>Item Qty</strong>
                          </Col>
                          <Col md={2}>
                            <strong>Price</strong>
                          </Col>
                          <Col md={2}>
                            <strong>Duration</strong>
                          </Col>
                          <Col md={3}>
                            <strong>Amount</strong>
                          </Col>
                          {/* Item details */}
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>

                          <Col>{item.name}</Col>
                          <Col md={2}>{item.qty}</Col>
                          <Col md={2}>RS. {item.price}</Col>
                          <Col md={2}>
                            {val_inp[item.seed]} {val_duration[item.seed]}
                          </Col>
                          <Col md={3}>
                            {val_duration[item.seed] === "hours"
                              ? `RS. ${
                                  item.qty * val_inp[item.seed] * item.price
                                }`
                              : val_duration[item.seed] === "weeks"
                              ? `RS. ${
                                  item.qty *
                                  val_inp[item.seed] *
                                  item.price *
                                  60
                                }`
                              : val_duration[item.seed] === "days"
                              ? `RS. ${
                                  item.qty *
                                  val_inp[item.seed] *
                                  item.price *
                                  10
                                }`
                              : ""}
                          </Col>
                          
                          <Col md={6}>
                            <Form.Group controlId={`slotBooking_${index}`}>
                              <Form.Label><strong>Slot Booking</strong></Form.Label>
                              <div>
                                <label>Start Date and Time: </label>
                                <DatePicker
                                  selected={dates[index].startDate}
                                  onChange={(date) =>
                                    handleDateChange(date, index, "start")
                                  }
                                  showTimeSelect
                                  dateFormat="Pp"
                                />
                              </div>
                              <div>
                                <label>End Date and Time: </label>
                                <DatePicker
                                  selected={dates[index].endDate}
                                  onChange={(date) =>
                                    handleDateChange(date, index, "end")
                                  }
                                  showTimeSelect
                                  dateFormat="Pp"
                                />
                              </div>
                              {/* Display validation message */}
                              {dateErrors[index] && (
                                <span style={{ color: "red" }}>
                                  Please select the correct duration
                                </span>
                              )}
                              <br />
                            </Form.Group>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    {/* <Col>Items</Col>
                    <Col>{`RS. ${cart.itemsPrice}`}</Col> */}
                    <Col>Items</Col>
                    <Col>
                      {`RS.`} {val}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>{`RS. ${cart.shippingPrice}`}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>{`RS. ${cart.taxPrice}`}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>{`RS. ${cart.totalPrice}`}</Col>
                  </Row>
                </ListGroup.Item>

                {/* <ListGroup.Item>
                  <Row>
                    <Col>Subtotal:</Col>
                    <Col>RS. {subtotal}</Col>
                    {/* Use props.subtotal to display the subtotal
                  </Row>
                </ListGroup.Item> */}

                <ListGroup.Item>
                  {error && (
                    <ListGroup.Item>
                      <Message variant="danger">{error}</Message>
                    </ListGroup.Item>
                  )}
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cart.cartItems === 0}
                    onClick={placeOrder}>
                    Place Order
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PlaceOrder;
