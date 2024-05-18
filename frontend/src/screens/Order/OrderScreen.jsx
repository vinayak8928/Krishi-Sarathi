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
  deliverOrder,
  returnOrder,
} from "./../../actions/orderAction";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  ORDER_RETURN_RESET,
} from "./../../constants/orderConstant";
import Meta from "../../components/Helmet/Meta";
import { useLocation } from "react-router-dom";


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
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order, successDeliver, successReturn, history, userInfo]);

  const onSuccessPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const returnHandler = () => {
    dispatch(returnOrder(order));
  };
  // const itemsPrice = order.totalPrice - (order.taxPrice + order.shippingPrice)

  return (
    <div>
      <Meta title="Krishi Sarathi | Order" />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container style={{ marginTop: "120px" }}>
          <h2>Order Id : {order._id}</h2>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush" className="mb-3">
                <ListGroup.Item>
                  <h1>Shipping Details</h1>
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
                  
                  {order.isDelivered ? (
                    <Message variant="success">
                      Delivered on {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Delivered</Message>
                  )}
                  {order.isReturned ? (
                    <Message variant="success">
                      Returned on {order.returnedAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Returned</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method : </strong>
                    {order.paymentMethod}
                    
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Order Items</h2>
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
                            
                            <Col md={3}><Link to={`/farmers/lendMachines/${item.seed}`}>
                                    {item.name}
                                  </Link>
                            </Col>
                            <Col md={2}>{item.duration.amount} {item.duration.unit}</Col>
                            <Col md={2}>
                              {`${item.qty} x RS. ${item.price} = RS. ${
                                item.qty * item.price
                              }`}
                            </Col>
                          </Row>
                          <h4>Slot Booked</h4>
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
                      <Col>Total Price</Col>
                      <Col>{`RS. ${
                        order.totalPrice -
                        (order.taxPrice + order.shippingPrice).toFixed(2)
                      }`}</Col>
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
                  {!order.isPaid && (
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
                  )}
                  {loadingDeliver && <Loader />}
                  {userInfo &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <ListGroup.Item>
                        <Button
                          type="button"
                          className="btn btn-block"
                          onClick={deliverHandler}>
                          {" "}
                          Mark as delivered{" "}
                        </Button>
                      </ListGroup.Item>
                    )}
                  {loadingReturn && <Loader />}
                  {userInfo && userInfo.isAdmin &&
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
                    )}
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
