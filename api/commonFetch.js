import axios from "./axios";

export const commonFetch = (url) => {
  return axios({
    method: "get",
    url,
  });
};
