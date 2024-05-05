import React from "react";

import { Card, Accordion, Button } from "react-bootstrap";
// import './FaqStyles.css'
const FaqScreen = () => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">
        <b>How can we Help?</b>
      </h2>
      <Accordion defaultActiveKey="0">
        {/* Question 1 */}
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              How do I register on Krishi Sarathi?
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              To register on Krishi Sarathi, click on the "Register" button
              located at the top of the page. Fill in the required information
              and follow the prompts to complete the registration process.
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        {/* Question 2 */}
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              How can I rent equipment from Krishi Sarathi?
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              Renting equipment from Krishi Sarathi is easy. Simply browse our
              catalog, select the equipment you need, and proceed to checkout.
              You can choose the duration and quantity before finalizing your
              order.
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        {/* Add more questions and answers here */}
        {/* Question 3 */}
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="4">
              What payment methods do you accept?
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="4">
            <Card.Body>
              We accept various payment methods, including credit cards, debit
              cards, PayPal, and bank transfers. Choose the option that is most
              convenient for you during the checkout process.
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        {/* Question 4 */}
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="3">
              How do I contact customer support?
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              You can contact our customer support team via email at
              krishisarathi@gmail.com or by phone at + 91 9876543213. Our team
              is available to assist you with any questions or concerns you may
              have.
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        {/* Add more questions and answers here */}
      </Accordion>
    </div>
  );
};

export default FaqScreen;
