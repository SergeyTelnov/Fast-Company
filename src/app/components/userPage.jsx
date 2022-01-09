import React, { useEffect, useState } from "react";
import api from "../api";
import Loading from "./loading";
import { useHistory, useParams } from "react-router-dom";

const UserPage = () => {
  const params = useParams();
  const { userId } = params;
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
        <h4>{`Профессия: ${user.profession.name}`}</h4>
        <h4>{`Качества: ${user.qualities.map((q) => " " + q.name)}`}</h4>
        <h4>{`Оценка: ${user.rate}`}</h4>
        <h4>{`Встретился, раз: ${user.completedMeetings}`}</h4>
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
  }
  return <Loading />;
};

export default UserPage;
