import axios from "axios";

class AxiosServices {
  axiosInstance: any;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });
  }

  async get(url: string) {
    const res = await this.axiosInstance.get(url);
    return res.data;
  }

  async post(url: string, payload: any) {
    const res = await this.axiosInstance.post(url, payload);
    return res.data;
  }

  async put(url: string, payload: any) {
    const res = await this.axiosInstance.put(url, payload);
    return res.data;
  }

  async patch(url: string, payload: any) {
    const res = await this.axiosInstance.patch(url, payload);
    return res.data;
  }

  async delete(url: string) {
    const res = await this.axiosInstance.delete(url);
    return res.data;
  }
}

export default AxiosServices;
