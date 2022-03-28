import * as React from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

export default function EmployeeSelectDep(props) {
  const [depName, setDepName] = React.useState("");
  const handleChange = (event) => {
    setDepName(event.target.value);
    let e_dep = props.employee.DepartmentId;
    if (event.target.value != "") {
      if (e_dep.length > 0) {
        e_dep = [];
        e_dep.push(event.target.value);
        props.setEmployee({ ...props.employee, DepartmentId: e_dep });
      } else if (e_dep.length == 0) {
        e_dep.push(event.target.value);
        props.setEmployee({ ...props.employee, DepartmentId: e_dep });
      }
    }
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Choose Department</InputLabel>
        <Select
          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={depName}
          label="Choose Department"
          onChange={handleChange}
          error={props.error}
        >
          {props.deps.departments?.map((item, index) => {
            return (
              <MenuItem key={index} value={item}>
                {item.Name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
