import React, { useEffect, useState } from "react";
import api from "../../../api";
import Loading from "../../ui/loading";
import { useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";
import Qualities from "../../ui/qualities";

const UserPage = ({ userId }) => {
  const history = useHistory();
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.getById(userId).then((user) => setUser(user));
  }, []);

  const handleAllUsers = () => {
    history.push("/users");
  };

  if (user) {
    return (
      <>
        <h2>{user.name}</h2>
        <h5>Профессия: {user.profession.name}</h5>
        <h5>
          Качества: <Qualities qualities={user.qualities} />
        </h5>
        <h5>Оценка: {user.rate}</h5>
        <h5>Встретился, раз: {user.completedMeetings}</h5>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            handleAllUsers();
          }}
        >
          Все Пользователи
        </button>
        <Link className="btn btn-primary m-2" to={`/users/${user._id}/edit`}>
          Изменить
        </Link>
      </>
    );
  } else {
    return <Loading />;
  }
};
UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
