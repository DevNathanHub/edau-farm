// Import necessary dependencies
import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './communityTeams.css'; // Import your external stylesheet for additional styling

// Import images
import team1Image from './team1.jpeg';
import team2Image from './team2.jpg';

function team() {
  // Array of objects representing information for each team
  const teamInfo = [
    {
      id: 1,
      name: 'Tech Enthusiasts',
      leader: 'John Doe',
      mission: 'Empowering the community with technology insights.',
      imageSrc: team1Image,
    },
    {
      id: 2,
      name: 'Environmental Advocates',
      leader: 'Jane Smith',
      mission: 'Promoting sustainability and environmental awareness.',
      imageSrc: team2Image,
    },
    // Add more teams as needed
  ];

  return (
    <Container>
      <div className='community-blog'>
        <h1 className='blog-header'>COMMUNITY TEAMS PAGE</h1>
        <p>
          Discover the diverse teams within our community, each dedicated to a unique mission.
        </p>
      </div>

      {teamInfo.map((team, index) => (
        <Row key={index} className="blog-content ">
          {/* Team Name */}
          <h1 className='blog-header'>{team.name}</h1>

          {/* Team Image */}
          <Col md={12} className="text-center">
            <img
              src={team.imageSrc}
              alt={`Team Image ${index}`}
              className="img-fluid mt-4 team-image"
            />
          </Col>

          {/* Team Leader and Mission */}
          <Col md={12} className="text-center">
            <p className="team-leader">Leader: {team.leader}</p>
            <p className="team-mission">{team.mission}</p>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default team;
