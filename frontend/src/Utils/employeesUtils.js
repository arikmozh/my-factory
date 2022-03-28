import axios from "axios";

const get_all_employees = async (token) => {
  let resp = await axios.get("http://127.0.0.1:5000/employees", {
    headers: { "x-access-token": token },
  });
  return resp.data;
};

const get_employee = async (token, employee_FirstName) => {
  let all_employees = await get_all_employees(token);
  let employee = all_employees.filter(
    (x) => x.FirstName === employee_FirstName
  );
  let e_id = employee[0]._id;
  let resp = await axios.get("http://127.0.0.1:5000/employees/" + e_id, {
    headers: { "x-access-token": token },
  });
  return resp.data;
};

const add_new_employee = async (token, obj) => {
  let resp = await axios.post("http://127.0.0.1:5000/employees", obj, {
    headers: { "x-access-token": token },
  });
  return resp.data;
};

const add_department_to_employee = async (token, e_id, dep_id) => {
  let resp = await axios.post(
    "http://127.0.0.1:5000/employees/department/" + e_id + "/" + dep_id,
    {},
    {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
    }
  );
  return resp.data;
};

const add_shift_to_employee = async (token, empId, shiftId) => {
  let resp = await axios.post(
    "http://127.0.0.1:5000/employees/" + empId + "/" + shiftId,
    {},
    {
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
    }
  );
  return resp.data;
};

const update_employee = async (token, employee_id, obj) => {
  let resp = await axios.put(
    "http://127.0.0.1:5000/employees/" + employee_id,
    obj,
    {
      headers: { "x-access-token": token, "Content-Type": "application/json" },
    }
  );
  return resp.data;
};

const delete_employee = async (token, id) => {
  let resp = await axios.delete("http://127.0.0.1:5000/employees/" + id, {
    headers: { "x-access-token": token },
  });
  return resp.data;
};

export default {
  get_all_employees,
  get_employee,
  add_new_employee,
  update_employee,
  add_shift_to_employee,
  add_department_to_employee,
  delete_employee,
};
