import * as React from "react";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";

import { useSelector } from "react-redux";

export default function EmployeeSelect(props) {
  const [depName, setDepName] = React.useState("");
  const storeData = useSelector((state) => state);

  const handleChange = (event) => {
    setDepName(event.target.value);
    props.setDepChosen(event.target.value);
    props.setCheck(true);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-label">Choose Department</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={depName}
          label="Choose Department"
          onChange={handleChange}
          // autoWidthful
        >
          {storeData.db.departments?.map((item, index) => {
            return (
              <MenuItem key={index} value={item.Name}>
                {item.Name}
              </MenuItem>
            );
          })}
          <MenuItem value="Cancel">Cancel filter</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
