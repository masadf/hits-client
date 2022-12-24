import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8080"
});

instance.interceptors.request.use((req) => {
  // @ts-ignore
  req.headers['Authorization'] = localStorage.getItem("token");
  return req;
})


instance.interceptors.response.use((config) => {
    return config;
  },
  async (error) => {
    const previousRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      previousRequest._isRetry = true;
      let response;
      try {
        response = await instance.post("/refresh", {}, {withCredentials: true});
      } catch (e) {
        throw error;
      }
      localStorage.setItem("token", response.data.token);
      return await instance.request(previousRequest);
    }
    throw error;
  })


export default instance;
