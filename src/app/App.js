import React, {useState} from "react";
import Users from "./components/users";
import searchStatus from "./components/searchStatus"
import api from "./api";

function App () {
  const [users, setUsers] = useState(api.users.fetchAll())
  const handleDelete = (userId) => {
    setUsers(prevState => prevState.filter(users => users._id !== userId))
  }
  const handleToggleBookMark = (id) => {
    const newStatusBookMark = users.map((el) => {
        if (el._id === id && el.bookmark === false) {
          el.bookmark = true
        } else if (el._id === id && el.bookmark) {
          el.bookmark = false
        }
        return el
    })
    setUsers(newStatusBookMark)
  }
  return (
    <>
      {searchStatus(users.length)}
      {users.length > 0 &&
        <table className = "table">
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
            {users.map((user) => {
              return < Users
                key = {user._id}
                {...user}
                onDelete = {handleDelete}
                onToggleBookMark = {handleToggleBookMark}
              />
            })}
          </tbody>
        </table>
      }         
    </>
  )
}

export default App