import React, { useState, useEffect } from "react";
import api from "../../api";
import PropTypes from "prop-types";
import Loading from "../ui/loading";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { useHistory } from "react-router-dom";

const UserPageChange = ({ userId }) => {
  const history = useHistory();
  const [item, setItem] = useState("");
  const [profession, setProfession] = useState();
  const [qualities, setQualities] = useState();

  useEffect(() => {
    api.professions.fetchAll().then((p) => setProfession(p));
    api.users.getById(userId).then((user) => setItem(user));
    api.qualities.fetchAll().then((q) => setQualities(q));
  }, []);
  const getProfessionName = (id) => {
    let professionName = "";
    Object.keys(profession).filter((p) =>
      profession[p]._id === id ? (professionName = profession[p].name) : ""
    );
    return professionName;
  };
  const getQualitiesName = (id) => {
    const qualitieName = [];
    id.map((qual) =>
      Object.keys(qualities).filter((q) =>
        qualities[q]._id === qual.value ? qualitieName.push(qualities[q]) : ""
      )
    );
    return qualitieName;
  };
  const handleChange = (target) => {
    if (target.name === "profession") {
      setItem((prevState) => ({
        ...prevState,
        profession: { _id: target.value, name: getProfessionName(target.value) }
      }));
    } else if (target.name === "qualities") {
      setItem((prevState) => ({
        ...prevState,
        qualities: getQualitiesName(target.value)
      }));
    } else {
      setItem((prevState) => ({ ...prevState, [target.name]: target.value }));
    }
  };
  const handleUpdatePageUsers = (userId) => {
    history.push(`/users/${userId}`);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    api.users.update(userId, item);
    getQualitiesName(item.qualities);
    handleUpdatePageUsers(userId);
  };
  const qualitiesList = (qualities) => {
    let qualitiesArray = [];
    if (!Array.isArray(qualities) && typeof qualities === "object") {
      qualitiesArray = Object.keys(qualities).map((qualitieName) => ({
        label: qualities[qualitieName].name,
        value: qualities[qualitieName]._id
      }));
    } else {
      qualitiesArray = qualities.map((qualitie) => ({
        label: qualitie.name,
        value: qualitie._id
      }));
    }
    return qualitiesArray;
  };
  if (item && profession) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                onChange={handleChange}
                value={item.name}
              />
              <TextField
                label="Электронная почта"
                onChange={handleChange}
                name="email"
                value={item.email}
              />
              <SelectField
                label="Выберите вашу профессию"
                value={item.profession._id}
                defaultOption={item.profession.name}
                name="profession"
                options={profession}
                onChange={handleChange}
              />
              <RadioField
                options={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                  { name: "Other", value: "other" }
                ]}
                value={item.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
              />
              <MultiSelectField
                label="Выберите ваши качества"
                defaultValue={qualitiesList(item.qualities)}
                name="qualities"
                options={qualities}
                onChange={handleChange}
              />
              <button className="btn btn-primary w-100 mx-auto">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
};
UserPageChange.propTypes = {
  userId: PropTypes.string
};

export default UserPageChange;
