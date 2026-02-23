import api from "../config/api.config";

const useRefresh = async (func) => {
  try {
    const res = await func();
    return res.data
  } catch (error) {
    if (error.response.status == 401) {
      try {
        await api.get("/auth/refresh");
        useRefresh(func);
      } catch (error) {
        return null;
      }
    } else {
        return null
    }
  }
};

export default useRefresh;
