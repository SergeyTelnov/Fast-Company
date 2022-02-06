import axios from "axios";
import { toast } from "react-toastify";
import config from "../config.json";

axios.defaults.baseURL = config.apiEndPoint;

axios.interceptors.response.use(
  (res) => res,
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      console.log(error);
      toast.error("An error occurred please try again later");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  put: axios.put,
  post: axios.post,
  get: axios.get,
  delete: axios.delete
};

export default httpService;
