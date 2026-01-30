import axios, { AxiosInstance } from "axios";

class AxiosServices {
  axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
    });
  }

  async get<T>(url: string): Promise<T> {
    const res = await this.axiosInstance.get<T>(url);
    return res.data;
  }

  async post<T>(url: string, payload: any): Promise<T> {
    const res = await this.axiosInstance.post<T>(url, payload);
    return res.data;
  }

  async put<T>(url: string, payload: any): Promise<T> {
    const res = await this.axiosInstance.put<T>(url, payload);
    return res.data;
  }

  async patch<T>(url: string, payload: any): Promise<T> {
    const res = await this.axiosInstance.patch<T>(url, payload);
    return res.data;
  }

  async delete<T>(url: string): Promise<T> {
    const res = await this.axiosInstance.delete<T>(url);
    return res.data;
  }
}

export default AxiosServices;
