import React from "react";
import { Pagination } from "react-bootstrap";

const PageNav = ({ page, setPage, itemCount }) => {
  const numOfPages = Math.ceil(itemCount / 4);

  //Pagination
  let items = [];

  for (let number = 1; number <= numOfPages; number++) {
    items.push(
      <Pagination.Item
        onClick={() => handleClick(number)}
        key={number}
        active={number === page}
      >
        {number}
      </Pagination.Item>
    );
  }

  const handleClick = (pageNumber) => {
    page = pageNumber;
    setPage(pageNumber);
  };

  return <Pagination size="sm">{items}</Pagination>;
};

export default PageNav;
