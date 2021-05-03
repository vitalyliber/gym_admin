import axios from "./axios";

export const authorize = (params) => {
  return axios({
    method: "post",
    url: "/admin/sessions",
    data: params,
  });
};
