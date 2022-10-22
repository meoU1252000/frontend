// import { AxiosError } from "axios";
import { http } from "@/api/axiosClient";
// import { handleError } from "@/function/common";

class CategoryServices {
  async getListCategories() {
    try {
      // const loginParams = translateLoginParams(credential);
      const response = await http.get("client/get-list-category");
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
  async getCategory(name) {
    try {
      // const loginParams = translateLoginParams(credential);
      const path = `client/get-category/${name}`;
      const response = await http.get(path);
      console.log(response);
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

export default new CategoryServices();
