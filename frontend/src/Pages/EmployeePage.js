import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Button } from "@mui/material";
import EmployeeSelect from "../Components/EmployeeSelect";
import EmployeeTable from "../Components/EmployeeTable";

const EmployeePage = () => {
  const storeData = useSelector((state) => state);
  const navigate = useNavigate();
  const [filtered, setFiltered] = useState([]);
  const [depChosenFilter, setDepChosenFilter] = useState("");
  const [check, setCheck] = useState(false);

  useEffect(() => {
    let arr = storeData.db.employees;
    let newArr = [];
    if (check === true) {
      if (depChosenFilter !== "Cancel") {
        arr.forEach((element) => {
          if (element.hasOwnProperty("DepartmentId")) {
            element.DepartmentId.forEach((item) => {
              if (item.Name === depChosenFilter) {
                newArr.push(element);
              }
            });
          }
        });
        setFiltered(newArr);
      } else {
        setFiltered(arr);
      }
    } else {
      setFiltered(arr);
    }
  }, [depChosenFilter]);

  return (
    <div>
      <Typography variant="h4" pb={2} color="primary.second">
        <b> Employees Page</b>
      </Typography>
      <EmployeeSelect setDepChosen={setDepChosenFilter} setCheck={setCheck} />
      <EmployeeTable
        check={check}
        filtered={filtered}
        depChosen={depChosenFilter}
      />
      <Button
        variant="contained"
        sx={{ my: 3 }}
        onClick={() => navigate("/mainPage/newemployeePage")}
        fullWidth
      >
        Add new employee
      </Button>
    </div>
  );
};

export default EmployeePage;
