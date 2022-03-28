/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import employeesUtils from "../Utils/employeesUtils";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Grid,
  TextField,
  Button,
  ButtonGroup,
} from "@mui/material";
import EditEmployeeShiftTable from "../Components/EditEmployeeShiftTable";
import EditEmployeeSelect from "../Components/EditEmployeeSelect";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

const EditEmployeePage = () => {
  let token = sessionStorage["token"];
  const storeData = useSelector((state) => state);
  const navigate = useNavigate();
  const params = useParams();
  const [employee, setEmployee] = useState({});
  const [updated, setUpdated] = useState(false);
  const [AllShifts, setAllShifts] = useState({});
  const [allocateBTN, setAllocateBTN] = useState(false);
  const [AllocateOptions, setAllocateOptions] = useState([]);
  const [shift_id, setShift_id] = useState("");

  useEffect(async () => {
    let all_db_data = storeData.db;
    let employee = all_db_data.employees[params.id];
    setEmployee(employee);
    setAllShifts(all_db_data.shifts);

    let Emp_Shift_ids;
    let options = [];
    if (all_db_data?.employees[params.id].hasOwnProperty("Shifts")) {
      Emp_Shift_ids = all_db_data.employees[params.id].Shifts.map((s) => s._id);

      for (let i = 0; i < all_db_data.shifts.length; i++) {
        if (!Emp_Shift_ids.includes(all_db_data.shifts[i]._id)) {
          options.push(all_db_data.shifts[i]);
        }
      }
    } else {
      options = all_db_data.shifts;
    }
    setAllocateOptions(options);
  }, []);

  useEffect(async () => {
    let resp = await axios.get("http://127.0.0.1:5000/getAllFactory");
    let all_db_data = resp.data;
    let employee = all_db_data.employees[params.id];
    setEmployee(employee);
    setAllShifts(all_db_data.shifts);

    let Emp_Shift_ids;
    let options = [];
    if (all_db_data.employees[params.id].hasOwnProperty("Shifts")) {
      Emp_Shift_ids = all_db_data.employees[params.id].Shifts.map((s) => s._id);

      for (let i = 0; i < all_db_data.shifts.length; i++) {
        if (!Emp_Shift_ids.includes(all_db_data.shifts[i]._id)) {
          options.push(all_db_data.shifts[i]);
        }
      }
    } else {
      options = all_db_data.shifts;
    }
    setAllocateOptions(options);
  }, [allocateBTN]);

  const UpdateUserData = async () => {
    console.log(employee);
    await employeesUtils.update_employee(token, employee._id, employee);
    setUpdated(!updated);
  };

  const DeleteUserData = async () => {
    await employeesUtils.delete_employee(token, employee._id);
    navigate("/mainPage/employeePage");
  };

  const alocate_shift_to_emp = async () => {
    await employeesUtils.add_shift_to_employee(token, employee._id, shift_id);
    setAllocateBTN(!allocateBTN);
  };

  return (
    <div>
      <Typography variant="h4" pb={2} color="primary.second">
        <b> Edit Employee Page</b>
      </Typography>
      <Grid>
        <form>
          <Typography>First name:</Typography>
          <TextField
            varient="outlined"
            required
            fullWidth
            value={employee.FirstName}
            onChange={(e) =>
              setEmployee({ ...employee, FirstName: e.target.value })
            }
          />
          <Typography>Last name:</Typography>
          <TextField
            varient="outlined"
            required
            fullWidth
            value={employee.LastName}
            onChange={(e) =>
              setEmployee({ ...employee, LastName: e.target.value })
            }
          />
          <Typography>Start work year:</Typography>
          <TextField
            varient="outlined"
            required
            fullWidth
            value={employee.StartWorkYear}
            onChange={(e) =>
              setEmployee({ ...employee, StartWorkYear: e.target.value })
            }
          />
          <Typography>Department: </Typography>
          {employee.hasOwnProperty("DepartmentId") &&
            employee.DepartmentId.map((item, index) => {
              return (
                <Button fullWidth key={index} variant="contained">
                  <Link
                    to={"/mainPage/editdepartmentPage/" + item.Name}
                    style={{
                      color: "white",
                      textDecoration: "underline",
                    }}
                  >
                    {item.Name}
                  </Link>
                </Button>
              );
            })}
          <Typography>Shifts: </Typography>
          <EditEmployeeShiftTable employee={employee} />
          <Typography>Select shift to allocate:</Typography>
          <EditEmployeeSelect
            AllocateOptions={AllocateOptions}
            setShift_id={setShift_id}
          />
        </form>
        <ButtonGroup fullWidth>
          <Button
            variant="contained"
            onClick={UpdateUserData}
            endIcon={<SendIcon />}
            sx={{ m: 1 }}
          >
            UPDATE
          </Button>
          <Button
            variant="contained"
            onClick={DeleteUserData}
            startIcon={<DeleteIcon />}
            sx={{ m: 1 }}
          >
            DELETE
          </Button>
          <Button
            variant="contained"
            onClick={alocate_shift_to_emp}
            sx={{ m: 1 }}
          >
            Allocate
          </Button>
        </ButtonGroup>
        <br />
        <br />
        {allocateBTN && <text>Allocated!</text>}
        {updated && <text>Updated!</text>}
      </Grid>
    </div>
  );
};

export default EditEmployeePage;
