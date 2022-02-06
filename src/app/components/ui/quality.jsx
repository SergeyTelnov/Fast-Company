import React from "react";
import { useQualities } from "../../hooks/useQualities";
import PropTypes from "prop-types";
import QualitiesList from "./qualities/qualitiesList";

const Quality = ({ id }) => {
  const { isLoading, getQualities } = useQualities();
  const qual = getQualities(id);
  if (!isLoading) {
    return <QualitiesList qualities={qual} />;
  } else {
    return "Loading...";
  }
};

Quality.propTypes = {
  id: PropTypes.array
};

export default Quality;
