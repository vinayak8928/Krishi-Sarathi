// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   Col,
//   Container,
//   Row,
//   Image,
//   ListGroup,
//   Card,
//   Button,
//   Form,
// } from "react-bootstrap";
// import "./LendMachineScreen.css";

// import { listLendMachineProductsDetails } from "./../../actions/productLendMachinesActions";
// import Loader from "../../components/Loader/Loader";
// import Message from "../../components/Message/Message";
// import Meta from "../../components/Helmet/Meta";

// const LendMachineProduct = ({ history, match }) => {
//   const [qty, setQty] = useState(1);

//   const dispatch = useDispatch();

//   const productLendMachinesDetails = useSelector(
//     (state) => state.productLendMachinesDetails
//   );
//   const { loading, error, productLendMachines } = productLendMachinesDetails;

//   useEffect(() => {
//     dispatch(listLendMachineProductsDetails(match.params.id));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [dispatch, match]);

//   const addtoCartHandler = () => {
//     history.push(`/cart/${match.params.id}?qty=${qty}`);
//   };
//   return (
//     <div className="productScreen">
//       <Meta title="Threshers" />
//       <Container>
//         <Link className="btn btn-go-back btn-dark" to="/farmers/lendMachines">
//           GO BACK
//         </Link>
//         {loading ? (
//           <Loader />
//         ) : error ? (
//           <Message variant="danger">{error}</Message>
//         ) : (
//           <Row className="p-3 seed-product">
//             <Col md={6}>
//               <Image
//                 className="mx-auto image-machine"
//                 src={productLendMachines.image}
//                 alt={productLendMachines.name}
//                 width={200}
//               />
//             </Col>
//             <Col md={3}>
//               <ListGroup className="borderless" variant="flush">
//                 <ListGroup.Item>
//                   <h2>
//                   {productLendMachines.name}
//                     </h2>
//                 </ListGroup.Item>

//                 <ListGroup.Item>
//                   <h4>Price: {productLendMachines.price}</h4>
//                   <p>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
//               reprehenderit ducimus neque natus quos laboriosam deserunt
//               accusantium, incidunt laudantium quam, ipsum sunt voluptates aut
//               fuga corporis! Optio dolore assumenda nulla!
//             </p>
//                 </ListGroup.Item>

//                 <ListGroup.Item>
//                   <p>
//                     <span style={{ fontWeight: "bold"}}>Description:</span>
//                     <br /> {productLendMachines.description}
//                   </p>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <p>Quantity Available: {productLendMachines.quantity}</p>
//                 </ListGroup.Item>
//               </ListGroup>
//             </Col>
//             <Col md={3}>
//               <Card>
//                 <ListGroup variant="flush">
//                   <ListGroup.Item>
//                     <Row>
//                       <Col>Machine Power:</Col>
//                       <Col>
//                         <strong>{productLendMachines.machine_power}</strong>
//                       </Col>
//                     </Row>
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <Row>
//                       <Col>Target Plant:</Col>
//                       <Col>{productLendMachines.target_plant}</Col>
//                     </Row>
//                   </ListGroup.Item>
//                   {productLendMachines.quantity > 0 && (
//                     <ListGroup.Item>
//                       <Row>
//                         <Col>Qty</Col>
//                         <Col>
//                           <Form.Control
//                             as="select"
//                             value={qty}
//                             onChange={(e) => setQty(e.target.value)}>
//                             {[
//                               ...Array(productLendMachines.quantity).keys(),
//                             ].map((x) => (
//                               <option key={x + 1} value={x + 1}>
//                                 {x + 1}
//                               </option>
//                             ))}
//                           </Form.Control>
//                         </Col>
//                       </Row>
//                     </ListGroup.Item>
//                   )}
//                   <ListGroup.Item>
//                     <Button
//                       type="button"
//                       className="btn btn-block"
//                       onClick={addtoCartHandler}>
//                       Add To Cart
//                     </Button>
//                   </ListGroup.Item>
//                 </ListGroup>
//               </Card>
//             </Col>
//           </Row>
//         )}
//       </Container>
//     </div>
//   );
// };

// export default LendMachineProduct;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import "./LendMachineScreen.css";

import { listLendMachineProductsDetails } from "./../../actions/productLendMachinesActions";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import Meta from "../../components/Helmet/Meta";

const LendMachineProduct = ({ history, match }) => {

  const [qty, setQty] = useState(1);
  const [duration, setDuration] = useState("hours");
  const [durationValue, setDurationValue] = useState(""); // State to hold the input value for duration
  const dispatch = useDispatch();

  const productLendMachinesDetails = useSelector(
    (state) => state.productLendMachinesDetails
  );
  const { loading, error, productLendMachines } = productLendMachinesDetails;

  useEffect(() => {
    dispatch(listLendMachineProductsDetails(match.params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, match]);

  const addtoCartHandler = () => {
    // Construct the duration string based on selected radio button and input value
    const durationString = `${durationValue} ${duration}`;

    // Append the duration to the URL as a query parameter
    history.push(`/cart/${match.params.id}?duration=${durationString}&qty=${qty}`);
  };


  return (
    <div className="productScreen">
      <Meta title="Threshers" />
      <Container>
        <Link className="btn btn-go-back btn-dark" to="/farmers/lendMachines">
          GO BACK
        </Link>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row className="p-3 seed-product">
            <Col md={6}>
              <Image
                className="mx-auto image-machine"
                src={productLendMachines.image}
                alt={productLendMachines.name}
                width={200}
              />
            </Col>
            <Col md={3}>
              <ListGroup className="borderless" variant="flush">
                <ListGroup.Item>
                  <h2>{productLendMachines.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Price: RS {productLendMachines.price}/hour</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Description:</span>
                    <br /> {productLendMachines.description}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Seller Name:</span>
                    <br /> {productLendMachines.seller}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>Quantity Available: {productLendMachines.quantity}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Machine Power:</Col>
                      <Col>
                        <strong>{productLendMachines.machine_power}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Target Plant:</Col>
                      <Col>{productLendMachines.target_plant}</Col>
                    </Row>
                  </ListGroup.Item>
                  {productLendMachines.quantity > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}>
                            {[
                              ...Array(productLendMachines.quantity).keys(),
                            ].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  {/* <ListGroup.Item>
                    <Row>
                      <Col>Duration:</Col>
                      <Col>
                        <Form.Check
                          type="radio"
                          name="duration"
                          value="hours"
                          checked={duration === "hours"}
                          onChange={() => setDuration("hours")}
                          label="Hours"
                        />
                        <Form.Check
                          type="radio"
                          name="duration"
                          value="days"
                          checked={duration === "days"}
                          onChange={() => setDuration("days")}
                          label="Days"
                        />
                        <Form.Check
                          type="radio"
                          name="duration"
                          value="weeks"
                          checked={duration === "weeks"}
                          onChange={() => setDuration("weeks")}
                          label="Weeks"
                        />
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Enter Duration:</Col>
                      <Col>
                        <Form.Control
                        type="text"
                        placeholder="Enter"
                        value={durationValue}
                        onChange={(e) => setDurationValue(e.target.value)}
                      />
                      </Col>
                    </Row>
                  </ListGroup.Item> */}

                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={addtoCartHandler}>
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default LendMachineProduct;


                                
