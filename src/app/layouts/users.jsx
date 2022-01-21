import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/usersPage";
import UsersListPage from "../components/page/usersListPage";
import UserPageChange from "../components/page/userPageChange";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  if (userId && edit) {
    return (
      <>
        <UserPageChange userId={userId} />
      </>
    );
  } else if (userId) {
    return (
      <>
        <UserPage userId={userId} />
      </>
    );
  } else {
    return (
      <>
        <UsersListPage />
      </>
    );
  }
};

export default Users;
