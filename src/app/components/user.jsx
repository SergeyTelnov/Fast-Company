import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
import PropTypes from "prop-types";
const User = (props) => {
  const qualities = props.qualities.map((el) => {
    return (
      <Qualitie key={el._id} color={el.color} name={el.name} id={el._id} />
    );
  });
  const buttonDelete = (
    <button
      className="btn btn-danger"
      onClick={() => props.onDelete(props._id)}
    >
      Удалить
    </button>
  );
  const buttonIcon = (
    <button
      className="btn btn-light"
      onClick={() => props.onToggleBookMark(props._id)}
    >
      <BookMark bookmark={props.bookmark} />
    </button>
  );
  return (
    <tr key={props._id}>
      <td>{props.name}</td>
      <td>{qualities}</td>
      <td>{props.profession.name}</td>
      <td>{props.completedMeetings}</td>
      <td>{props.rate}/5</td>
      <td>{buttonIcon}</td>
      <td>{buttonDelete}</td>
    </tr>
  );
};
User.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  qualities: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  bookmark: PropTypes.bool.isRequired,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired
};

export default User;
