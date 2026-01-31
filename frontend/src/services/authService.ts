import api from "./api";

const authService = {
  login: async (credentials: any) => {
    return await api.post("/auth/login", credentials);
  },
  register: async (userData: any) => {
    return await api.post("/auth/register", userData);
  },
};

export default authService;
