// import { AxiosError } from "axios";
import { http } from "@/api/axiosClient";
// import { handleError } from "@/function/common";

class BrandServices {
  async getListBrands() {
    try {
      // const loginParams = translateLoginParams(credential);
      const response = await http.get("client/get-list-brand");
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
  async getBrand(name) {
    try {
      // const loginParams = translateLoginParams(credential);
      const path = `client/get-brand/${name}`;
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

export default new BrandServices();
