// import { axios } from "axios";
import { http } from "@/api/axiosClient";
// import { handleError } from "@/function/common";

class searchService {
  async getListProducts(search) {
    try {
      // const loginParams = translateLoginParams(credential);
      const response = await http.get("client/search", {
        params: { search: search },
      });
      // console.log(response);
      if (response.data.data) {
        return response.data.data;
      } else {
        throw new Error("Don't get");
      }
    } catch (error) {
      //   throw handleError(error as AxiosError);
    }
  }
}

export default new searchService();
