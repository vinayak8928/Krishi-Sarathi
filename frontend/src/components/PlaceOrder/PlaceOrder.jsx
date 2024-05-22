// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Button,
//   Row,
//   Col,
//   ListGroup,
//   Image,
//   Card,
//   Alert,
// } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import CheckoutSteps from "./../../components/CheckoutSteps/CheckoutSteps";
// import Message from "../../components/Message/Message";
// import { createOrder } from "./../../actions/orderAction";
// import Meta from "../Helmet/Meta";
// import { setAmt } from "./../../actions/cartActions";
// import { useLocation } from "react-router-dom";
// import { useHistory } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// let val;
// let val_duration;
// // let val_inp;
// const PlaceOrder = ({}) => {
//   const history = useHistory();
//   const location = useLocation();
//   const data = location.state;
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [errors, setErrors] = useState("");

//   val = data && data.amt ? data.amt : 0; //item amt
//   val_duration = data && data.selectedDurations ? data.selectedDurations : 0;
//   // val_inp = data && data.enteredDurations ? data.enteredDurations : 0;
//   // const val_amt = data && data.amt ? data.amt : 0;
//   // const val_durationKey = data && data.selectedDurations ? Object.keys(data.selectedDurations)[0] : null;
//   // const val_duration = val_durationKey ? data.selectedDurations[val_durationKey] : 0;
//   const val_inpKey = data && data.enteredDurations ? Object.keys(data.enteredDurations)[0] : null;
//   const val_inp = val_inpKey ? data.enteredDurations[val_inpKey] : 0;
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(setAmt(val));
//   }, [dispatch, val]);

//   const cart = useSelector((state) => state.cartSeed);
//   // const { cartItems, shippingAddress, paymentMethod } = cart;
//   // const {
//   //   cartItems,
//   //   shippingAddress,
//   //   paymentMethod,
//   //   durationOptions,
//   //   durationInputs,
//   // } = cart;

//   // const orderItems = cartItems.map((item) => ({
//   //   ...item,
//   //   duration: "hours", // Set default duration or fetch it from somewhere
//   // }));
//   // const subtotal = calculateSubtotal(cartItems, durationOptions, durationInputs);

//   // Calculate Price
//   const addDecimals = (num) => {
//     return (Math.round(num * 100) / 100).toFixed(2);
//   };

//   cart.itemsPrice = cart.cartItems
//     .reduce((acc, item) => acc + item.qty * item.price, 0)
//     .toFixed(2);

//   cart.shippingPrice = val > 100 ? 0 : 50;
//   cart.taxPrice = addDecimals(Number(0.04 * val).toFixed(2));
//   cart.totalPrice = (
//     Number(val) +
//     Number(cart.shippingPrice) +
//     Number(cart.taxPrice)
//   ).toFixed(2);

//   const orderCreate = useSelector((state) => state.orderCreate);
//   const { order, success, error } = orderCreate;

//   useEffect(() => {
//     if (success) {
//       history.push(`/order/${order._id}`);
//     }
//   }, [history, success]);

//   const placeOrder = () => {
//     dispatch(
//       createOrder({
//         orderItems: cart.cartItems,
//         shippingAddress: cart.shippingAddress,
//         paymentMethod: cart.paymentMethod,
//         itemsPrice: val,
//         shippingPrice: cart.shippingPrice,
//         taxPrice: cart.taxPrice,
//         totalPrice: cart.totalPrice,
//       })
//     );
//   };

//   const validateDuration = () => {
//     const diffInMs = endDate - startDate;
//     const diffInHours = diffInMs / (1000 * 60 * 60);
//     console.log("inp time :",val_inp);
//     console.log("diffInms:",diffInMs);
//     console.log("diffInHours :",diffInHours);
//     console.log("val_duration :",val_duration);

//     if (val_duration === "hours" && diffInHours !== parseInt(val_inp)) {
//       return `Please select an end date and time that is exactly ${val_inp} hour(s) from the start date and time.`;
//     } else if (val_duration === "days" && diffInHours !== parseInt(val_inp) * 24) {
//       return `Please select an end date and time that is exactly ${val_inp} day(s) from the start date and time.`;
//     } else if (val_duration === "weeks" && diffInHours !== parseInt(val_inp) * 24 * 7) {
//       return `Please select an end date and time that is exactly ${val_inp} week(s) from the start date and time.`;
//     }
//     return "";
//   };

//   const validateSlot = () =>{
//     const durationError = validateDuration();
//     if (durationError) {
//       setErrors(durationError);
//       return;
//     }
//   }

//   return (
//     <div style={{ marginTop: "100px" }}>
//       <Container>
//         <Meta title="Krishi Sarathi | Order" />
//         <Row className="justify-content-md-center">
//           <Col xs={12} md={6}>
//             <CheckoutSteps step1 step2 step3 step4 />
//           </Col>
//         </Row>
//         {/* <h1>Amt: {data.amt}</h1> */}
//         <Row>
//           <Col md={8}>
//             <ListGroup variant="flush" className="mb-3">
//               <ListGroup.Item>
//                 <h2>Shipping</h2>
//                 <p>
//                   <strong>Address : </strong>
//                   {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
//                   {cart.shippingAddress.postalCode},{" "}
//                   {cart.shippingAddress.country}
//                 </p>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <h2>Slot Booked</h2>
//                 <p>
//                   <strong>Start Date & Time : </strong>
//                   {new Date(cart.shippingAddress.slotBooking.startDateTime).toLocaleString('en-GB', {
//                       day: '2-digit',
//                       month: 'short',
//                       year: 'numeric',
//                       hour: '2-digit',
//                       minute: '2-digit',
//                       hour12: true
//                     })}
//                 </p>
//                 <p>
//                   <strong>End Date & Time : </strong>
//                   {new Date(cart.shippingAddress.slotBooking.endDateTime).toLocaleString('en-GB', {
//                       day: '2-digit',
//                       month: 'short',
//                       year: 'numeric',
//                       hour: '2-digit',
//                       minute: '2-digit',
//                       hour12: true
//                     })}
//                 </p>
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 <h2>Payment Method</h2>
//                 <p>
//                   <strong>Method : </strong>
//                   {cart.paymentMethod}
//                 </p>
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 <h2>Order Items</h2>
//                 {cart.cartItems.length === 0 ? (
//                   <Message>Your cart is empty</Message>
//                 ) : (
//                   <ListGroup variant="flush">
//                     {cart.cartItems.map((item, index) => (
//                       <ListGroup.Item key={index}>
//                         <Row>
//                           {/* Row headings */}
//                           <Col md={2}>
//                             <strong>Item Image</strong>
//                           </Col>
//                           <Col md={3}>
//                             <strong>Item Name</strong>
//                           </Col>
//                           <Col md={1}>
//                             <strong>Item Qty</strong>
//                           </Col>
//                           <Col md={2}>
//                             <strong>Price</strong>
//                           </Col>
//                           <Col md={2}>
//                             <strong>Duration</strong>
//                           </Col>
//                           <Col md={2}>
//                             <strong>Amount</strong>
//                           </Col>
//                           {/* Item details */}
//                           <Col md={2}>
//                             <Image
//                               src={item.image}
//                               alt={item.name}
//                               fluid
//                               rounded
//                             />
//                           </Col>

//                           <Col md={3}>{item.name}</Col>
//                           <Col md={1}>{item.qty}</Col>
//                           <Col md={2}>RS. {item.price}</Col>
//                           <Col md={2}>{val_inp} {val_duration}</Col>
//                           <Col md={2}>
//                             {val_duration === "hours"
//                               ? `RS. ${
//                                   item.qty * val_inp * item.price
//                                 }`
//                               : val_duration === "weeks"
//                               ? `RS. ${
//                                   item.qty *
//                                   val_inp *
//                                   item.price *
//                                   60
//                                 }`
//                               : val_duration === "days"
//                               ? `RS. ${
//                                   item.qty *
//                                   val_inp *
//                                   item.price *
//                                   10
//                                 }`
//                               : ""}
//                           </Col>
//                           <br />
//                           <ListGroup.Item variant="flush">
//                           {/* <Form.Group controlId="slotBooking"> */}
//                             <Col>
//                               <strong>Slot Booking <span style={{ color: "red" }}>*</span></strong>
//                             </Col>
//                             <div>
//                               <label>Start Date and Time: </label>
//                               <DatePicker
//                                 selected={startDate}
//                                 onChange={(date) => setStartDate(date)}
//                                 showTimeSelect
//                                 dateFormat="Pp"
//                               />
//                             </div>
//                             <div>
//                               <label>End Date and Time: </label>
//                               <DatePicker
//                                 selected={endDate}
//                                 onChange={(date) => setEndDate(date)}
//                                 showTimeSelect
//                                 dateFormat="Pp"
//                               />
//                             </div>
//                             {errors && <Alert variant="danger">{errors}</Alert>}
//                             <Button
//                               type="button"
//                               className="btn-block"
//                               disabled={cart.cartItems === 0}
//                               onClick={validateSlot}>
//                               Book Slot
//                             </Button>
//                             </ListGroup.Item>
//                           {/* </Form.Group> */}
//                         </Row>
//                       </ListGroup.Item>
//                     ))}
//                   </ListGroup>
//                 )}
//               </ListGroup.Item>
//             </ListGroup>
//           </Col>
//           <Col md={4}>
//             <Card>
//               <ListGroup variant="flush">
//                 <ListGroup.Item>
//                   <h2>Order Summary</h2>
//                 </ListGroup.Item>

//                 <ListGroup.Item>
//                   <Row>
//                     {/* <Col>Items</Col>
//                     <Col>{`RS. ${cart.itemsPrice}`}</Col> */}
//                     <Col>Items</Col>
//                     <Col>
//                       {`RS.`} {val}
//                     </Col>
//                   </Row>
//                 </ListGroup.Item>

//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Shipping</Col>
//                     <Col>{`RS. ${cart.shippingPrice}`}</Col>
//                   </Row>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Tax</Col>
//                     <Col>{`RS. ${cart.taxPrice}`}</Col>
//                   </Row>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Total</Col>
//                     <Col>{`RS. ${cart.totalPrice}`}</Col>
//                   </Row>
//                 </ListGroup.Item>

//                 {/* <ListGroup.Item>
//                   <Row>
//                     <Col>Subtotal:</Col>
//                     <Col>RS. {subtotal}</Col>
//                     {/* Use props.subtotal to display the subtotal
//                   </Row>
//                 </ListGroup.Item> */}

//                 <ListGroup.Item>
//                   {error && (
//                     <ListGroup.Item>
//                       <Message variant="danger">{error}</Message>
//                     </ListGroup.Item>
//                   )}
//                   <Button
//                     type="button"
//                     className="btn-block"
//                     disabled={cart.cartItems === 0}
//                     onClick={placeOrder}>
//                     Place Order
//                   </Button>
//                 </ListGroup.Item>
//               </ListGroup>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default PlaceOrder;

import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "./../../components/CheckoutSteps/CheckoutSteps";
import Message from "../../components/Message/Message";
import { createOrder } from "./../../actions/orderAction";
import Meta from "../Helmet/Meta";
import { saveShippingAddress, setAmt } from "./../../actions/cartActions";
import { useLocation } from "react-router-dom";
import { useHistory,Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './PlaceOrder.css'

const PlaceOrder = () => {
  const history = useHistory();
  const location = useLocation();
  const data = location.state;
  const [errors, setErrors] = useState("");

  const val = data && data.amt ? data.amt : 0; // item amt
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAmt(val));
  }, [dispatch, val]);

  const cart = useSelector((state) => state.cartSeed);
  const { cartItems } = cart;

  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  cart.shippingPrice = val > 100 ? 0 : 50;
  cart.taxPrice = (0.04 * val).toFixed(2);
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

  

  const [bookingData, setBookingData] = useState(
    cart.cartItems.map(() => ({
      startDate: new Date(),
      endDate: new Date(),
      durationError: "",
    }))
  );

  const handleDateChange = (index, type, date) => {
    const updatedBookingData = [...bookingData];
    updatedBookingData[index][type] = date;
    setBookingData(updatedBookingData);
    if (updatedBookingData[index].durationError) {
      validateSlot(index);
    }
  };

    // Custom error message for slot booking validation errors
    const customErrorMessage = "Please select correct duration for slot booking";
  
    // Check if the error contains specific validation messages related to slot booking
    const isSlotBookingError = error && (
      error.includes('orderItems.0.slotBooking.endDateTime') ||
      error.includes('orderItems.0.slotBooking.startDateTime') ||
      error.includes('orderItems.1.slotBooking.endDateTime') ||
      error.includes('orderItems.1.slotBooking.startDateTime')
    );

  const validateDuration = (startDate, endDate, duration, durationUnit) => {
    const diffInMs = endDate - startDate;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    //     console.log("inp time :",duration);
    // console.log("diffInms:",diffInMs);
    // console.log("diffInHours :",diffInHours);
    // console.log("val_duration :",durationUnit);

    if (durationUnit === "hours" && diffInHours !== parseInt(duration)) {
      return `Please select an end date and time that is exactly ${duration} hour(s) from the start date and time.`;
    } else if (durationUnit === "days" && diffInHours !== parseInt(duration) * 24) {
      return `Please select an end date and time that is exactly ${duration} day(s) from the start date and time.`;
    } else if (durationUnit === "weeks" && diffInHours !== parseInt(duration) * 24 * 7) {
      return `Please select an end date and time that is exactly ${duration} week(s) from the start date and time.`;
    }
    return "";
  };

  const validateSlot = (index) => {
    const item = cart.cartItems[index];
    const { startDate, endDate } = bookingData[index];
    const durationError = validateDuration(
      startDate,
      endDate,
      item.duration.amount,
      item.duration.unit
    );

    const updatedBookingData = [...bookingData];
    updatedBookingData[index].durationError = durationError;
    setBookingData(updatedBookingData);

    if (durationError) {
      setErrors(durationError);
    } else {
      setErrors("");
    }
  };

  const validateAllSlots = () => {
    let hasErrors = false;
    cart.cartItems.forEach((item, index) => {
      validateSlot(index);
      if (bookingData[index].durationError) {
        hasErrors = true;
      }
    });
    return hasErrors;
  };

  const placeOrder = () => {
    const hasErrors = validateAllSlots();
    if (hasErrors) {
      setErrors(customErrorMessage);
      return;
    }
    const orderItemsWithSlotBooking = cart.cartItems.map((item, index) => {
      const booking = bookingData[index];
      if (!booking) {
        console.error(`No booking data found for index ${index}`);
        return item;
      }
  
      return {
        ...item,
        slotBooking: {
          startDateTime: booking.startDate,
          endDateTime: booking.endDate,
        },
      };
    });

    dispatch(
      createOrder({
        orderItems: orderItemsWithSlotBooking,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: val,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div style={{ marginTop: "100px"  }}>
      <Container className="custom-container">
        <Meta title="Krishi Sarathi | Order" />
        <Row className="justify-content-md-center">
          <Col xs={20} md={6}>
            <CheckoutSteps step1 step2 step3 step4 />
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush" className="mb-3">

            <ListGroup.Item>
                {/* <h2>Order Items</h2> */}
                {cart.cartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                           {/* 
                           <Col md={3}>
                             <strong></strong>
                           </Col>
                           <Col md={2}>
                             <strong> </strong>
                           </Col>
                           <Col md={1.5}>                             
                              <strong>Quantity</strong>
                           </Col>
                           <Col md={2}>
                             <strong>Price</strong>
                           </Col>
                           <Col md={2}>
                             <strong>Duration</strong>
                           </Col>
                           <Col md={2}>
                            <strong>T.Amount</strong>
                           </Col> */}
                          <Col md={5}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          {/* <Col md={2}>
                            <Link to={`/farmers/lendMachines/${item.seed}`}>
                                {item.name}
                            </Link>
                          </Col>
                          <Col md={1}>{item.qty}</Col>
                          <Col md={2}>RS. {item.price}</Col>
                          <Col md={2}>{item.duration.amount} {item.duration.unit}</Col>
                          <Col md={2}>
                            {item.duration.unit === "hours"
                              ? `RS. ${item.qty * item.duration.amount * item.price}`
                              : item.duration.unit === "weeks"
                              ? `RS. ${item.qty * item.duration.amount * item.price * 60}`
                              : item.duration.unit === "days"
                              ? `RS. ${item.qty * item.duration.amount * item.price * 10}`
                              : ""}
                          </Col> */}
                          <Col md={5} className="order-item-details-box">
                            <div className="item-name">
                            <Link to={`/farmers/lendMachines/${item.seed}`}>
                                {item.name}
                            </Link>
                            </div>
                            <div className="item-duration">
                              <strong>Quantity : </strong>
                              {item.qty}
                            </div>
                            <div className="item-duration">
                              <strong>Duration : </strong>
                                {item.duration.amount} {item.duration.unit}
                            </div>
                            <div className="item-duration">
                              <strong>Item Price : </strong>
                               {item.price}
                               </div>
                              <div className="item-quantity-price">
                              <strong>Total Price : </strong>
                              {item.duration.unit === "hours"
                              ? `RS. ${item.qty * item.duration.amount * item.price}`
                              : item.duration.unit === "weeks"
                              ? `RS. ${item.qty * item.duration.amount * item.price * 60}`
                              : item.duration.unit === "days"
                              ? `RS. ${item.qty * item.duration.amount * item.price * 10}`
                              : ""}
                                        </div>
                          </Col>
                          <br />
                          <ListGroup.Item variant="flush" style={{ border: "none", fontFamily: "Poppins, sans-serif" }}>
                            <div style={{ marginBottom: "1rem" }}>
                              <strong>Slot Booking <span style={{ color: "red" }}>*</span></strong>
                            </div>
                            <div style={{ marginBottom: "0.5rem" }}>
                              <label style={{ marginRight: "0.5rem" }}>Start Date and Time: </label>
                              <DatePicker
                                selected={bookingData[index].startDate}
                                onChange={(date) => handleDateChange(index, 'startDate', date)}
                                showTimeSelect
                                dateFormat="Pp"
                                className="custom-date-picker"
                              />
                            </div>
                            <div style={{ marginBottom: "0.5rem" }}>
                              <label style={{ marginRight: "0.5rem" }}>End Date and Time: </label>
                              <DatePicker
                                selected={bookingData[index].endDate}
                                onChange={(date) => handleDateChange(index, 'endDate', date)}
                                showTimeSelect
                                dateFormat="Pp"
                                onBlur={() => validateSlot(index)}
                                className="custom-date-picker"
                              />
                            </div>
                            {bookingData[index].durationError && (
                              <Alert variant="danger">
                                {bookingData[index].durationError}
                              </Alert>
                            )}
                          </ListGroup.Item>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
              <ListGroup.Item style={{fontFamily: "Poppins, sans-serif"}}>
                <h2>Shipping</h2>
                <p>
                  <strong>Address : </strong>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                  {cart.shippingAddress.postalCode},{" "}
                  {cart.shippingAddress.country}
                </p>
              </ListGroup.Item>
              {/* {bookingData.map((item, index) => (
  <ListGroup.Item key={index}>
    <h2>Slot Booked</h2>
    
    {bookingData[index] && bookingData[index].startDate && bookingData[index].endDate && (
    <>
      <p>
        <strong>Start Date & Time : </strong>
        {bookingData[index].startDate.toLocaleString('en-GB', {
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
        {bookingData[index].endDate.toLocaleString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })}
      </p>
    </>
  )}
  </ListGroup.Item>
))} */}

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method : </strong>
                  {cart.paymentMethod}
                </p>
              </ListGroup.Item>


            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush" style={{fontFamily: "Poppins, sans-serif"}}>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>RS. {val}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>RS. {cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>RS. {cart.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>RS. {cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {/* <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
                {errors && <Message variant="danger">{errors}</Message>}
                </ListGroup.Item> */}
                {error &&
                <ListGroup.Item>
                    <Alert variant="danger">{error}</Alert>
                </ListGroup.Item>}
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cart.cartItems === 0 || error}
                    onClick={placeOrder}
                  >
                    Place Order
                  </Button>
                  {isSlotBookingError && (
                    <Alert variant="danger">{customErrorMessage}</Alert>
                  )}
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
