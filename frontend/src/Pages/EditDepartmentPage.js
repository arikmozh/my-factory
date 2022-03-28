import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import departmentUtils from "../Utils/departmentUtils";
import employeesUtils from "../Utils/employeesUtils";
import {
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  ButtonGroup,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

const EditDepartmentPage = () => {
  const storeData = useSelector((state) => state);
  let token = sessionStorage["token"];
  const params = useParams();
  const [dep, setDep] = useState({});
  const [emp, setEmp] = useState([]);
  const [empNotInDep, setEmpNotInDep] = useState([]);
  const [depNameError, setDepNameError] = useState(false);
  const [e_id_toAdd, setE_id_toAdd] = useState("");

  useEffect(() => {
    let all_db_data = storeData.db;

    let d = all_db_data.departments.filter((x) => x.Name == params.dName);
    if (d.length > 0) {
      setDep(d[0]);
    }

    let e = all_db_data.employees;
    setEmp(e);

    let employeesNotInThisDep = [];

    let A = e.map((x) => x.hasOwnProperty("DepartmentId"));
    for (let i = 0; i < A.length; i++) {
      if (A[i] === true) {
        for (let j = 0; j < e[i].DepartmentId.length; j++) {
          if (e[i].DepartmentId[j].Name !== d[0].Name) {
            employeesNotInThisDep.push(e[i]);
          }
        }
      } else {
        employeesNotInThisDep.push(e[i]);
      }
    }
    setEmpNotInDep(employeesNotInThisDep);
    console.log(employeesNotInThisDep);

    console.log(e);
    console.log(d[0]);
  }, []);

  const handleChange = (e) => {
    setDep({ ...dep, Manager: e.target.value });
  };
  const handleChange2 = (e) => {
    setE_id_toAdd(e.target.value);
  };

  const DeleteDep = async () => {
    await departmentUtils.delete_department(dep._id, token);
  };
  const UpdateDep = async () => {
    await departmentUtils.update_department(token, dep._id, dep);
  };
  const allocateEmp = async () => {
    await employeesUtils.add_department_to_employee(token, e_id_toAdd, dep._id);
  };

  return (
    <div>
      <Typography variant="h4" pb={2} color="primary.second">
        <b> Edit Department</b>
      </Typography>
      <TextField
        type="text"
        id="outlined-basic"
        variant="outlined"
        fullWidth
        label="Department name"
        value={dep.Name}
        required
        onChange={(e) => setDep({ ...dep, Name: e.target.value })}
        sx={{ mb: 3 }}
        error={depNameError}
      />{" "}
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-label">Choose Manager</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Choose Manager"
          onChange={handleChange}
          fullWidth
        >
          {emp?.map((item, index) => {
            if (item._id == dep.Manager) {
              return (
                <MenuItem key={index} value={item._id} selected>
                  {item.FirstName} {item.LastName}
                </MenuItem>
              );
            } else {
              return (
                <MenuItem key={index} value={item._id}>
                  {item.FirstName} {item.LastName}
                </MenuItem>
              );
            }
          })}
        </Select>
      </FormControl>
      <br />
      <InputLabel id="demo-simple-select-label" sx={{ mt: 1 }}>
        Allocate selected Employee
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Choose Manager"
        onChange={handleChange2}
        fullWidth
      >
        {empNotInDep.map((item, index) => {
          return (
            <MenuItem key={index} value={item._id}>
              {item.FirstName} {item.LastName}
            </MenuItem>
          );
        })}
      </Select>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={UpdateDep}
          endIcon={<SendIcon />}
          sx={{ m: 1 }}
        >
          UPDATE
        </Button>
        <Button
          variant="contained"
          onClick={DeleteDep}
          startIcon={<DeleteIcon />}
          sx={{ m: 1 }}
        >
          DELETE
        </Button>
        <Button variant="contained" onClick={allocateEmp} sx={{ m: 1 }}>
          Allocate
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default EditDepartmentPage;
