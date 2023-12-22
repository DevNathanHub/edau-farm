// blogs.js
import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './blogs.css'; // Import your external stylesheet for additional styling

// Import images
import blog1 from './blog1.jpg';
import blog2 from './blog2.webp';

function Blogs() {
  // Array of objects representing content for each set
  const blogContent = [
    {
      header: 'BLOG POST 1',
      card1: {
        title: 'Card 1',
        text: 'Content for Card 1. Add details about the rich brotherhood community.',
      },
      card2: {
        title: 'Card 2',
        text: 'Content for Card 2. More details about the community.',
      },
      category: 'News',
      venue: 'Community Hall',
      author: 'John Doe',
      awards: 'Best Community Event',
      postedOn: '2023-01-01',
      imageSrc: blog1,
    },
    {
      header: 'BLOG POST 2',
      card1: {
        title: 'Card 1',
        text: 'Content for Card 1. Add details about another topic.',
      },
      card2: {
        title: 'Card 2',
        text: 'Content for Card 2. More details about another topic.',
      },
      category: 'Event',
      venue: 'Conference Room',
      author: 'Jane Smith',
      awards: 'Outstanding Contribution',
      postedOn: '2023-02-15',
      imageSrc: blog2,
    },
    // Add more objects as needed
  ];

  return (
    <Container>
      <div className='community-blog'>
        <h1 className='blog-header'>COMMUNITY BLOG PAGE</h1>
        <p>
          Welcome to our community blog page! Here, we share insights, stories, and updates about
          our vibrant community events and topics.
        </p>
      </div>      {blogContent.map((content, index) => (
        <Row key={index} className="blog-content ">
          {/* First Column with two cards */}
          <h1 className='blog-header'>{content.header}</h1>
          <Col md={6}>
            <Card className="blog-card">
              <Card.Body>
                <Card.Title className="blog-title">{content.card1.title}</Card.Title>
                <Card.Text className="blog-text">{content.card1.text}</Card.Text>
              </Card.Body>
            </Card>

            <Card className="mt-4 blog-card">
              <Card.Body>
                <Card.Title className="blog-title">{content.card2.title}</Card.Title>
                <Card.Text className="blog-text">{content.card2.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column with image */}
          <Col md={6} className="text-center">
            <img
              src={content.imageSrc}
              alt={`Placeholder Image ${index}`}
              className="img-fluid mt-4 blog-image"
            />
          </Col>

          {/* Additional Info */}
          <Col md={12} className="mt-3">
            <p><span className="blog-category">{content.category}</span></p>
            <p>Venue: <span className="blog-info">{content.venue}</span></p>
            <p>Author: <span className="blog-info">{content.author}</span></p>
            <p>Awards: <span className="blog-info">{content.awards}</span></p>
            <p>Posted On: <span className="blog-info">{content.postedOn}</span></p>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default Blogs;
