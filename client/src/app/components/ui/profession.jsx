import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  getProfessionByIds,
  getProfessionsLoadingStatus
} from "../../store/profession";

const Profession = ({ id }) => {
  const prof = useSelector(getProfessionByIds(id));
  const isLoading = useSelector(getProfessionsLoadingStatus());
  if (!isLoading) {
    return <p>{prof.name}</p>;
  } else {
    return "Loading...";
  }
};
Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
