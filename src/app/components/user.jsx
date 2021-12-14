import React from "react";
import Qualitie from "./qualitie"
import BookMark from "./bookmark"
const User = (props) => {
    const qualities = props.qualities.map((el) => {
       return Qualitie(el.color, el.name, el._id)
    })
    const buttonDelete = <button 
      className = "btn btn-danger"
      onClick = {() => props.onDelete(props._id)}
      >Удалить
      </button>
    const buttonIcon = <button
      className = "btn btn-light"
      onClick = {() => props.onToggleBookMark(props._id)}
      >
        {BookMark(props.bookmark)}
      </button>
    return (
      <tr key = {props._id}>
        <td>{props.name}</td>
        <td>{qualities}</td>
        <td>{props.profession.name}</td>
        <td>{props.completedMeetings}</td>
        <td>{props.rate}/5</td>
        <td>{buttonIcon}</td>
        <td>{buttonDelete}</td>
      </tr>
    )
}

export default User