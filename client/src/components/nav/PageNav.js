import React from "react";
import { Pagination } from "react-bootstrap";
import styled from "styled-components";

const PageNav = ({ page, setPage, itemCount }) => {
  const numOfPages = Math.ceil(itemCount / 4);
  let items = [];

  for (let number = 1; number <= numOfPages; number++) {
    items.push(
      <StyledPages>
        <Pagination.Item
          className="pages"
          onClick={() => handleClick(number)}
          key={number}
          active={number === page}
        >
          {number}
        </Pagination.Item>
      </StyledPages>
    );
  }

  const handleClick = (pageNumber) => {
    page = pageNumber;
    setPage(pageNumber);
  };

  return (
    <Pagination className="pages" size="sm">
      {items}
    </Pagination>
  );
};

const StyledPages = styled.div`
  .pages {
    font-family: "Inter", sans-serif;
    a {
      color: #ab417f !important;
    }
  }
`;

export default PageNav;
