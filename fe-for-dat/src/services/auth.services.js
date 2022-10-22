import { http } from "@/api/axiosClient";

class AuthService {
  async login(credential) {
    try {
      // const loginParams = translateLoginParams(credential);
      const response = await http.post("auth/login", credential);
      if (response.data.data) {
        //   sessionStorage.setItem("user", JSON.stringify(user));
        return response.data.data;
      } else {
        throw new Error("Wrong credential");
      }
    } catch (error) {
      console.log("error");
      
    }
  }
}

export default new AuthService();
