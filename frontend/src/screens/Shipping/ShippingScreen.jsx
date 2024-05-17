// import React, { useEffect, useState } from "react";
// import { Form, Button,Alert } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import CheckoutSteps from "./../../components/CheckoutSteps/CheckoutSteps";
// import FormContainer from "../../components/FormContainer/FormContainer";
// import { saveShippingAddress } from "./../../actions/cartActions.js";
// import Meta from "../../components/Helmet/Meta";
// import { useLocation, Link, useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
// import { setAmt } from "./../../actions/cartActions";
// import { DateRange } from "react-date-range";
// import "react-date-range/dist/styles.css"; // main style file
// import "react-date-range/dist/theme/default.css"; // theme css file
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// // import {AddressValidator} from "react-address-validator";

// let val_amt;
// let val_duration;
// let val_inp;
// const ShippingScreen = ({}) => {
//   const history = useHistory();
//   const location = useLocation();
//   const data = location.state;
  
//   // console.log("vall",vall);
//   val_amt = data && data.amt ? data.amt : 0;
//   val_duration = data && data.selectedDurations ? data.selectedDurations : 0;
//   val_inp = data && data.enteredDurations ? data.enteredDurations : 0;


//   const cart = useSelector((state) => state.cartSeed);
//   const { shippingAddress } = cart;

//   const [address, setAddress] = useState(shippingAddress.address);
//   const [city, setCity] = useState(shippingAddress.city);
//   const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
//   const [country, setCountry] = useState(shippingAddress.country);
//   const [error, setError] = useState("");
//   const [dateRange, setDateRange] = useState({
//     startDate: null,
//     endDate: null,
// });
// const [startDate, setStartDate] = useState(new Date());
// const [endDate, setEndDate] = useState(new Date());
  
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(setAmt( val_amt));
//   }, [dispatch,  val_amt]);

//   const isValidIndianPostalCode = (postalCode) => {
//     const indianPostalCodePattern = /^\d{6}$/;
//     return indianPostalCodePattern.test(postalCode);
//   };
  
//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (!isValidIndianPostalCode(postalCode)) {
//       // Set error message for invalid postal code
//       setError("Please enter a valid Indian postal code.");
//       return;
//     }
//     // Clear error message
//     setError("");
//     // Save shipping address and navigate to payment screen
//     dispatch(saveShippingAddress({ address, city, postalCode, country, slotBooking: {
//       startDateTime: startDate,
//       endDateTime: endDate,
//   },}));
//     // history.push("/payment");
//     history.push({
//         pathname: '/payment',
//         state: { amt: val_amt,
//           selectedDurations:val_duration,
//           enteredDurations:val_inp,

//         },
//       });
    
//   };

//   return (
//     <div style={{ marginTop: "100px" }}>
//       <FormContainer>
//         <Meta title="Krishi Sarathi | Shipping" />
//         <CheckoutSteps step1 step2 />
//         <h1>Shipping</h1>

//         {/* <h1>Amt: {data.amt}</h1> */}

//         <Form onSubmit={submitHandler} style={{ marginBottom: "40px" }}>
//           <Form.Group controlId="address">
//             <Form.Label>
//               Address <span style={{ color: "red" }}>*</span>
//             </Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter address"
//               value={address}
//               required
//               onChange={(e) => setAddress(e.target.value)}></Form.Control>
//           </Form.Group>
//           <Form.Group controlId="city">
//             <Form.Label>
//               City <span style={{ color: "red" }}>*</span>
//             </Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter City"
//               value={city}
//               required
//               onChange={(e) => setCity(e.target.value)}></Form.Control>
//           </Form.Group>

//           <Form.Group controlId="postalCode">
//             <Form.Label>
//               Postal Code <span style={{ color: "red" }}>*</span>
//             </Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter postal code"
//               value={postalCode}
//               required
//               onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
//                {error && <Alert variant="danger">{error}</Alert>}
//           </Form.Group>
//           <Form.Group controlId="Slot Booking">
//             <Form.Label>
//               Country <span style={{ color: "red" }}>*</span>
//             </Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter Country"
//               value={country}
//               required
//               onChange={(e) => setCountry(e.target.value)}></Form.Control>
//           </Form.Group>
          
//           <Form.Group controlId="Slot Booking">
//             <Form.Label>
//               Slot Booking <span style={{ color: "red" }}>*</span>
//             </Form.Label>
//             <div>
//                         <label>Start Date and Time  :   </label>
//                         <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect dateFormat="Pp" />
//                     </div>
//                     <div>
//                         <label>End Date and Time  :   </label>
//                         <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} showTimeSelect dateFormat="Pp" />
//                     </div>
//                     <br />
//           </Form.Group>
//           {/* <p>seed id : {cart.orderItems }</p>
//           <p>Selected Start Date & Time :{cart.shippingAddress.slotBooking.startDateTime.toLocaleString()}</p>
//           <p>Selected End Date & Time :{cart.shippingAddress.slotBooking.startDateTime.toLocaleString()}</p> */}
          
//           <Button type="submit">Continue</Button>
//         </Form>
//       </FormContainer>
//     </div>
//   );
// };

// export default ShippingScreen;


import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import FormContainer from "../../components/FormContainer/FormContainer";
import { saveShippingAddress, setAmt } from "../../actions/cartActions.js";
import Meta from "../../components/Helmet/Meta";
import { useLocation, useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ShippingScreen = () => {
  const history = useHistory();
  const location = useLocation();
  const data = location.state;

  const val_amt = data && data.amt ? data.amt : 0;
  const val_durationKey = data && data.selectedDurations ? Object.keys(data.selectedDurations)[0] : null;
  const val_duration = val_durationKey ? data.selectedDurations[val_durationKey] : 0;
  const val_inpKey = data && data.enteredDurations ? Object.keys(data.enteredDurations)[0] : null;
  const val_inp = val_inpKey ? data.enteredDurations[val_inpKey] : 0;

  const cart = useSelector((state) => state.cartSeed);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAmt(val_amt));
  }, [dispatch, val_amt]);

  const isValidIndianPostalCode = (postalCode) => {
    const indianPostalCodePattern = /^\d{6}$/;
    return indianPostalCodePattern.test(postalCode);
  };

  const validateDuration = () => {
    const diffInMs = endDate - startDate;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    console.log("inp time :",val_inp);
    console.log("diffInms:",diffInMs);
    console.log("diffInHours :",diffInHours);
    console.log("val_duration :",val_duration);

    if (val_duration === "hours" && diffInHours !== parseInt(val_inp)) {
      return `Please select an end date and time that is exactly ${val_inp} hour(s) from the start date and time.`;
    } else if (val_duration === "days" && diffInHours !== parseInt(val_inp) * 24) {
      return `Please select an end date and time that is exactly ${val_inp} day(s) from the start date and time.`;
    } else if (val_duration === "weeks" && diffInHours !== parseInt(val_inp) * 24 * 7) {
      return `Please select an end date and time that is exactly ${val_inp} week(s) from the start date and time.`;
    }
    return "";
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!isValidIndianPostalCode(postalCode)) {
      setError("Please enter a valid Indian postal code.");
      return;
    }

    const durationError = validateDuration();
    if (durationError) {
      setError(durationError);
      return;
    }

    setError("");
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
        slotBooking: {
          startDateTime: startDate,
          endDateTime: endDate,
        },
      })
    );

    history.push({
      pathname: "/payment",
      state: {
        amt: val_amt,
        selectedDurations: val_duration,
        enteredDurations: data.enteredDurations,
      },
    });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <FormContainer>
        <Meta title="Krishi Sarathi | Shipping" />
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>

        <Form onSubmit={submitHandler} style={{ marginBottom: "40px" }}>
          <Form.Group controlId="address">
            <Form.Label>
              Address <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>
              City <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="postalCode">
            <Form.Label>
              Postal Code <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>
              Country <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="slotBooking">
            <Form.Label>
              Slot Booking <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <div>
              <label>Start Date and Time: </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                dateFormat="Pp"
              />
            </div>
            <div>
              <label>End Date and Time: </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                dateFormat="Pp"
              />
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
          </Form.Group>

          <Button type="submit">Continue</Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default ShippingScreen;
