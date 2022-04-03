import httpService from "./http.service";

const professionEndpiont = "profession/";

const professionService = {
  get: async () => {
    const { data } = await httpService.get(professionEndpiont);
    return data;
  }
};

export default professionService;
