import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import NavigationTabs from "../profile/NavigationTabs";
//styling
import styled from "styled-components";
import { Page, Description, Image } from "../../styles/styles";
import together from "../../img/undraw_Together.svg";

const Home = () => {
  const { loaded } = useSelector((state) => state.member);

  return (
    <>
      {loaded ? <NavigationTabs defaultActiveKey="/co-health/" /> : ""}
      <Page>
        <Description>
          <TitleContainer>
            <h1>Helping</h1>
            <h1>
              mind the <span>gap</span>
            </h1>
            <h1>in community healthcare.</h1>
          </TitleContainer>
        </Description>
        <Image>
          <img src={together} alt="people" />
        </Image>
      </Page>
      {/* <Route exact path="/co-health/">
        {loaded ? <Redirect to="/co-health/profile" /> : ""}
      </Route> */}
    </>
  );
};

const TitleContainer = styled.div`
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

export default Home;
