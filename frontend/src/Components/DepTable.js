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
import { Link } from "react-router-dom";

export default function DepTable(props) {
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
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Manager</TableCell>
            <TableCell align="center">Employees</TableCell>
          </TableRow>
        </TableHead>

        <TableBody sx={{ align: "center" }}>
          {props.deps.map((item, index) => (
            <TableRow key={index}>
              <TableCell align="center">
                <Link
                  to={"/mainPage/editdepartmentPage/" + item.Name}
                  style={{ color: "black", textDecoration: "underline" }}
                >
                  {" "}
                  {item.Name}
                </Link>
              </TableCell>
              <TableCell align="center">{props.getM(item.Manager)}</TableCell>
              <TableCell>
                <ul>
                  {props.check_emp(item.Name).map((item, index) => {
                    return (
                      <li key={index}>
                        <Link
                          to={
                            "/mainPage/editemployeePage/" +
                            props.get_emp_index(item._id)
                          }
                          style={{
                            color: "black",
                            textDecoration: "underline",
                          }}
                        >
                          {item.FirstName} {item.LastName}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
