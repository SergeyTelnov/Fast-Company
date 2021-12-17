import React from "react";
const BookMark = (status) => {
  if (status.bookmark) {
    return <i className="bi bi-heart-fill"></i>;
  } else {
    return <i className="bi bi-heart"></i>;
  }
};

export default BookMark;
