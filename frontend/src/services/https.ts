import axios, { AxiosInstance } from "axios";

class AxiosServices {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 5000,
    });
  }

  async getAllData(url: string) {
    try {
      const res = await this.axiosInstance.get(url);
      return res.data;
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
      throw error;
    }
  }
}
export default AxiosServices;
