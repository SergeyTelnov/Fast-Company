import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
import PropTypes from "prop-types";
const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  onDelete,
  bookmark,
  onToggleBookMark
}) => {
  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>
        {qualities.map((qual) => (
          <Qualitie {...qual} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        {<BookMark status={bookmark} onClick={() => onToggleBookMark(_id)} />}
      </td>
      <td>
        {
          <button
            className="btn btn-danger"
            onClick={() => onDelete(props._id)}
          >
            Удалить
          </button>
        }
      </td>
    </tr>
  );
};
User.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  qualities: PropTypes.array.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  onToggleBookMarkUser: PropTypes.func.isRequired,
  bookmark: PropTypes.bool.isRequired,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired
};

export default User;
