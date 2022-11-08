import { http } from "@/api/axiosClient";

class AuthService {
  async login(credential) {
    try {
      // const loginParams = translateLoginParams(credential);
      const response = await http.post("client/login", credential);
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
  async register(newCustomer) {
    try {
      const response = await http.post("client/register", newCustomer);
      if (response.data.data) {
        return response.data.data;
      } else {
        throw new Error("Wrong credential");
      }
    } catch (error) {
      console.log("error");
    }
  }
  async logout(credential) {
    try {
      const response = await http.post("client/logout", credential, {
        headers: {
          Authorization: `Bearer ${credential}`,
        },
      });
      if (response.data.data) {
        return response.data.data;
      } else {
        throw new Error("Wrong credential");
      }
    } catch (error) {
      console.log("error");
    }
  }
  async getListAddress(credential) {
    try {
      const response = await http.post("client/address", credential, {
        headers: {
          Authorization: `Bearer ${credential}`,
        },
      });
      console.log(credential);
      if (response.data.data) {
        return response.data.data;
      } else {
        throw new Error("Wrong credential");
      }
    } catch (error) {
      console.log("error");
    }
  }
  async getListCity() {
    try {
      const response = await http.get("client/get-list-city");
      if (response.data.data) {
        return response.data.data;
      } else {
        throw new Error("error");
      }
    } catch (error) {
      console.log("error");
    }
  }
  async createAddress(newAddress) {
    try {
      const response = await http.post("client/createAddress", newAddress, {
        headers: {
          Authorization: `Bearer ${newAddress.token}`,
        },
      });
      if (response.data.data) {
        return response.data.data;
      } else {
        throw new Error("Wrong credential");
      }
    } catch (error) {
      console.log("error");
    }
  }
  async updateAddress(address) {
    try {
      const response = await http.post("client/updateAddress", address, {
        headers: {
          Authorization: `Bearer ${address.token}`,
        },
      });
      if (response.data.data) {
        return response.data.data;
      } else {
        throw new Error("Wrong credential");
      }
    } catch (error) {
      console.log("error");
    }
  }
  async deleteAddress(address) {
    try {
      const response = await http.post("client/deleteAddress", address, {
        headers: {
          Authorization: `Bearer ${address.token}`,
        },
      });
      if (response.data.data) {
        return response.data.data;
      } else {
        throw new Error("Wrong credential");
      }
    } catch (error) {
      console.log("error");
    }
  }
  async createOrder(newOrder) {
    try {
      const response = await http.post("client/createOrder", newOrder, {
        headers: {
          Authorization: `Bearer ${newOrder.token}`,
        },
      });
      if (response.data.data) {
        return response.data.data;
      } else {
        throw new Error("Wrong credential");
      }
    } catch (error) {
      console.log("error");
    }
  }
  async getListOrder(credential) {
    try {
      const response = await http.post("client/get-list-order", credential, {
        headers: {
          Authorization: `Bearer ${credential}`,
        },
      });
      if (response.data.data) {
        return response.data.data;
      } else {
        throw new Error("Wrong credential");
      }
    } catch (error) {
      console.log("error");
    }
  }

  async cancelOrder(order) {
    try {
      const response = await http.post("client/cancel-order", order, {
        headers: {
          Authorization: `Bearer ${order.token}`,
        },
      });
      if (response.data.data) {
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
