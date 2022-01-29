import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const SearchUser = ({ usersName, onSearch }) => {
  const [searchUser, setSearchUser] = useState("");
  const handleChange = ({ target }) => {
    setSearchUser(target.value);
  };
  const filteredUsers = usersName.filter((user) => {
    return user.name.toLowerCase().includes(searchUser.toLowerCase());
  });
  useEffect(() => {
    onSearch(filteredUsers);
  }, [searchUser]);

  return (
    <input
      type="text"
      id="user"
      placeholder="Search..."
      value={searchUser}
      onChange={handleChange}
    />
  );
};
SearchUser.propTypes = {
  usersName: PropTypes.array,
  onSearch: PropTypes.func
};

export default SearchUser;
