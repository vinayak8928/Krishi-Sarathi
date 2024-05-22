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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
  Modal,
} from "react-bootstrap";
import "./LendMachineScreen.css";

import {
  listLendMachineProductsDetails,
  updateLendMachine,
  createProductReview,
} from "./../../actions/productLendMachinesActions";
import { listUsers } from "./../../actions/userActions";  // Import the action to list users
import { MACHINE_UPDATE_RESET } from "../../constants/productConstants";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/productConstants";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import Meta from "../../components/Helmet/Meta";
import Rating from "../../components/Rating/Rating";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';

const LendMachineProduct = ({ history, match }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [seller, setSeller] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [machine_power, setMachine_power] = useState("");
  const [uploading, setUploading] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);  // State for modal visibility

  const productId = match.params.id;
  const categoryMapping = {
    1: "threshers",
    2: "Tractors",
    3: "Harrows",
    4: "Harvesters",
    5: "Harvesters",
    6: "Mowers",
    7: "Balers",
    8: "Ploughs",
    9: "Seeders",
    10: "Irrigation",
    11: "Sprayers",
    12: "Others",
  };

  const ReviewSlider = ({ reviews }) => {
    if (reviews.length === 0) {
      return (
        <div className="text-center mt-3">
          {/* <Message>No Reviews</Message> */}
          <p className="mt-3" style={{ marginLeft: "-100px" }}>
            Be the first to review this product !
          </p>
          <img className="review-image" src="/images/review.svg" alt="Avatar" />
        </div>
      );
    }

    if (reviews.length === 1) {
      const review = reviews[0];
      return (
        <ListGroup.Item>
          <Card className="text-center">
            <div className="avatar">
              <img src="/images/profile1.svg" alt="Avatar" />
            </div>
            <strong style={{ marginBottom: "2px", display: "block" }}>
              {review.name}
            </strong>
            <p style={{ marginBottom: "2px" }}>
              Date: {review.createdAt.substring(0, 10)}
            </p>
            <p style={{ marginBottom: "-5px" }}>Comment : {review.comment}</p>
            <Rating value={review.rating} />
          </Card>
        </ListGroup.Item>
      );
    }

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <Slider {...settings}>
        {reviews.map((review) => (
          <div key={review._id}>
            <ListGroup.Item>
              <Card className="text-center">
                <div className="avatar">
                  <img src="/images/profile1.svg" alt="Avatar" />
                </div>
                <strong style={{ marginBottom: "2px", display: "block" }}>
                  {review.name}
                </strong>
                <p style={{ marginBottom: "2px" }}>
                  Date: {review.createdAt.substring(0, 10)}
                </p>
                <p style={{ marginBottom: "-5px" }}>
                  {review.comment}
                </p>
                <Rating value={review.rating} />
              </Card>
            </ListGroup.Item>
          </div>
        ))}
      </Slider>
    );
  };

  const [qty, setQty] = useState(1);
  const [duration, setDuration] = useState("hours");
  const [durationValue, setDurationValue] = useState(""); // State to hold the input value for duration
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  const productLendMachinesDetails = useSelector(
    (state) => state.productLendMachinesDetails
  );
  const { loading, error, productLendMachines } = productLendMachinesDetails;
  // console.log("Product seller:", productLendMachinesDetails);

  const userList = useSelector((state) => state.userList);
  const { users } = userList;  // Get users list from Redux state
 
  useEffect(() => {
    dispatch(listLendMachineProductsDetails(match.params.id));
    dispatch(listUsers());  // Fetch users list
  }, [dispatch, match]);


  useEffect(() => {
    dispatch(listLendMachineProductsDetails(match.params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, match]);

  const addtoCartHandler = () => {
    // Construct the duration string based on selected radio button and input value
    const durationString = `${durationValue} ${duration}`;

    // Append the duration to the URL as a query parameter
    history.push(
      `/cart/${match.params.id}?duration=${durationString}&qty=${qty}`
    );
  };

  const EditHandler = () => {
    if (userInfo && userInfo._id === productLendMachines.user) {
      // Run your update code here
      history.push(`/admin/productlist/machine/${match.params.id}/edit`);
      // dispatch(updateLendMachine({
      //   _id: productId,
      //   name,
      //   image,
      //   price,
      //   seller,
      //   description,
      //   category,
      //   quantity,
      //   machine_power
      // }));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    if (
      !productLendMachines._id ||
      productLendMachines._id !== match.params.id
    ) {
      dispatch(listLendMachineProductsDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, match, successProductReview]);

  const isSeller = () => {
    return userInfo && userInfo.name === productLendMachines.seller;
  };
  
   // Find the seller's email, seller's mobile number
   const sellerEmail = users?.find(userInfo => userInfo.name === productLendMachines.seller)?.email;
   const sellerNumber= users?.find(userInfo => userInfo.name === productLendMachines.seller)?.cropSelection;
   console.log("user is",userInfo.name);
   console.log("user is",sellerNumber);
  const category_back = productLendMachines.category ? productLendMachines.category.toLowerCase() : '';

  // const descriptionLines = productLendMachines.description.split('\n');
  const descriptionLines = productLendMachines.description ? productLendMachines.description.split('\n') : [];

  
  return (
    <div className="productScreen">
      <Meta title="Threshers" />
      <Container>
       <Link className="btn btn-go-back btn-dark" to={`/${category_back}`}> 
          GO BACK
        </Link>
        {/* <Link className="btn btn-go-back btn-dark" to="/farmers/lendMachines"> */}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row className="p-3 seed-product">
            <Col md={5} className="product-image-col">
              <Image
                className="mx-auto image-machine"
                src={productLendMachines.image}
                alt={productLendMachines.name}
                width={200}
              />
            </Col>
            <Col md={5}>
              <ListGroup className="borderless" variant="flush">
                <ListGroup.Item>
                  <h2>{productLendMachines.name}</h2>
                </ListGroup.Item>

                <ListGroup.Item>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Seller Name:</span>
                    <br /> {productLendMachines.seller}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                <p>
                    <span style={{ fontWeight: "bold" }}>Seller Email:</span>
                    <br /> {sellerEmail}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  {/* <p>
                    <span style={{ fontWeight: "bold" }}>
                      Product Description:
                    </span>
                    <br /> {productLendMachines.description}
                  </p> */}
                  <p>
                    <span style={{ fontWeight: "bold" }}>
                      Product Description:
                    </span>
                    <br />
                    <ul>
                      {descriptionLines.map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                    </ul>
                  </p>
                </ListGroup.Item>

              </ListGroup>
            </Col>
            <Col md={3} className="side">
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Machine Power:</Col>
                      <Col>{productLendMachines.machine_power}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>RS.{productLendMachines.price}/hour</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Category:</Col>
                      {/* <Col>{categoryMapping[productLendMachines.category]}</Col> */}
                      <Col>{productLendMachines.category}</Col>
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
                 
                  {userInfo && userInfo._id !== productLendMachines.user && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={addtoCartHandler}>
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
              {userInfo && userInfo._id === productLendMachines.user && (
                <Button
                  type="button"
                  className="btn btn-block mt-3 btn-secondary"
                  onClick={EditHandler}>
                  Edit Item
                </Button>
              )}
              {userInfo && userInfo._id !== productLendMachines.user && (
              <Button
                type="button"
                className="btn btn-block mt-3 btn-info"
                onClick={() => setShowModal(true)}>  {/* Show modal on click */}
                Contact Seller
              </Button>
            )}
            </Col>
            {/* <Col md={6}>
            <div>
            <hr className="line" />
            <p className="product-description">
              <span style={{ fontWeight: "bold" }} >Description:</span>
              <br /> {productLendMachines.description}
            </p>
            <hr className="line" />
            </div>
            </Col> */}
          </Row>
        )}

        <Row className="justify-content-center" style={{ marginLeft: "100px" }}>
          <Col md={5}>
            <h2>Reviews</h2>
            {productLendMachines.reviews.length === 0}
            <ListGroup variant="flush">
              <ReviewSlider reviews={productLendMachines.reviews} />
              {/* {productLendMachines.reviews.map((review) => (
                                <ListGroup.Item key={review._id}>
                                  <Card className="text-center">
                                     <div className="avatar">
                                     <img src="/images/profile1.svg" alt="Avatar" />
                                      </div>
                                      <strong style={{ marginBottom: '2px', display: 'block' }}>Reviewer: {review.name}</strong>
                                      <p style={{ marginBottom: '2px' }}>Date: {review.createdAt.substring(0, 10)}</p>
                                      <p style={{ marginBottom: '-5px' }}>Comment : {review.comment}</p>
                                      <Rating value={review.rating} />
                                    </Card>
                                </ListGroup.Item>
                            ))} */}
            </ListGroup>
          </Col>

          <Col md={6} style={{ marginLeft: "85px", marginBottom: "40px" }}>
            <ListGroup>
              <ListGroup.Item>
                <h2>Write a Customer Review</h2>
                {successProductReview && (
                  <Message variant="success">
                    Review submitted successfully
                  </Message>
                )}
                {loadingProductReview && <Loader />}
                {errorProductReview && (
                  <Message variant="danger">{errorProductReview}</Message>
                )}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}>
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        row="3"
                        value={comment}
                        onChange={(e) =>
                          setComment(e.target.value)
                        }></Form.Control>
                    </Form.Group>
                    <Button
                      disabled={loadingProductReview}
                      type="submit"
                      variant="primary">
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <p>
                    Please <Link to="/login">sign in</Link> to write a review{" "}
                  </p>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
      {/* Modal to show seller's mobile number */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Seller</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Seller's Mobile Number: {sellerNumber}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LendMachineProduct;
