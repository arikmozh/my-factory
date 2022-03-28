import axios from "axios";

const login = async (userAccount) => {
  let resp = await axios.post("http://127.0.0.1:5000/auth/login", userAccount, {
    headers: { "Content-Type": "application/json" },
  });
  return resp.data;
};

const get_user_fullname = async (username, token) => {
  let resp = await axios.get("http://127.0.0.1:5000/users/" + username, {
    headers: { "x-access-token": token },
  });
  return resp.data;
};

export default { login, get_user_fullname };
