import React, { useState } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Form, Button } from "react-bootstrap";

import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isCommentValid, setIsCommentValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailValid && isCommentValid) {
      alert("Thank you for your feedback!");
      // Reset fields after successful submission
      setEmail("");
      setComment("");
      setIsEmailValid(false);
      setIsCommentValid(false);
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  };

  const handleCommentChange = (e) => {
    const commentValue = e.target.value;
    setComment(commentValue);
    setIsCommentValid(validateComment(commentValue));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateComment = (comment) => {
    return comment.length > 6;
  };

  return (
    <BrowserRouter>
      <MDBFooter
        color="blue-grey"
        className="page-footer font-small lighten-5 pt-0">
        <div style={{ backgroundColor: "#008f11" }}>
          <MDBContainer>
            <MDBRow className="py-4 d-flex align-items-center">
              <MDBCol
                md="6"
                lg="5"
                className="text-center text-md-left mb-4 mb-md-0">
                <h6 className="mb-0 " style={{ color: "white" }}>
                  {" "}
                  Get connected with us on social networks!
                </h6>
              </MDBCol>
              <MDBCol md="6" lg="7" className="text-center text-md-right">
                <Link to="/" className="fb-ic ml-0">
                  <i className="fab fa-facebook-f white-text mr-lg-4"> </i>
                </Link>
                <Link to="/" className="tw-ic">
                  <i className="fab fa-twitter white-text mr-lg-4"> </i>
                </Link>
                <Link to="/" className="gplus-ic">
                  <i className="fab fa-google-plus-g white-text mr-lg-4"> </i>
                </Link>
                <Link to="/" className="li-ic">
                  <i className="fab fa-linkedin-in white-text mr-lg-4"> </i>
                </Link>
                <Link to="/" className="ins-ic">
                  <i className="fab fa-instagram white-text mr-lg-4"> </i>
                </Link>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
        <MDBContainer className="mt-5 mb-4 text-center text-md-left">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="3    " xl="3" className="mb-4 dark-grey-text">
              <h6 className="text-uppercase font-weight-bold">
                <strong>Krishi Sarathi</strong>
              </h6>
              <hr
                className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "60px" }}
              />
              <p className="desc">
                Krishi Sarathi serves as a transformative platform for farms,
                offering a seamless solution to rent essential farm equipment.
                Designed to empower farmers and boost productivity, our platform
                eliminates the hurdles associated with equipment ownership and
                maintenance.
              </p>
            </MDBCol>
            <MDBCol md="2" lg="2" xl="2" className="mb-4 dark-grey-text">
              <h6 className="text-uppercase font-weight-bold">
                <strong>Links</strong>
              </h6>
              <hr
                className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "60px" }}
              />
              <p>
                <Link to="/faq" className="dark-grey-text">
                  FAQs
                </Link>
              </p>
              <p>
                <Link to="/consumer" className="dark-grey-text">
                  Consumer{" "}
                </Link>
              </p>
              <p>
                <Link to="/supplier" className="dark-grey-text">
                  Supplier
                </Link>
              </p>
              <p>
                <Link to="/cart" className="dark-grey-text">
                  Cart
                </Link>
              </p>
            </MDBCol>
            <MDBCol md="3" lg="3" xl="4" className="mb-4 dark-grey-text">
              <h6 className="text-uppercase font-weight-bold">
                <strong>Contact</strong>
              </h6>
              <hr
                className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "60px" }}
              />
              <p>
                <i className="fa fa-home mr-3" /> Hubli, Karnataka, India
              </p>
              <p>
                <i className="fa fa-envelope mr-3" /> krishisarathi@gmail.com
              </p>
              <p>
                <i className="fa fa-phone mr-3" /> + 91 9876543213
              </p>
              <p>
                <i className="fa fa-print mr-3" /> + 91 8746521301
              </p>
            </MDBCol>
            <MDBCol md="3" lg="4" xl="3" className="mb-4 dark-grey-text">
              <h6 className="text-uppercase font-weight-bold">
                <strong>Get in touch</strong>
              </h6>
              <hr
                className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                style={{ width: "60px" }}
              />
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    isInvalid={email.length > 0 && !isEmailValid}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    type="text"
                    placeholder="Write Your Thoughts"
                    value={comment}
                    onChange={handleCommentChange}
                    isInvalid={comment.length > 0 && !isCommentValid}
                  />
                  <Form.Control.Feedback type="invalid">
                    Comment must have more than 6 characters.
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" className="button">
                  Send message
                </Button>
              </Form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className="footer-copyright text-center py-3">
          <MDBContainer fluid className="MDB">
            &copy; {new Date().getFullYear()} Copyright: Krishi Sarathi
          </MDBContainer>
        </div>
      </MDBFooter>
    </BrowserRouter>
  );
};

export default Footer;
