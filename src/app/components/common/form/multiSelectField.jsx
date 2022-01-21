import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
  let optionsArray = [];
  if (!Array.isArray(options) && typeof options === "object") {
    optionsArray = Object.keys(options).map((optionName) => ({
      label: options[optionName].name,
      value: options[optionName]._id
    }));
  } else {
    optionsArray = options;
  }
  const handleChange = (value) => {
    onChange({ name: name, value });
  };
  return (
    <div className="mb-4 ">
      <label htmlFor="validationCustom04" className="form-label">
        {label}
      </label>
      <Select
        closeMenuOnSelect={false}
        defaultValue={defaultValue}
        isMulti
        options={optionsArray}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
      />
    </div>
  );
};
MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.array
};

export default MultiSelectField;
