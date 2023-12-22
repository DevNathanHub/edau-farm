// Import necessary dependencies
import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './annual.css'; // Import your external stylesheet for additional styling

// Import images
import annualImage1 from './annualImage1.jpg';
import annualImage2 from './annualImage2.webp';

function Annual() {
  // Array of objects representing content for each set
  const annualContent = [
    {
      header: 'Annual Report 2023',
      stat1: 'Total Events: 150',
      stat2: 'Community Members: 5000+',
      stat3: 'Awards Received: 15',
      stat4: 'Top Contributor: John Doe',
      imageSrc: annualImage1,
    },
    {
      header: 'Highlights',
      stat1: 'New Initiatives Launched: 5',
      stat2: 'Successful Collaborations: 10',
      stat3: 'Impactful Community Projects: 8',
      stat4: 'Upcoming Events: 20+',
      imageSrc: annualImage2,
    },
    // Add more objects as needed
  ];

  return (
    <Container>
      <div className='community-blog'>
        <h1 className='blog-header'>{annualContent[0].header}</h1>
        <p>
          Explore the highlights and statistics from our annual report. We're proud to share our
          achievements and community impact over the past year.
        </p>
      </div>

      {annualContent.map((content, index) => (
        <Row key={index} className="blog-content">
          {/* First Column with two cards */}
          <Col md={6}>
            <Card className="blog-card">
              <Card.Body>
                <Card.Title className="blog-title">{content.stat1}</Card.Title>
                <Card.Text className="blog-text">{content.stat2}</Card.Text>
              </Card.Body>
            </Card>

            <Card className="mt-4 blog-card">
              <Card.Body>
                <Card.Title className="blog-title">{content.stat3}</Card.Title>
                <Card.Text className="blog-text">{content.stat4}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column with image */}
          <Col md={6} className="text-center">
            <img
              src={content.imageSrc}
              alt={`Annual Report Image ${index}`}
              className="img-fluid mt-4 blog-image"
            />
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default Annual;
