import api from "../config/api.config";

const useRefresh = async (path, method = null, data = null) => {
  try {
    if (method == "get") {
      const res = await api.get(path);
      return res.data;
    } else if (method == "post") {
      const res = await api.post(path, data);
      return res.data;
    } else if (method == "put") {
      const res = await api.put(path, data);
      return res.data;
    }
    const res = await api.delete(path);
    return res.data;
  } catch (error) {
    if (error?.response?.data?.message == "token missed") {
      try {
        await api.get("/auth/refresh");
        useRefresh(path, method, data);
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    } else {
      throw new Error(error.response.data.message);
    }
  }
};

export default useRefresh;
