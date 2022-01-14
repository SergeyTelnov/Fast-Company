import React, { useEffect, useState } from "react";
import api from "../api";
import Loading from "./loading";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";

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
          Качества: <QualitiesList qualities={user.qualities} />
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
