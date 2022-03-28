import * as React from "react";
import {
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function EditEmployeeShiftTable(props) {
  return (
    <TableContainer elevation={0} component={Paper}>
      <Table border="1" fullwidth>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "primary.dark",
              "& th": {
                fontSize: "1.25rem",
                color: "#e3f2fd",
              },
            }}
            align="center"
          >
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Time</TableCell>
          </TableRow>
        </TableHead>

        <TableBody sx={{ align: "center" }}>
          {props.employee.hasOwnProperty("Shifts") &&
            props.employee.Shifts.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell align="center">Date: {item.Date}</TableCell>
                  <TableCell align="center">
                    Time: {item.StartingHour}-{item.EndingHour}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
