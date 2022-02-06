import React, { useContext, useEffect, useState } from "react";
import qualityService from "../service/quality.service";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const QualitiesContext = React.createContext();

export const useQualities = () => {
  return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    getQualitiesList();
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  async function getQualitiesList() {
    try {
      const { content } = await qualityService.get();
      setQualities(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }
  function getQualities(id) {
    return id.map((q) => {
      for (const item of qualities) {
        if (q === item._id) {
          return (q = item);
        }
      }
      return q;
    });
  }
  return (
    <QualitiesContext.Provider value={{ qualities, isLoading, getQualities }}>
      {children}
    </QualitiesContext.Provider>
  );
  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }
};
QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
