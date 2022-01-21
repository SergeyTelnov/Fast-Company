import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, ...rest }) => {
  return (
    <button className="btn btn-light" {...rest}>
      <i className={"bi bi-heart" + (status ? "-fill" : "")}></i>
    </button>
  );
};
BookMark.propTypes = {
  status: PropTypes.bool.isRequired
};

export default BookMark;
