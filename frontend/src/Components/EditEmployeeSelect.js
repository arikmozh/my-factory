import React from "react";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useState } from "react";

export default function EditEmployeeSelect(props) {
  const [shiftName, setShiftName] = useState("");

  const handleChange = (event) => {
    setShiftName(event.target.value);
    props.setShift_id(event.target.value);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-label">Choose Shift</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={shiftName}
          label="Choose Shift"
          onChange={handleChange}
          autoWidth
        >
          {props.AllocateOptions.map((item, index) => {
            return (
              <MenuItem key={index} value={item._id}>
                {item.Date} {item.StartingHour}-{item.EndingHour}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
