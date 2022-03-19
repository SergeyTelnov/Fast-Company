import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import userService from "../service/user.service";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

const UseContext = React.createContext();

export const useUser = () => {
  return useContext(UseContext);
};

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);
  useEffect(() => {
    if (!isLoading) {
      const newUsers = [...users];
      const indexUser = newUsers.findIndex((u) => u._id === currentUser._id);
      newUsers[indexUser] = currentUser;
      setUsers(newUsers);
    }
  }, [currentUser]);

  async function getUsers() {
    try {
      const { content } = await userService.get();
      setUsers(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }
  function getUserById(userId) {
    return users.find((user) => user._id === userId);
  }

  return (
    <UseContext.Provider value={{ users, getUserById }}>
      {!isLoading ? children : "Loading.."}
    </UseContext.Provider>
  );
  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  }
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default UserProvider;
