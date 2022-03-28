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

export default function UsersTable(props) {
  return (
    <TableContainer
      elevation={0}
      component={Paper}
      sx={{
        align: "center",
      }}
    >
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
            <TableCell align="center">Username</TableCell>
            <TableCell align="center">Max actions allowed</TableCell>
            <TableCell align="center">Actions allowed today</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ align: "center" }}>
          {props.users.map((item, index) => (
            <TableRow key={index}>
              <TableCell align="center">{item.FullName}</TableCell>
              <TableCell align="center">{item.MaxActions}</TableCell>
              <TableCell align="center">{item.actionAllowed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
