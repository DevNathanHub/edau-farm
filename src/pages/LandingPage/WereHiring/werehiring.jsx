import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './HiringSection.css'; // Import your external CSS file
import cleaningposter from './cleaningposter.jpeg';
import { Link } from 'react-router-dom';

const HiringSection = () => {
  const [company] = useState([
    {
      name: "HelloCleaners",
      description: "FavCleaners Company"
    }
  ]);

  return (
    <Container className="text-center mt-5 hiring-section">
      <h2 className="text-primary">Join Our Team!</h2>
      <p className="lead">
        Looking for a fun place to work, with a flexible schedule and competitive pay? Then come live the <span className="company-name">{company[0].name}™</span> life!
      </p>

      <div className='carouselImgs'>
         <img src={cleaningposter} class="img-fluid" alt="Responsive image"/>
      </div>

      <p>
        As a <span className="company-name">{company[0].name}</span> team member, you would belong to an award-winning company and be a part of our close-knit team — a team that works together to provide the best cleaning solutions and customer service to our clients. We offer paid training, excellent work/life balance, and real opportunities for advancement. You may start off as a team member, but you are then able to tailor a career path that matches your interests and goals – including becoming a team captain, trainer, quality assurance supervisor, or manager.
      </p>
      <p>
        We take pleasure in improving our clients' lives by allowing them to spend more time with family or doing activities they enjoy. As trusted in-home professionals, we form strong relationships with our clients and are often considered part of their extended families.
      </p>
      <p className="lead">
        Ready to create brighter days for you and our customers? Apply today!
      </p>
      <Button variant="primary" size="lg" className="mt-3 apply-button">
        <Link to="/enroll">Apply Now</Link>
      </Button>
      <p className="mt-4">
        All associated locations are independently owned and operated by a <span className="company-name">{company[0].name}®</span> franchisee. Your application will go directly to the franchise, and all hiring decisions will be made by the management of that franchise. All inquiries about employment at this franchise should be made directly to the franchisee, and not to The ServiceMaster Company, LLC.
      </p>
    </Container>
  );
};

export default HiringSection;
