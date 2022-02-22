import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import Loading from "../../ui/loading";
import { useUser } from "../../../hooks/useUsers";
import { useProfession } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const UsersListPage = () => {
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading: professionsLoading, professions } = useProfession();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const { users } = useUser();
  const { currentUser } = useAuth();

  // console.log(users);

  const handleDelete = (userId) => {
    // setUsers((prevState) => prevState.filter((users) => users._id !== userId));
    console.log(userId);
  };
  const handleToggleBookMark = (id) => {
    const newArray = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    });
    // setUsers(newArray);
    console.log(newArray);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery]);
  const handleSearchQuery = ({ target }) => {
    setSelectedProf(undefined);
    setSearchQuery(target.value);
  };
  const handleProfessionSelect = (item) => {
    if (searchQuery !== "") setSearchQuery("");
    setSelectedProf(item);
  };
  const hendlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleSort = (item) => {
    setSortBy(item);
  };

  if (users) {
    function filterUsers(data) {
      let filteredUsers = [];
      if (searchQuery) {
        filteredUsers = data.filter(
          (user) =>
            user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        );
      } else if (selectedProf) {
        filteredUsers = data.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        );
      } else {
        filteredUsers = data;
      }
      return filteredUsers.filter((user) => user._id !== currentUser._id);
    }
    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
      setSelectedProf();
    };

    return (
      <div className="d-flex">
        {professions && !professionsLoading && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              items={professions}
              onItemSelect={handleProfessionSelect}
              selectedItem={selectedProf}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}

        <div className="d-flex flex-column">
          <SearchStatus number={count} />
          <input
            type="text"
            id="searchQuery"
            placeholder="Search..."
            onChange={handleSearchQuery}
            value={searchQuery}
          />
          {count > 0 && (
            <UserTable
              users={userCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={hendlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return <Loading />;
};
UsersListPage.propTypes = {
  users: PropTypes.array
};

export default UsersListPage;
