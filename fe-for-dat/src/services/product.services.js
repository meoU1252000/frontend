// import { AxiosError } from "axios";
import { http } from "@/api/axiosClient";
// import { handleError } from "@/function/common";

class ProductServices {
  async getListProducts() {
    try {
      // const loginParams = translateLoginParams(credential);
      const response = await http.get("client/get-list-product");
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

export default new ProductServices();
