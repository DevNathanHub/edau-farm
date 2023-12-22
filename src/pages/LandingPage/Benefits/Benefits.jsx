import React from 'react';
import './Benefits.css';

import TravelPerksIcon from '../Benefits/SvgIcons/TravelPerks.gif';
import CompensationBenefitsIcon from '../Benefits/SvgIcons/CompensationBenefits.gif';
import GrowthDevelopmentIcon from '../Benefits/SvgIcons/GrowthDevelopment.gif';
import TransparentLeadershipIcon from '../Benefits/SvgIcons/TransparentLeadership.gif';
import DeltaWellbeingIcon from '../Benefits/SvgIcons/DeltaWellbeing.png';
import CovidSafetyIcon from '../Benefits/SvgIcons/CovidSafety.gif';

function Benefits() {
  return (
    <div className="benefit">
      {/* Row 1 */}
      <div className="benefit-item">
        <img src={TravelPerksIcon} alt="Travel & Perks Icon" className="benefit-icon" />
        <h2>Travel & Perks</h2>
        <p>
          Employees and eligible travel partners can explore amazing destinations anywhere Delta flies through our worldwide pass travel privileges, discounted Delta Vacations perks and reduced fares on other airlines.
        </p>
      </div>

      <div className="benefit-item">
        <img src={CompensationBenefitsIcon} alt="Compensation & Benefits Icon" className="benefit-icon" />
        <h2>Compensation & Benefits</h2>
        <p>
          We are proud to offer our employees an appealing total compensation and benefits package including competitive base pay, profit sharing, 401(k) contributions and health and wellbeing programs.
        </p>
      </div>

      <div className="benefit-item">
        <img src={GrowthDevelopmentIcon} alt="Growth & Development Icon" className="benefit-icon" />
        <h2>Growth & Development</h2>
        <p>
          Delta is a great place to develop, both personally and professionally. We offer employees both upward and global mobility, access to business resource groups, online learning, mentorship programs and more!
        </p>
      </div>

      {/* Row 2 */}
      <div className="benefit-item">
        <img src={TransparentLeadershipIcon} alt="Transparent Leadership Icon" className="benefit-icon" />
        <h2>Transparent Leadership</h2>
        <p>
          Our leaders provide frequent and candid updates on the state of the business through town halls, quarterly earnings calls, Leadership Engagement Series and our CEO’s social media feeds.
        </p>
      </div>

      <div className="benefit-item">
        <img src={DeltaWellbeingIcon} alt="Delta Wellbeing Icon" className="benefit-icon" />
        <h2>Delta Wellbeing</h2>
        <p>
          Employees are encouraged to put their health and wellbeing first. Our Delta Wellbeing program provides holistic resources to support physical and mental health, financial resiliency and work/life responsibilities.
        </p>
      </div>

      <div className="benefit-item">
        <img src={CovidSafetyIcon} alt="COVID-19 Safety Icon" className="benefit-icon" />
        <h2>COVID-19 Safety</h2>
        <p>
          We have implemented a number of safety protocols recommended by trusted medical experts, including testing options for all employees, social distancing guidelines and vaccine accessibility.
        </p>
      </div>
    </div>
  );
}

export default Benefits;
