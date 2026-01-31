import axios from "axios";

class AxiosServices {
  axiosInstance: any;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });

    this.axiosInstance.interceptors.request.use(
      (config: any) => {
        const stored = localStorage.getItem("libraff_user");
        if (stored) {
          const parsed = JSON.parse(stored);
          const token = parsed.accessToken || parsed.token;
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error: any) => Promise.reject(error),
    );

    this.axiosInstance.interceptors.response.use(
      (response: any) => response,
      async (error: any) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const stored = localStorage.getItem("libraff_user");
          if (stored) {
            const parsed = JSON.parse(stored);
            const refreshToken = parsed.refreshToken;

            if (refreshToken) {
              try {
                const res = await axios.post(`${baseURL}/auth/refresh`, {
                  token: refreshToken,
                });
                const { accessToken, refreshToken: newRefreshToken } = res.data;

                const updatedUser = {
                  ...parsed,
                  accessToken,
                  refreshToken: newRefreshToken,
                };
                localStorage.setItem(
                  "libraff_user",
                  JSON.stringify(updatedUser),
                );

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return this.axiosInstance(originalRequest);
              } catch (refreshError) {
                localStorage.removeItem("libraff_user");
                window.location.href = "/";
                return Promise.reject(refreshError);
              }
            } else {
              localStorage.removeItem("libraff_user");
              window.location.href = "/";
            }
          } else {
            window.location.href = "/";
          }
        }
        return Promise.reject(error);
      },
    );
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
