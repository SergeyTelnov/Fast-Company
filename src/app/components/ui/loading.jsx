import React from "react";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center vh-100 align-items-center">
      <button className="btn btn-primary" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Loading...
      </button>
    </div>
  );
};

export default Loading;
