import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchCommunityRequests } from "../../actions/communityRequestsActions";
import styled from "styled-components";
import { InputGroup, Button, FormControl, Row, Col } from "react-bootstrap";

const SearchRequests = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSearchButton = () => {
    dispatch(searchCommunityRequests(input));
    setInput("");
  };

  return (
    <StyledSearch>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h3 className="search-title">Search Community Requests</h3>
          <div className="input">
            <InputGroup
              className="mb-3 input-bar"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            >
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>

            <Button className="button" onClick={handleSearchButton}>
              Search
            </Button>
          </div>
        </Col>
      </Row>
    </StyledSearch>
  );
};

const StyledSearch = styled.div`
  margin-top: 5rem;
  .search-title {
    padding-left: 10rem;
    color: #3a2d49;
    font-family: "Inter", sans-serif;
  }
  .input {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .input-bar {
      margin-right: 0.5rem;
      margin-top: 0.5rem;
    }
    .button {
      background-color: #f5af7f;
      color: #3a2d49;
      font-weight: bold;
      border: none;
      margin-bottom: 0.5rem;
    }
  }
`;

export default SearchRequests;
