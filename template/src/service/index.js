import axios from "axios";

export default {
  getList(data) {
    return axios.post("/api/table", data);
  },
};
