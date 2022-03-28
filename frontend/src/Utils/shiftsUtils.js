import axios from "axios";

const get_all_shifts = async (token) => {
  let resp = await axios.get("http://127.0.0.1:5000/shifts", {
    headers: { "x-access-token": token },
  });
  return resp.data;
};

const get_shift = async (token, id) => {
  let resp = await axios.get("http://127.0.0.1:5000/shifts" + id, {
    headers: { "x-access-token": token },
  });
  return resp.data;
};

const add_shift = async (token, obj) => {
  let resp = await axios.post("http://127.0.0.1:5000/shifts", obj, {
    headers: { "x-access-token": token },
  });
  return resp.data;
};

const update_shift = async (token, id, obj) => {
  let resp = await axios.put("http://127.0.0.1:5000/shifts/" + id, obj, {
    headers: { "x-access-token": token, "Content-Type": "application/json" },
  });
  return resp.data;
};

const delete_shift = async (token, id) => {
  let resp = await axios.delete("http://127.0.0.1:5000/shifts/" + id, {
    headers: { "x-access-token": token },
  });
  return resp.data;
};

export default {
  get_all_shifts,
  get_shift,
  add_shift,
  update_shift,
  delete_shift,
};
