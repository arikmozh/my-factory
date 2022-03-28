import axios from "axios";

const get_all_departments = async (token) => {
  let resp = await axios.get("http://127.0.0.1:5000/departments", {
    headers: { "x-access-token": token },
  });
  return resp.data;
};

const get_department = async (token, id) => {
  let resp = await axios.get("http://127.0.0.1:5000/departments" + id, {
    headers: { "x-access-token": token },
  });
  return resp.data;
};

const add_department = async (token, obj) => {
  let resp = await axios.post("http://127.0.0.1:5000/departments", obj, {
    headers: { "x-access-token": token, "Content-Type": "application/json" },
  });
  return resp.data;
};

const update_department = async (token, id, obj) => {
  let resp = await axios.put("http://127.0.0.1:5000/departments/" + id, obj, {
    headers: { "x-access-token": token, "Content-Type": "application/json" },
  });
  return resp.data;
};

const delete_department = async (id, token) => {
  let resp = await axios.delete("http://127.0.0.1:5000/departments" + id, {
    headers: { "x-access-token": token },
  });
  return resp.data;
};

export default {
  get_all_departments,
  get_department,
  add_department,
  update_department,
  delete_department,
};
