import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const AboutSection: React.FC = () => {
  return (
    <section className="about-section">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-text">
          <p>
            Hello! I'm Hamzat AbdulAzeez Adeleke, a passionate Frontend Engineer with over 5 years of 
            experience crafting beautiful, responsive, and high-performance web interfaces that users love.
          </p>
          <p>
            I specialize in turning complex designs and requirements into pixel-perfect, interactive 
            experiences using modern frontend technologies. My core toolkit includes HTML, CSS, 
            JavaScript, React, Vue, TypeScript, Tailwind CSS, and state management solutions like 
            Redux & Zustand. I also have strong experience building and consuming RESTful & GraphQL 
            APIs, seamless frontend-backend integration, authentication flows, and real-time features.
          </p>
          <p>
            I'm constantly learning new tools, patterns, and best practices because great engineers 
            never stop growing. When I'm not coding, you can find me exploring UI/UX trends, reading 
            tech blogs, contributing to open source, or working on side projects that push my limits.
          </p>
          <p>Let's build something fast, elegant, and impactful together!</p>
        </div>

        <div className="social-links">
        <a href="https://github.com/HamzatAbdulazeez" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
          <a href="https://www.linkedin.com/in/hamzat-abdul-azeez-adeleke-890324213" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <a href="https://x.com/Hamzat_tristan" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a href="https://www.instagram.com/hmztadeleke/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;