import httpService from "./http.service";

const userEndpiont = "user/";

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpiont);
    return data;
  }
};

export default userService;
