import React from "react";
const SearchStatus = (length) => {
  const renderPhrase = (number) => {
    const lastOne = Number(number.toString().slice(-1));
    if (number > 4 && number < 15) return "Человек тусанет";
    if ([2, 3, 4].indexOf(lastOne) >= 0) return "Человека тусанут";
    return "Человек тусанет";
  };
  return (
    <h3>
      <span
        className={"badge m-2 bg-" + (length.number > 0 ? "primary" : "danger")}
      >
        {length.number > 0
          ? `${length.number} ${renderPhrase(length.number)} с тобой сегодня`
          : "Никто с тобой не тусанёт"}
      </span>
    </h3>
  );
};

export default SearchStatus;
