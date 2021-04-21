import React from "react";
import styled from "styled-components";
import Particles from "react-tsparticles";
import StarWarsLogoSrc from "../svgs/star_wars_logo.svg";

const StarsContainer = styled.div`
  position: relative;
  height: 100vh;
`;

const StarsParticles = styled(Particles)`
  height: 100%;
`;

const MainContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StarWarsLogo = styled.img`
  /* width: 50%; */
  height: 35%;

  @media (max-width: 960px) {
    height: 20%;
  }
`;

const StarWarsLogoCatalogue = styled.h1`
  color: black;
  text-shadow: -2px 0 #ffc500, 0 2px #ffc500, 2px 0 #ffc500, 0 -2px #ffc500;
  font-size: 5rem;

  @media (max-width: 960px) {
    font-size: 3rem;
  }
`;

const ForceText = styled.h2`
  font-size: 2rem;
  color: white;
  @media (max-width: 960px) {
    font-size: 1rem;
  }
`;

const ScrollText = styled.h3`
  font-size: 1.5rem;
  color: white;
  margin-top: 2rem;
  text-align: center;

  @media (max-width: 960px) {
    font-size: 1rem;
  }
`;

function Stars() {
  return (
    <StarsContainer>
      <StarsParticles
        id="tsparticles"
        options={{
          background: {
            color: {
              value: "#030303",
            },
          },
          particles: {
            number: {
              value: 355,
              density: {
                enable: true,
                value_area: 789.1476416322727,
              },
            },
            color: {
              value: "#ffffff",
            },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: "#000000",
              },
              polygon: {
                nb_sides: 5,
              },
              image: {
                src: "img/github.svg",
                width: 100,
                height: 100,
              },
            },
            opacity: {
              value: 0.48927153781200905,
              random: false,
              anim: {
                enable: true,
                speed: 0.2,
                opacity_min: 0,
                sync: false,
              },
            },
            size: {
              value: 2,
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 0,
                sync: false,
              },
            },
            line_linked: {
              enable: false,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.2,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "bubble",
              },
              onclick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 83.91608391608392,
                size: 1,
                duration: 3,
                opacity: 1,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: true,
        }}
      />
      <MainContainer>
        <StarWarsLogo src={StarWarsLogoSrc} alt="Star Wars Logo" />
        <StarWarsLogoCatalogue>Catalogue</StarWarsLogoCatalogue>
        <ForceText>Let the force be with you!</ForceText>
        <ScrollText>Scroll down to see the Characters Catalogue!</ScrollText>
      </MainContainer>
    </StarsContainer>
  );
}

export default Stars;
