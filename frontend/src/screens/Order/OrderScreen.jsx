import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
} from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import {
  getOrderDetails,
  payOrder,
  payOrderCOD,
  deliverOrder,
  returnOrder,
  returnRequestOrder
} from "./../../actions/orderAction";
import './OrderScreen.css'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  ORDER_RETURN_RESET,
  ORDER_RETURN_REQUEST,
} from "./../../constants/orderConstant";
import Meta from "../../components/Helmet/Meta";
import { useLocation } from "react-router-dom";
import TrackingBar from "../TrackingBar/TrackingBar";
import '../TrackingBar/TrackingBar.css'


let val;
let val_duration;
let val_inp;
const OrderScreen = ({ match }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();
  let history = useHistory();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver, loading: loadingDeliver } = orderDeliver;

  const orderReturn = useSelector((state) => state.orderReturn);
  const { success: successReturn, loading: loadingReturn } = orderReturn;

  // const orderReturnRequest = useSelector((state) => state.orderReturnRequest);
  // const { success: successReturnRequest, loading: loadingReturnRequest } = orderReturnRequest;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    // Add paypal script to body
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || successReturn) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch({ type: ORDER_RETURN_RESET });
      dispatch({ type: ORDER_RETURN_REQUEST });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order, successDeliver, successReturn, history, userInfo]);
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  // Check if order object is undefined
  if (!order) {
    return <Message variant="danger">Order not found</Message>;
  }
  const onSuccessPaymentHandler = (paymentResult) => {  
    if(order.paymentMethod==="Cash On Delivery"){
      const paymentResult = {
        id: 'N/A', // Assuming 'COD' as the ID for Cash On Delivery
        status: 'COMPLETED', // Assuming 'COD' as the status for Cash On Delivery
        update_time: new Date().toISOString(), // Set the update time to current time
        email_address: 'N/A' // Set email address to 'N/A' for Cash On Delivery
      };
      dispatch(payOrderCOD(orderId));
    }
    console.log("paymentResult",order.paymentMethod);
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const returnHandler = () => {
    dispatch(returnOrder(order));
  };

  const returnRequestHandler = () => {
    dispatch(returnRequestOrder(order));
  };
  // const itemsPrice = order.totalPrice - (order.taxPrice + order.shippingPrice)


  const calculateTotalPrice = (qty, amount, unit, price) => {
    if (unit === "hours") {
      return qty * amount * price;
    } else if (unit === "weeks") {
      return qty * amount * price * 60;
    } else if (unit === "days") {
      return qty * amount * price * 10;
    } else {
      return 0;
    }
  };

  const calculateOrderTotalPrice = (orderItems) => {
    return orderItems.reduce((total, item) => {
      return total + calculateTotalPrice(item.qty, item.duration.amount, item.duration.unit, item.price);
    }, 0);
  };

  const totalOrderPrice = calculateOrderTotalPrice(order.orderItems);

  
  const getStatusClass = (status) => {
    return status ? 'active' : '';
  };

  // const steps = [
  //   { label: 'Paid', isActive: order.isPaid, timing: formatDate(order.paidAt) },
  //   { label: 'Delivered', isActive: order.isDelivered, timing: formatDate(order.deliveredAt) },
  //   { label: 'Return Requested', isActive: order.isReturnRequested, timing: formatDate(order.returnRequestedAt) },
  //   { label: 'Returned', isActive: order.isReturned, timing: formatDate(order.returnedAt) },
  // ];

  function formatDate(date) {
    if (!date) return 'N/A';
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleTimeString([], options);
  }

  return (
    <div>
      <Meta title="Krishi Sarathi | Order" />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container style={{ marginTop: "120px" }} className="custom-container">
          <h2>Order Id : {order._id}</h2>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush" className="mb-3">
              <ListGroup.Item>
                  {/* <h2>Order Items</h2> */}
                  {order.length === 0 ? (
                    <Message>Order is empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={4}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            
                            {/* <Col md={3}><Link to={`/farmers/lendMachines/${item.seed}`}>
                                    {item.name}
                                  </Link>
                            </Col>
                            <Col md={2}>{item.duration.amount} {item.duration.unit}</Col>
                            <Col md={2}>
                              {`${item.qty} x RS. ${item.price} = RS. ${
                                item.qty * item.price
                              }`}
                            </Col> */}

                          <Col md={6} className="order-item-details-box">
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
                                        <strong>Item Price : RS. </strong>
                                        {item.price}
                                        </div>
                                        <div className="item-quantity-price">
                                        <strong>Total Price : </strong>
                                          {/* {`${item.qty} x RS. ${item.price} = RS. ${item.qty * item.price}`} */}
                                          {`RS. ${calculateTotalPrice(item.qty, item.duration.amount, item.duration.unit, item.price)}`}
                                        </div>
                                        {/* <h4>Slot Booked</h4> */}
                                        <div className="item-duration">
                            <strong>Start Date & Time : </strong>
                            {new Date(item.slotBooking.startDateTime).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </div>
                          <p>
                            <strong>End Date & Time : </strong>
                            {new Date(item.slotBooking.endDateTime).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </p>
                                      </Col>
                          </Row>
                          
                        </ListGroup.Item>
                        
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Shipping Details</h2>
                  <p>
                    <strong>Name: </strong>
                    {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address : </strong>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                  {/* {order.orderItems.map((item, index) => (
  <ListGroup.Item key={index}>
    <h2>Slot Booked</h2>
    {item.slotBooking && item.slotBooking.startDateTime && item.slotBooking.endDateTime && (
      <>
        <p>
          <strong>Start Date & Time : </strong>
          {new Date(item.slotBooking.startDateTime).toLocaleString('en-GB', {
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
          {new Date(item.slotBooking.endDateTime).toLocaleString('en-GB', {
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
                    {order.paymentMethod==="Cash On Delivery" ? (
                    <div className="progress-container">
                    <div className="progress-bar"></div>
                    <div className="progress-step">
                      <div className={`circle ${getStatusClass(order.isDelivered)}`} />
                      <span className="step-label">Delivered</span>
                      {order.isDelivered ? (
                      <span className="step-label">{new Date(order.deliveredAt).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            })}</span>
                          ) : (
                            <span className="step-label">N/A</span>
                          )}
                    </div>
                    <div className="progress-step">
                      <div className={`circle ${getStatusClass(order.isPaid)}`} />
                      <span className="step-label">Paid</span>
                      {order.isPaid ? (
                      <span className="step-label">{new Date(order.paidAt).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            })}</span>
                          ) : (
                            <span className="step-label">N/A</span>
                          )}
                    </div>
                    <div className="progress-step">
                      <div className={`circle ${getStatusClass(order.isReturnRequested)}`} />
                      <span className="step-label">Return Requested</span>
                      {order.isReturnRequested ? (
                      <span className="step-label">{new Date(order.returnRequestedAt).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            })}</span>
                          ) : (
                            <span className="step-label">N/A</span>
                          )}
                    </div>
                    <div className="progress-step">
                      <div className={`circle ${getStatusClass(order.isReturned)}`} />
                      <span className="step-label">Returned</span>
                      {order.isReturned ? (
                      <span className="step-label">{new Date(order.returnedAt).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            })}</span>
                          ) : (
                            <span className="step-label">N/A</span>
                          )}
                    </div>
                  </div>
                    ) : (
                    <div className="progress-container">
                    <div className="progress-bar"></div>
                    <div className="progress-step">
                      <div className={`circle ${getStatusClass(order.isPaid)}`} />
                      <span className="step-label">Paid</span>
                      {order.isPaid ? (
                      <span className="step-label">{new Date(order.paidAt).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            })}</span>
                          ) : (
                            <span className="step-label">N/A</span>
                          )}
                    </div>
                    <div className="progress-step">
                      <div className={`circle ${getStatusClass(order.isDelivered)}`} />
                      <span className="step-label">Delivered</span>
                      {order.isDelivered ? (
                      <span className="step-label">{new Date(order.deliveredAt).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            })}</span>
                          ) : (
                            <span className="step-label">N/A</span>
                          )}
                    </div>
                    <div className="progress-step">
                      <div className={`circle ${getStatusClass(order.isReturnRequested)}`} />
                      <span className="step-label">Return Requested</span>
                      {order.isReturnRequested ? (
                      <span className="step-label">{new Date(order.returnRequestedAt).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            })}</span>
                          ) : (
                            <span className="step-label">N/A</span>
                          )}
                    </div>
                    <div className="progress-step">
                      <div className={`circle ${getStatusClass(order.isReturned)}`} />
                      <span className="step-label">Returned</span>
                      {order.isReturned ? (
                      <span className="step-label">{new Date(order.returnedAt).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            })}</span>
                          ) : (
                            <span className="step-label">N/A</span>
                          )}
                    </div>
                  </div>)
                }
{/* 
                  <TrackingBar steps={steps} />      */}
                  {/* {order.isDelivered ? (
                    <Message variant="success">
                      Delivered on : {new Date(order.deliveredAt).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            })}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Delivered</Message>
                  )}
                  {order.isReturned ? (
                    <Message variant="success">
                      Returned on : {new Date(order.returnedAt).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            })}
                    </Message>
                  ) : order.isReturnRequested ? (
                    <Message variant="warning">
                      Return Requested on : {new Date(order.returnRequestedAt).toLocaleString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            })}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Returned</Message>
                  )} */}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method : </strong>
                    {order.paymentMethod}
                    
                  </p>
                  {/* {order.isPaid ? (
                    <Message variant="success">Paid on : {new Date(order.paidAt).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}</Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )} */}
                </ListGroup.Item>

              </ListGroup>
            </Col>

            <Col md={4}>
              <Card>
                <ListGroup variant="flush" className="font">
                  <ListGroup.Item >
                    <h2>Order Summary</h2>
                  </ListGroup.Item>

                  {/* <ListGroup.Item >
                    <Row>
                      <Col>Total Price</Col>
                      <Col>{`RS. ${
                        order.totalPrice -
                        (order.taxPrice + order.shippingPrice).toFixed(2)
                      }`}</Col>
                    </Row>
                  </ListGroup.Item> */}
                   <ListGroup.Item >
                    <Row>
                      <Col>Items</Col>
                      <Col>{order.orderItems.reduce((acc, item) => acc + item.qty, 0)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total Price</Col>
                      <Col>{`RS. ${totalOrderPrice}`}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>{`RS. ${order.shippingPrice}`}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>{`RS. ${order.taxPrice}`}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>{`RS. ${order.totalPrice}`}</Col>
                    </Row>
                  </ListGroup.Item>
                  {/* {!order.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <Loader />}
                      {!sdkReady ? (
                        <Loader />
                      ) : (
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={onSuccessPaymentHandler}
                        />
                      )}
                    </ListGroup.Item>
                  )} */}
                  {!order.isPaid && !order.isDelivered && (
                    <ListGroup.Item>
                      
                      {loadingPay && <Loader />}
                      {order.paymentMethod === "PayPal" && sdkReady ? (
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={onSuccessPaymentHandler}
                        />
                      ) : (
                        <Button
                          type="button"
                          className="btn btn-block"
                          onClick={deliverHandler}>
                          {" "}
                          Mark as delivered{" "}
                        </Button>
                      )}
                    </ListGroup.Item>
                  )}
                  {!order.isReturned && !order.isReturnRequested && (
                  <ListGroup.Item>
                  {loadingDeliver && <Loader />}
                  {order.paymentMethod==="Cash On Delivery" && userInfo && order.isDelivered && !order.isPaid ? (
                    <Button
                    type="button"
                    className="btn btn-block"
                    onClick={onSuccessPaymentHandler}>
                    {" "}
                    Mark as Paid{" "}
                  </Button>
                  ) : 
                  userInfo &&
                    order.isPaid &&
                    !order.isDelivered ? (
                        <Button
                          type="button"
                          className="btn btn-block"
                          onClick={deliverHandler}>
                          {" "}
                          Mark as delivered{" "}
                        </Button>
                    ) : null}
                  </ListGroup.Item>
                )}
                  
                  {userInfo && order.isPaid && order.isDelivered && !order.isReturned && (
                  <ListGroup.Item>
                    
                    {loadingReturn }
                    {userInfo.isAdmin && order.isReturnRequested ? (
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={returnHandler}
                      >
                        Mark as Returned
                      </Button>
                    ) : !order.isReturnRequested ? (
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={returnRequestHandler}
                      >
                        Submit Return Request
                      </Button>
                    ) : null}
                  </ListGroup.Item>
                  )}
                  {/* {userInfo && userInfo.isAdmin &&
                    order.isPaid &&
                    order.isDelivered &&
                    !order.isReturned && (
                      <ListGroup.Item>
                        <Button
                          type="button"
                          className="btn btn-block"
                          onClick={returnHandler}>
                          {" "}
                          Mark as Returned{" "}
                        </Button>
                      </ListGroup.Item>
                    )} */}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default OrderScreen;
