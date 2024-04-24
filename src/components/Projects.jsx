import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import Header from './Header';
import endpoints from '../constants/endpoints';
import ProjectCard from './projects/ProjectCard';
import FallbackSpinner from './FallbackSpinner';
import '../css/projects.css'; // Import CSS file

// Define styles object
const styles = {
  containerStyle: {
    marginBottom: 25,
  },
};

const Projects = ({ header }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.projects, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container style={styles.containerStyle}>
          <Row xs={1} sm={1} md={2} lg={3} className="g-4">
            {data?.projects?.map((project) => (
              <Fade key={project.title}>
                <ProjectCard project={project} className="project-card" />
              </Fade>
            ))}
          </Row>
        </Container>
      </div>
      <FallbackSpinner />
    </>
  );
};

Projects.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Projects;
