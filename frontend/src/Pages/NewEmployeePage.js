import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import employeesUtils from "../Utils/employeesUtils";
import EmployeeSelectDep from "../Components/EmployeeSelectDep";
import { Typography, TextField, Button, Grid } from "@mui/material";

const NewEmployeePage = () => {
  const storeData = useSelector((state) => state);
  const navigate = useNavigate();
  const token = sessionStorage["token"];
  const [db, setDb] = useState({});
  const [hasError, setHasError] = useState(false);

  const [employee, setEmployee] = useState({
    FirstName: "",
    LastName: "",
    StartWorkYear: 0,
    DepartmentId: [],
  });

  const [FirstNameError, setFirstNameError] = useState(false);
  const [LastNameError, setLastNameError] = useState(false);
  const [StartWorkYearError, setStartWorkYearError] = useState(false);
  const [DepartmentIdError, setDepartmentIdError] = useState(false);

  useEffect(() => {
    async function fetchdata() {
      setDb(storeData.db);
    }
    fetchdata();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFirstNameError(false);
    setLastNameError(false);
    setStartWorkYearError(false);
    setDepartmentIdError(false);
    setHasError(false);

    if (employee.FirstName === "") {
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }

    if (employee.LastName === "") {
      setLastNameError(true);
    } else {
      setLastNameError(false);
    }
    if (employee.StartWorkYear === 0) {
      setStartWorkYearError(true);
    }
    if (employee.DepartmentId.length === 0) {
      setDepartmentIdError(false);
      setHasError(true);
    }
    if (
      employee.FirstName &&
      employee.LastName &&
      employee.StartWorkYear &&
      employee.DepartmentId
    ) {
      console.log(
        employee.FirstName,
        employee.LastName,
        employee.StartWorkYear,
        employee.DepartmentId
      );
      await employeesUtils.add_new_employee(token, employee);
      navigate("/mainPage/employeePage");
    }
  };

  return (
    <Grid container direction="column">
      <Typography variant="h4" pb={2} color="primary.second">
        <b> New Employee Page</b>
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="First name"
          variant="outlined"
          required
          fullWidth
          error={FirstNameError}
          onChange={(e) =>
            setEmployee({ ...employee, FirstName: e.target.value })
          }
          sx={{ mb: 3 }}
        />{" "}
        <br />
        <TextField
          id="outlined-basic"
          label="Last name"
          variant="outlined"
          fullWidth
          required
          onChange={(e) =>
            setEmployee({ ...employee, LastName: e.target.value })
          }
          sx={{ mb: 3 }}
          error={LastNameError}
        />{" "}
        <br />
        <TextField
          id="standard-number"
          label="Start working year"
          type="number"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          required
          variant="outlined"
          onChange={(e) =>
            setEmployee({ ...employee, StartWorkYear: e.target.value })
          }
          error={StartWorkYearError}
          sx={{ mb: 3 }}
        />
        <br />
        {hasError && <Typography color="error">This is required!</Typography>}
        <EmployeeSelectDep
          deps={db}
          setEmployee={setEmployee}
          employee={employee}
          error={DepartmentIdError}
        />
        <Button type="submit" fullWidth sx={{ my: 3 }} variant="contained">
          Submit
        </Button>
      </form>
    </Grid>
  );
};

export default NewEmployeePage;
