import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Header.css";
import { logout } from "./../../actions/userActions";
import { removeAllFromCart } from "../../actions/cartActions";

const Header = () => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const history = useHistory();

  const handleCartClick = () => {
    // if (userInfo) {
      history.push('/cart');
    //   history.push('/cart');
    // } else {
    //   alert('You must be logged in to view your cart');
    //   history.push('/login');
    // }
  };

  const handleSupplierClick = () => {
    if (userInfo) {
      history.push("/supplier");
    } else {
      alert("You must be logged in to add product");
      history.push("/login");
    }
  };

  // const logoutHandler = () => {
  //   dispatch(logout());
  // };
  const logoutHandler = () => {
    dispatch((dispatch, getState) => {
        dispatch(logout());
        dispatch(removeAllFromCart());
    });
};

  const handleSearchDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <Navbar collapseOnSelect expand="lg" fixed="top">
      <LinkContainer to="/">
        <Navbar.Brand className="nav-cal">
          <Image width="80px" src="/Logo.png" />
          <span className="krishi-saarathi">Krishi Sarathi</span>
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto align-middle">
          {/* <LinkContainer to="/">
            <Nav.Link className="nav-cal">HOME</Nav.Link>
          </LinkContainer> */}
          <LinkContainer to="/farmer">
            <Nav.Link className="nav-cal">CONSUMER</Nav.Link>
          </LinkContainer>

          {/* <LinkContainer to="/consumer">
            <Nav.Link className="nav-cal">CONSUMER</Nav.Link>
          </LinkContainer> */}

          <LinkContainer to="/supplier">
            <Nav.Link className="nav-cal">SUPPLIER</Nav.Link>
          </LinkContainer>

          <NavDropdown
            title={
              <>
                <FontAwesomeIcon icon={faSearch} /> SEARCH{" "}
              </>
            }
            id="search-by-category"
            className="nav-dropdown">
            <LinkContainer to="/threshers">
              <NavDropdown.Item>THRESHERS</NavDropdown.Item>
            </LinkContainer>
            {/* <LinkContainer to="/tillages">
              <NavDropdown.Item>TILLAGES</NavDropdown.Item>
            </LinkContainer> */}
            <LinkContainer to="/tractors">
              <NavDropdown.Item>TRACTORS</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/harrows">
              <NavDropdown.Item>HARROWS</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/harvesters">
              <NavDropdown.Item>HARVESTERS</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/mowers">
              <NavDropdown.Item>MOWERS</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/balers">
              <NavDropdown.Item>BALERS</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/ploughs">
              <NavDropdown.Item>PLOUGHS</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/seeders">
              <NavDropdown.Item>SEEDERS</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/irrigations">
              <NavDropdown.Item>IRRIGATION</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/sprayers">
              <NavDropdown.Item>SPRAYERS</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/others">
              <NavDropdown.Item>OTHERS</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </Nav>

        <Nav className="ml-auto">
          <LinkContainer to="cart">
            <Nav.Link className="cart nav-cal" onClick={handleCartClick}>

              <i className="fas fa-shopping-cart"></i>
              CART
            </Nav.Link>
          </LinkContainer>
          
          {userInfo ? (
            // Display user-related options when logged in
            <>
              {/* User-related dropdown */}
              <NavDropdown title={userInfo.name.toUpperCase()} id="username">
                {userInfo && userInfo.isAdmin && (
                  <LinkContainer to="/admin/dashboard">
                    <NavDropdown.Item>DASHBOARD</NavDropdown.Item>
                  </LinkContainer>
                )}
                <LinkContainer to="/profile">
                  <NavDropdown.Item>PROFILE</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavDropdown.Item onClick={logoutHandler}>
                    LOGOUT
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </>
          ) : (
            // Display sign-in link when not logged in
            <LinkContainer to="/login">
              <Nav.Link className="login nav-cal">SIGN IN</Nav.Link>
            </LinkContainer>
          )}

          {userInfo && userInfo.isAdmin && (
            <NavDropdown title="ADMIN" id="adminmenu">
              <LinkContainer to="/admin/userlist">
                <NavDropdown.Item>USERS</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/productlist">
                <NavDropdown.Item>PRODUCTS</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/orderlist">
                <NavDropdown.Item>ORDERS</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
