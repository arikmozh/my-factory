/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useState } from "react";
import departmentUtils from "../Utils/departmentUtils";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const NewDepartmentPage = () => {
  const storeData = useSelector((state) => state);
  let token = sessionStorage["token"];
  const navigate = useNavigate();
  const [newDep, setNewDep] = useState({ Name: "", Manager: "" });
  const [emps, setEmps] = useState([]);
  const [newDepError, setNewDepError] = useState(false);

  useEffect(async () => {
    let all_db_data = storeData.db;
    let emp = all_db_data.employees;
    setEmps(emp);
  }, []);

  const handleChange = (e) => {
    setNewDep({ ...newDep, Manager: e.target.value });
    console.log(newDep);
  };

  const save = async (e) => {
    e.preventDefault();

    setNewDepError(false);
    if (newDep.Name === "") {
      setNewDepError(true);
    } else {
      setNewDepError(false);
    }
    if (newDep.Name) {
      await departmentUtils.add_department(token, newDep);
    }
  };

  return (
    <div>
      <Typography variant="h4" pb={2} color="primary.second">
        <b> New Department Page</b>
      </Typography>{" "}
      <form noValidate autoComplete="off" onSubmit={save}>
        <TextField
          id="outlined-basic"
          label="Department name"
          required
          fullWidth
          sx={{ my: 3 }}
          error={newDepError}
          onChange={(e) => setNewDep({ ...newDep, Name: e.target.value })}
        />
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-label">Choose Manager</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newDep.Manager}
            label="Choose Manager"
            onChange={handleChange}
            fullWidth
          >
            {storeData.db?.employees?.map((item, index) => {
              return (
                <MenuItem key={index} value={item._id}>
                  {item.FirstName} {item.LastName}{" "}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button type="submit" fullWidth sx={{ my: 3 }} variant="contained">
          Submit
        </Button>
        <Button
          onClick={() => navigate("/mainPage/departmentsPage")}
          fullWidth
          variant="contained"
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default NewDepartmentPage;
