/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import DepTable from "../Components/DepTable";

const DepartmentPage = () => {
  const storeData = useSelector((state) => state);
  const navigate = useNavigate();
  const [deps, setDeps] = useState([]);
  const [emps, setEmps] = useState([]);

  const check_emp = (dep_Name) => {
    let employeesInThisDep = [];
    let A = emps.map((x) => x.hasOwnProperty("DepartmentId"));
    for (let i = 0; i < A.length; i++) {
      if (A[i] === true) {
        for (let j = 0; j < emps[i].DepartmentId.length; j++) {
          if (emps[i].DepartmentId[j].Name === dep_Name) {
            employeesInThisDep.push(emps[i]);
          }
        }
      }
    }
    return employeesInThisDep;
  };
  const get_manager_name = (m_id) => {
    let m = emps.filter((x) => x._id === m_id);
    if (m.length > 0) {
      return m[0].FirstName + " " + m[0].LastName;
    }
  };

  const get_emp_index = (emp_id) => {
    for (let i = 0; i < emps.length; i++) {
      if (emps[i]._id === emp_id) {
        return i;
      }
    }
  };

  useEffect(async () => {
    let all_db_data = storeData.db;
    let deps = all_db_data.departments;
    let emp = all_db_data.employees;
    setDeps(deps);
    setEmps(emp);
  }, []);

  return (
    <div>
      {" "}
      <Grid container direction="column">
        <Typography variant="h4" pb={2} color="primary.second">
          <b> Departments Page</b>
        </Typography>
        <br />
        <DepTable
          deps={deps}
          getM={get_manager_name}
          check_emp={check_emp}
          get_emp_index={get_emp_index}
        />
        <Button
          variant="contained"
          sx={{ my: 3 }}
          onClick={() => navigate("/mainPage/newdepartmentPage")}
        >
          New Department
        </Button>
      </Grid>
    </div>
  );
};

export default DepartmentPage;
