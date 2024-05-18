import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Alert} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Message/Message";
import Loader from "../Loader/Loader";
import FormContainer from "../FormContainer/FormContainer";
import { register } from "../../actions/userActions";
import Meta from "../Helmet/Meta";

const Register = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cropSelection, setCropSelection] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [mobileError, setMobileError] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else if (!validateEmail(email)) {
      setMessage("Please enter a valid email address");
    } else if (!validateMobile(cropSelection)) {
      setMobileError("Please enter a valid Indian mobile number.");
    } else if (!validatePassword(password)) {
      setMessage(
        "Password must contain at least 8 characters, one capital letter, one number, and one special character"
      );
    } else {
      dispatch(register(name, email, password, cropSelection));
    }
  };
  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    // Regular expression for password validation
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    return passwordPattern.test(password);
  };
  const validateMobile = (cropSelection) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(cropSelection);
  };
  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (validateMobile(value)) {
      setMobileError("");
    } else {
      setMobileError("Please enter a valid Indian mobile number.");
    }
    setCropSelection(value);
  };

  return (
    <FormContainer>
      <Meta title="Krishi Sarathi | Register" />
      <h1 style={{ marginTop: "120px" }}>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>
                Name <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>
                Email Address<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="nic"
                placeholder="Enter email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="cropSelection">
              <Form.Label>
                Mobile Number <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="cropSelection"
                placeholder="Enter Mobile Number              "
                value={cropSelection}
                onChange={handleMobileChange}
        />
        {mobileError && <Alert variant="danger">{mobileError}</Alert>}
      </Form.Group>

          </Col>
          <Col md={6}>
            <Form.Group controlId="password">
              <Form.Label>
                Password <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>
                Confirm password <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                required
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Register
            </Button>
          </Col>
        </Row>
      </Form>
      <Row className="py-3">
        <Col style={{ marginBottom: "30px" }}>
          Have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>

      <Row className="py-3">
        <span style={{ color: "red", fontFamily: "sans-serif" }}>
          Password must contain at least 8 characters,one capital letter,one
          number,and one special character
        </span>
      </Row>
    </FormContainer>
  );
};

export default Register;
