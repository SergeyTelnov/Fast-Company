import httpService from "./http.service";

const userEndpiont = "user/";

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpiont);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(userEndpiont + payload._id, payload);
    return data;
  }
};

export default userService;
