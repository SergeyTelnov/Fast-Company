import React, { useState } from "react";
import User from "./user";
import PropTypes from "prop-types";
import Pagination from "./pagination";
import { paginate } from "../utils/piginate";

const Users = (props) => {
  const count = props.users.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const userCrop = paginate(props.users, currentPage, pageSize);
  const hendlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  return (
    <>
      {props.users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {userCrop.map((user) => {
              return (
                <User
                  key={user._id}
                  {...user}
                  onDelete={props.onDelete}
                  onToggleBookMark={props.onToggleBookMark}
                />
              );
            })}
          </tbody>
        </table>
      )}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={hendlePageChange}
      />
    </>
  );
};
Users.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired
};

export default Users;
