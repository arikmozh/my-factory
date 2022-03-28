import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import employeesUtils from "../Utils/employeesUtils";

const ShiftAllocate = (props) => {
  let token = sessionStorage["token"];
  const [empNotInThisShift, setEmpNotInThisShift] = useState([]);
  const [selectedEmpToAdd, setSelectedEmpToAdd] = useState("");

  useEffect(() => {
    let options = [];
    let dontHaveShifts = props.employees.filter(
      (x) => !x.hasOwnProperty("Shifts")
    );
    dontHaveShifts.forEach((element) => {
      options.push({
        Name: element.FirstName + " " + element.LastName,
        EmpId: element._id,
      });
    });

    let haveShift = props.employees.filter((x) => x.hasOwnProperty("Shifts"));
    let a = haveShift.map((x) =>
      x.Shifts.filter((y) => y._id == props.shift._id)
    );

    a.forEach((element) => {
      if (element.length == 0) {
        let obj = haveShift[a.indexOf(element)];
        options.push({
          Name: obj.FirstName + " " + obj.LastName,
          EmpId: obj._id,
        });
      }
    });
    setEmpNotInThisShift(options);
  }, []);

  const handleChange = (e) => {
    setSelectedEmpToAdd(e.target.value);
    console.log("Employee Selected!!");
  };

  const allocateEmp = async () => {
    await employeesUtils.add_shift_to_employee(
      token,
      selectedEmpToAdd,
      props.shift._id
    );
  };

  return (
    <div>
      <Typography variant="body2" mt={1} mb={1} color="primary">
        <b>
          {" "}
          Allocate Employees to <br /> shift ID: {props.shift._id} <br />
          Date: {props.shift.Date} Time: {props.shift.StartingHour}-
          {props.shift.EndingHour}
        </b>
      </Typography>

      <select onChange={(e) => handleChange(e)} defaultValue="">
        <option value="" selected disabled hidden>
          Choose Employee
        </option>
        {empNotInThisShift.map((item, index) => {
          return (
            <option key={index} value={item.EmpId}>
              {item.Name}
            </option>
          );
        })}
      </select>
      <br />
      <br />
      <Button
        fullWidth
        sx={{ mb: 1 }}
        variant="contained"
        onClick={allocateEmp}
      >
        ALLOCATE EMP TO SHIFT
      </Button>
    </div>
  );
};

export default ShiftAllocate;
