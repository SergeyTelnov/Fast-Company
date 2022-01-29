import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/usersPage";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  if (userId && edit) {
    return (
      <>
        <EditUserPage />
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
