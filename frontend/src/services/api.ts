import AxiosServices from "./https";

const BASE_URL = "http://localhost:5001/api";

const api = new AxiosServices(BASE_URL);

export default api;
