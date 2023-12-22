import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import placeholder from './placeholder.jpg';
import './About.css'; // Import your custom stylesheet for additional styling

function About() {
  return (
    <div>
      {/* Static Content */}
      {/* Static Content */}
      <div className="static-content">
        <h2>Welcome to Our Community</h2>
        <p>
          Learn more about our rich brotherhood community and discover the amazing aspects
          that make us unique.
        </p>

        {/* Additional Div 1 */}
        <div className='additions'>
          <div className="additional-content additional-content-1">
            <h3>Our Vision</h3>
            <p>Explore the vision that guides our community towards a brighter future.</p>
          </div>

          {/* Additional Div 2 */}
          <div className="additional-content additional-content-2">
            <h3>Membership Benefits</h3>
            <p>Discover the exclusive benefits our members enjoy within our community.</p>
          </div>
        </div>
      </div>
    <Container>
      <Row>
        {/* First Column with two cards */}
        <Col md={6} className="about-content">
          <Card className="about-card">
            <Card.Body>
              <Card.Title className="card-title">Card 1</Card.Title>
              <Card.Text className="card-text">
                Content for Card 1. Add details about the rich brotherhood community.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mt-4 about-card">
            <Card.Body>
              <Card.Title className="card-title">Card 2</Card.Title>
              <Card.Text className="card-text">
                Content for Card 2. More details about the community.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column with image */}
        <Col md={6} className="text-center">
          <img
            src={placeholder}
            alt="Placeholder Image"
            className="img-fluid  mt-4 about-image"
          />
        </Col>
      </Row>
    </Container>
    <Container>
    <Row>
      {/* First Column with two cards */}
      <Col md={6} className="about-content">
        <Card className="about-card">
          <Card.Body>
            <Card.Title className="card-title">Card 1</Card.Title>
            <Card.Text className="card-text">
              Content for Card 1. Add details about the rich brotherhood community.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="mt-4 about-card">
          <Card.Body>
            <Card.Title className="card-title">Card 2</Card.Title>
            <Card.Text className="card-text">
              Content for Card 2. More details about the community.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>

      {/* Right Column with image */}
      <Col md={6} className="text-center">
        <img
          src={placeholder}
          alt="Placeholder Image"
          className="img-fluid  mt-4 about-image"
        />
      </Col>
    </Row>
  </Container>
  </div>
  );
}

export default About;
