import axios, { AxiosInstance } from "axios";

class AxiosServices {
  axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 5000,
    });
  }

  async getData(url: string): Promise<any> {
    const res = await this.axiosInstance.get(url);
    return res.data;
  }

  async PostData(url: string, payload: any): Promise<any> {
    const res = await this.axiosInstance.post(url, payload);
    return res.data;
  }
}
export default AxiosServices;
