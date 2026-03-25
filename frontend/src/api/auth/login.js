import API from "../index";

export const login = (data) => {
  API.post("/login", data);
};
