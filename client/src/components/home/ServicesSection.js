import { Description } from "../../styles/styles";
import styled from "styled-components";

const ServicesSection = () => {
  return (
    <>
      <Section>
        <Description>
          <ServicesContainer>
            <h1>
              Request help for healthcare needs from
              <span> liscenced professionals</span> in your community.
            </h1>
          </ServicesContainer>
        </Description>
      </Section>
    </>
  );
};

const Section = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 10rem;
  color: white;
`;

const ServicesContainer = styled.div`
  h1 {
    color: #3a2d49;
    font-size: 4rem;
    font-family: "Inter", sans-serif;
    font-weight: lighter;
  }
  span {
    color: #f18457;
    font-weight: bold;
  }
`;

export default ServicesSection;
