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
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function EmployeeTable(props) {
  const storeData = useSelector((state) => state);

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
            <TableCell align="center">index</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Starting Date</TableCell>
            <TableCell align="center">Departments</TableCell>
            <TableCell align="center">Shifts</TableCell>
          </TableRow>
        </TableHead>

        <TableBody sx={{ align: "center" }}>
          {props.check
            ? props.filtered.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index}</TableCell>
                  <TableCell align="center">
                    <Link
                      to={"/mainPage/editemployeePage/" + index}
                      style={{ color: "black", textDecoration: "underline" }}
                    >
                      {" "}
                      {item.FirstName} {item.LastName}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{item.StartWorkYear}</TableCell>
                  <TableCell align="center">
                    {item.hasOwnProperty("DepartmentId") &&
                      item.DepartmentId.map((item2, index2) => {
                        return (
                          <Link
                            style={{
                              color: "black",
                              textDecoration: "underline",
                            }}
                            key={index2}
                            to={"/mainPage/editdepartmentPage/" + item2.Name}
                            style={{
                              color: "black",
                              textDecoration: "underline",
                            }}
                          >
                            {item2.Name}
                          </Link>
                        );
                      })}
                  </TableCell>
                  <TableCell align="auto">
                    <ul>
                      {item.hasOwnProperty("Shifts") &&
                        item.Shifts.map((item1, index) => {
                          return (
                            <li key={index}>
                              Date: {item1.Date} <br />
                              Time: {item1.StartingHour} - {item1.EndingHour}
                            </li>
                          );
                        })}
                    </ul>
                  </TableCell>
                </TableRow>
              ))
            : storeData.db.employees.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index}</TableCell>
                  <TableCell align="center">
                    <Link
                      to={"/mainPage/editemployeePage/" + index}
                      style={{ color: "black", textDecoration: "underline" }}
                    >
                      {" "}
                      {item.FirstName} {item.LastName}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{item.StartWorkYear}</TableCell>
                  <TableCell align="center">
                    {item.hasOwnProperty("DepartmentId") &&
                      item.DepartmentId.map((item2, index2) => {
                        return (
                          <Link
                            key={index2}
                            to={"/mainPage/editdepartmentPage/" + item2.Name}
                            style={{
                              color: "black",
                              textDecoration: "underline",
                            }}
                          >
                            {item2.Name}
                          </Link>
                        );
                      })}
                  </TableCell>
                  <TableCell align="auto">
                    <ul>
                      {item.hasOwnProperty("Shifts") &&
                        item.Shifts.map((item1, index) => {
                          return (
                            <li key={index}>
                              Date: {item1.Date} <br />
                              Time: {item1.StartingHour} - {item1.EndingHour}
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
