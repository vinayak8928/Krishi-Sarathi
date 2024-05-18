// import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, Link, useNavigate } from "react-router-dom";
// import Message from "./../../components/Message/Message";
// import { addToCart, removeFromCart } from "./../../actions/cartActions";
// import {
//   Row,
//   Col,
//   ListGroup,
//   Image,
//   Button,
//   Form,
//   Container,
//   Card,
// } from "react-bootstrap";
// import Meta from "../../components/Helmet/Meta";

// let val;
// const Cart = ({ match, location }) => {
//   const history = useHistory();

//   const productId = match.params.id;
//   const params = new URLSearchParams(location.search);
//   const qty = params.get("qty") ? Number(params.get("qty")) : 1;

//   // const durationString = params.get("duration"); //3 weeks
//   // const durationValue = durationString ? parseInt(durationString) : 1; // Extract durationValue from durationString  3
//   // const duration = durationString ? durationString.split(" ")[1] : "hours"; // Extract duration from durationString  weeks
//   // console.log(duration);
//   const dispatch = useDispatch();

//   const cartSeed = useSelector((state) => state.cartSeed);
//   const { cartItems } = cartSeed;
//   const userLogin = useSelector(state => state.userLogin)
//   const { userInfo } = userLogin

//   const [durationOptions, setDurationOptions] = useState({});
//   const [durationInput, setDurationInput] = useState({});
//   const [radioError, setRadioError] = useState(false);
//   const [inputError, setInputError] = useState(false);
//   const [error, setError] = useState("");
//   const [subtotal, setSubtotal] = useState(0); // Changed to state variable

//   useEffect(() => {
//     if (productId) {
//       dispatch(addToCart(productId, qty));
//     }
//   }, [dispatch, productId, qty]);

//   useEffect(() => {
//     calculateSubtotal();
//   }, [cartItems, durationOptions, durationInput]);
//   // Recalculate subtotal when these dependencies change

//   // useEffect(() => {
//   //   const subtotall = calculateSubtotal(
//   //     cartItems,
//   //     durationOptions,
//   //     durationInput
//   //   );
//   //   dispatch(updateSubtotal(subtotal)); // Dispatch the action to update the subtotal
//   // }, [cartItems, durationOptions, durationInput, dispatch]);

//   const removeFromCartHandler = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   const checkoutHandler = () => {
//     const selectedItems = Object.keys(durationOptions);
//     const isValid = selectedItems.length === cartItems.length;

//     if (!isValid) {
//       setError("Please select one of the duration options for all items.");
//       return;
//     }

//     const durations = Object.values(durationInput);
//     const isValidDuration = durations.every((duration) => duration);

//     if (!isValidDuration) {
//       setError("Please enter the number of days/hours/weeks for all items.");
//       return;
//     }

//     // Proceed to checkout logic...
//     // history.push("/login?redirect=shipping");
//     history.push({
//       pathname: "/shipping",
//       state: { amt: val },
//     });
//   };

//   const handleDurationChange = (itemSeed, duration) => {
//     setDurationOptions({ ...durationOptions, [itemSeed]: duration });
//   };

//   const handleDurationInputChange = (itemSeed, value) => {
//     setDurationInput({ ...durationInput, [itemSeed]: value });
//   };

//   const handleProceedToCheckout = () => {
//     let radioSelected = false;
//     let inputFilled = true;

//     for (const itemSeed in durationOptions) {
//       if (durationOptions[itemSeed]) {
//         radioSelected = true;
//       } else {
//         radioSelected = false;
//         break;
//       }
//     }

//     for (const itemSeed in durationInput) {
//       if (!durationInput[itemSeed]) {
//         inputFilled = false;
//         break;
//       }
//     }

//     if (!radioSelected) {
//       setRadioError(true);
//     } else if (!inputFilled) {
//       setInputError(true);
//     } else {
//       history.push("/login?redirect=shipping");
//     }
//   };

//   // Function to calculate the subtotal based on selected duration
//   const calculateSubtotal = () => {
//     let subtotalValue = cartItems.reduce((acc, item) => {
//       const duration = durationOptions[item.seed] || "hours";
//       const durationValue = durationInput[item.seed] || 1;
//       let subtotal = item.price;
//       // Check the duration selected for each item and adjust the price accordingly
//       if (duration === "hours") {
//         subtotal *= item.qty * durationValue; // Multiply by the number of hours
//       } else if (duration === "days") {
//         subtotal *= item.qty * 10 * durationValue; // Multiply by 10X the number of days
//       } else if (duration === "weeks") {
//         subtotal *= item.qty * 60 * durationValue; // Multiply by 60X for weeks
//       }
//       return acc + subtotal;
//     }, 0);
//     console.log("subtotalValue:", subtotalValue);
//     val = subtotalValue.toFixed(2);

//     setSubtotal(subtotalValue.toFixed(2)); // Update subtotal state
//   };

//   return (
//     <Container style={{ marginTop: "100px", marginBottom: "50px" }}>
//       <Meta title="Krishi Sarathi | Cart" />

//       <Row>
//         <Col md={8}>
//           <h1>Shopping Cart</h1>
//           {cartItems.length === 0 ? (
//             <Message variant="danger">
//               Your cart is empty <Link to="/">GO BACK</Link>
//             </Message>
//           ) : (
//             <ListGroup variant="flush">
//               {cartItems.map((item) => (
//                 <ListGroup.Item key={item.seed} style={{ marginTop: "10px" }}>
//                   <Row>
//                     <Col md={2}>
//                       <Image src={item.image} alt={item.name} fluid rounded />
//                     </Col>
//                     <Col md={3}>
//                       <Link to={`/farmers/purchaseSeeds/${item.seed}`}>
//                         {item.name}
//                       </Link>
//                     </Col>
//                     <Col md={2}>RS.{item.price}</Col>

//                     <Col md={2}>
//                       <Form.Control
//                         as="select"
//                         value={item.qty}
//                         onChange={(e) =>
//                           dispatch(addToCart(item.seed, Number(e.target.value)))
//                         }>
//                         {[...Array(item.countInStock).keys()].map((x) => (
//                           <option key={x + 1} value={x + 1}>
//                             {x + 1}
//                           </option>
//                         ))}
//                       </Form.Control>
//                     </Col>

//                     <Col md={3}>
//                       <Form.Group>
//                         <Form.Label>
//                           <span style={{ color: "red" }}>*</span>Duration
//                           Options:
//                         </Form.Label>
//                         <Form.Check
//                           inline
//                           label="Hours"
//                           type="radio"
//                           id={`hours_${item.seed}`}
//                           checked={durationOptions[item.seed] === "hours"}
//                           onChange={() =>
//                             handleDurationChange(item.seed, "hours")
//                           }
//                         />
//                         <Form.Check
//                           inline
//                           label="Days"
//                           type="radio"
//                           id={`days_${item.seed}`}
//                           checked={durationOptions[item.seed] === "days"}
//                           onChange={() =>
//                             handleDurationChange(item.seed, "days")
//                           }
//                         />
//                         <Form.Check
//                           inline
//                           label="Weeks"
//                           type="radio"
//                           id={`weeks_${item.seed}`}
//                           checked={durationOptions[item.seed] === "weeks"}
//                           onChange={() =>
//                             handleDurationChange(item.seed, "weeks")
//                           }
//                         />
//                       </Form.Group>
//                       <Form.Group>
//                         <Form.Label>
//                           <span style={{ color: "red" }}>*</span>Enter the
//                           number of {durationOptions[item.seed]}
//                         </Form.Label>
//                         <Form.Control
//                           type="number"
//                           value={durationInput[item.seed] || "1"}
//                           onChange={(e) =>
//                             handleDurationInputChange(item.seed, e.target.value)
//                           }
//                         />
//                       </Form.Group>
//                     </Col>

//                     <Col md={1}>
//                       <Button
//                         type="button"
//                         variant="light"
//                         onClick={() => removeFromCartHandler(item.seed)}>
//                         <i className="fas fa-trash"></i>
//                       </Button>
//                     </Col>
//                   </Row>

//                   {/* <Row>
//                     <Col md={12}>
//                       <h6>
//                         Subtotal: RS.
//                         {calculateSubtotal(item)}
//                       </h6>
//                     </Col>
//                   </Row> */}
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>
//           )}
//         </Col>

//         <Col md={4}>
//           <Card style={{ marginTop: "50px" }}>
//             <ListGroup variant="flush">
//               {/* <ListGroup.Item>
//                 <h2>
//                   Subtotal (
//                   {cartItems.reduce(
//                     (acc, item) => acc + parseFloat(item.qty),
//                     0
//                   )}
//                   ) items
//                 </h2>
//                 RS.
//                 {cartItems
//                   .reduce(
//                     (acc, item) =>
//                       acc + parseFloat(calculateSubtotal(item) / 2),
//                     0
//                   )
//                   .toFixed(2)}
//               </ListGroup.Item> */}

//               <ListGroup.Item>
//                 <h2>
//                   Subtotal (
//                   {cartItems.reduce(
//                     (acc, item) => acc + parseFloat(item.qty),
//                     0
//                   )}
//                   ) items
//                 </h2>
//                 RS.
//                 {subtotal} {/* Use the subtotal prop directly */}
//               </ListGroup.Item>

//               <ListGroup.Item>
//                 <Button
//                   type="button"
//                   className="btn-block"
//                   disabled={cartItems.length === 0}
//                   onClick={checkoutHandler}>
//                   Proceed To Checkout
//                 </Button>

//                 {error && <Message variant="danger">{error}</Message>}
//               </ListGroup.Item>
//             </ListGroup>
//           </Card>
//         </Col>
//       </Row>
//       {/* {console.log("Subtotal in Cart.jsx:", subtotal)} */}
//       {/* <ShippingScreen
//         history={history}
//         name="hi"
//       /> */}
//     </Container>
//   );
// };

// export default Cart;

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Message from "./../../components/Message/Message";
import { addToCart, removeFromCart } from "./../../actions/cartActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Form,
  Container,
  Card,
} from "react-bootstrap";
import "./Cart.css";
import Meta from "../../components/Helmet/Meta";

let val;
const Cart = ({ match, location }) => {
  const history = useHistory();

  const productId = match.params.id;
  const params = new URLSearchParams(location.search);
  const qty = params.get("qty") ? Number(params.get("qty")) : 1;

  // const durationString = params.get("duration"); //3 weeks
  // const durationValue = durationString ? parseInt(durationString) : 1; // Extract durationValue from durationString  3
  // const duration = durationString ? durationString.split(" ")[1] : "hours"; // Extract duration from durationString  weeks
  // console.log(duration);
  const dispatch = useDispatch();

  const cartSeed = useSelector((state) => state.cartSeed);
  const { cartItems } = cartSeed;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [durationOptions, setDurationOptions] = useState({});
  const [durationInput, setDurationInput] = useState({});
  const [radioError, setRadioError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    const selectedItems = Object.keys(durationOptions);
    const isValid = selectedItems.length === cartItems.length;

    if (!isValid) {
      setError("Please select one of the duration options for all items.");
      return;
    }

    const durations = Object.values(durationInput);
    const isValidDuration = durations.every((duration) => duration);

    if (!isValidDuration) {
      setError("Please enter the number of days/hours/weeks for all items.");
      return;
    }

    // const selectedDurations = {};
    // for (const itemSeed in durationOptions) {
    //   selectedDurations[itemSeed] = durationOptions[itemSeed];
    // }

    // Extract user-entered durations
    const enteredDurations = {};
    for (const itemSeed in durationOptions) {
      enteredDurations[itemSeed] = durationInput[itemSeed] || "1";
      const duration=enteredDurations[itemSeed];
    }

    cartItems.forEach((item) => {
      console.log("Duration:",enteredDurations[item.seed])
      console.log("durationInput:",durationInput[item.seed])
      console.log("durationOptions:",durationOptions[item.seed])
      dispatch(addToCart(item.seed, item.qty, {
        amount: durationInput[item.seed] || 1,
        unit: durationOptions[item.seed] || "hours",
        })
      );
    });


    history.push({
      pathname: "/shipping",
      state: {
        //data:variable
        amt: val,
        selectedDurations: durationOptions, // Duration options selected through radio buttons
        enteredDurations: enteredDurations, // Number of days/hours/weeks entered by the user
      },
    });
  };

  const handleDurationChange = (itemSeed, duration) => {
    setDurationOptions({ ...durationOptions, [itemSeed]: duration });
  };

  const handleDurationInputChange = (itemSeed, value) => {
    setDurationInput({ ...durationInput, [itemSeed]: value });
  };
  // const handleDurationInputChange = (itemSeed, value) => {
  //   setDurationInput((prevInput) => ({
  //     ...prevInput,
  //     [itemSeed]: value,
  //   }));
  // };
  

  const handleProceedToCheckout = () => {
    let radioSelected = false;
    let inputFilled = true;

    for (const itemSeed in durationOptions) {
      if (durationOptions[itemSeed]) {
        radioSelected = true;
      } else {
        radioSelected = false;
        break;
      }
    }

    for (const itemSeed in durationInput) {
      if (!durationInput[itemSeed]) {
        inputFilled = false;
        break;
      }
    }

    if (!radioSelected) {
      setRadioError(true);
    } else if (!inputFilled) {
      setInputError(true);
    } else {
      history.push("/login?redirect=shipping");
    }
  };

  // Function to calculate the subtotal based on selected duration
  const calculateSubtotal = () => {
    let subtotalValue = cartItems.reduce((acc, item) => {
      const duration = durationOptions[item.seed] || "hours";
      const durationValue = durationInput[item.seed] || 1;
      let subtotal = item.price;
      // Check the duration selected for each item and adjust the price accordingly
      if (duration === "hours") {
        subtotal *= item.qty * durationValue; // Multiply by the number of hours
      } else if (duration === "days") {
        subtotal *= item.qty * 10 * durationValue; // Multiply by 10X the number of days
      } else if (duration === "weeks") {
        subtotal *= item.qty * 60 * durationValue; // Multiply by 60X for weeks
      }
      return acc + subtotal;
    }, 0);
    val = subtotalValue.toFixed(2);
    return subtotalValue.toFixed(2);
  };

  return (
    <Container style={{ marginTop: "100px", marginBottom: "50px" }} className="custom-container">
      <Meta title="Krishi Sarathi | Cart" />
      <Row>
        <Col md={8}>
          {/* //           <Row>
//             <h1>Shopping Cart</h1>
//           </Row>
//           {!userInfo && (
//             <Row>
//               <div className="note-text">
//                 <h6>NOTE:</h6>
//                 <p>
//                   Hey, Guest User! Please log in to proceed after adding items
//                   to your cart.
//                 </p>
//               </div>
//             </Row>
//           )} */}

          <Row>
            <h1>Shopping Cart</h1>
          </Row>
          {userInfo ? (
  <Row>
    <div className="note-text">
    <h6>IMPORTANT:</h6>
      <p>Hey, User! Please be aware that your cart will be emptied upon logout.</p>
    </div>
  </Row>
) : (
  <Row>
    <div className="note-text">
      <h6>NOTE:</h6>
      <p>
        Hey, Guest User! Please log in to proceed after adding items
        to your cart.
      </p>
    </div>
  </Row>
)}

          {cartItems.length === 0 ? (
            <Message variant="danger">
              Your cart is empty <Link to="/farmers/lendMachines">GO BACK</Link>
            </Message>
          ) : (
            
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.seed} style={{ marginTop: "10px" }}>
                  <Row>
                    <Col md={3}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/farmers/lendMachines/${item.seed}`}>
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>RS.{item.price}</Col>

                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(addToCart(item.seed, Number(e.target.value)))
                        }>
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col md={2}>
                      <Form.Group>
                        <Form.Label>
                          <span style={{ color: "red" }}>*</span>Duration
                          Options:
                        </Form.Label>
                        <Form.Check
                          inline
                          label="Hours"
                          type="radio"
                          id={`hours_${item.seed}`}
                          checked={durationOptions[item.seed] === "hours"}
                          onChange={() =>
                            handleDurationChange(item.seed, "hours")
                          }
                        />
                        <Form.Check
                          inline
                          label="Days"
                          type="radio"
                          id={`days_${item.seed}`}
                          checked={durationOptions[item.seed] === "days"}
                          onChange={() =>
                            handleDurationChange(item.seed, "days")
                          }
                        />
                        <Form.Check
                          inline
                          label="Weeks"
                          type="radio"
                          id={`weeks_${item.seed}`}
                          checked={durationOptions[item.seed] === "weeks"}
                          onChange={() =>
                            handleDurationChange(item.seed, "weeks")
                          }
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>
                          <span style={{ color: "red" }}>*</span>Enter the
                          number of {durationOptions[item.seed]}
                        </Form.Label>
                        <Form.Control
                          type="number"
                          value={durationInput[item.seed] || "1"}
                          onChange={(e) =>
                            handleDurationInputChange(item.seed, e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>

                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.seed)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </Col>
                  </Row>

                  {/* <Row>
                    <Col md={12}>
                      <h6>
                        Subtotal: RS.
                        {calculateSubtotal(item)}
                      </h6>
                    </Col>
                  </Row> */}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <Card style={{ marginTop: "50px" }}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal (
                  {cartItems.reduce(
                    (acc, item) => acc + parseFloat(item.qty),
                    0
                  )}
                  ) items
                </h2>
                RS.
                {cartItems
                  .reduce(
                    (acc, item) =>
                      acc + parseFloat(calculateSubtotal(item) / 2),
                    0
                  )
                  .toFixed(2)}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}>
                  Proceed To Checkout
                </Button>

                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
