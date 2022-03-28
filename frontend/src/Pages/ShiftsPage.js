/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  ButtonGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import shiftsUtils from "../Utils/shiftsUtils";
import ShiftAllocate from "../Components/ShiftAllocate";
import ShiftComp from "../Components/Shift";
import "react-datepicker/dist/react-datepicker.css";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ShiftsPage = () => {
  let token = sessionStorage["token"];
  const storeData = useSelector((state) => state);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("2022-01-01");
  const [startHour_new, setStartHour_new] = useState("09:00");
  const [endingHour_new, setEndingHour_new] = useState("17:00");
  const [added, setAdded] = useState(false);
  const [updateShift, setUpdateShift] = useState(false);
  const [allocateShift, setAllocateShift] = useState(false);

  useEffect(async () => {
    let resp = await axios.get("http://127.0.0.1:5000/getAllFactory");
    dispatch({ type: "LOAD", payload: resp.data });
  }, [added, allocateShift]);

  const add_shift = async () => {
    let obj = {};
    let date = startDate;
    obj.Date = date;
    obj.StartingHour = startHour_new;
    obj.EndingHour = endingHour_new;
    console.log(obj);
    await shiftsUtils.add_shift(token, obj);
    setAdded(!added);
  };

  return (
    <div>
      <Typography variant="h4" pb={2} color="primary.second">
        <b> Shifts Page</b>
      </Typography>
      <div>
        <Typography variant="h6" pb={1} color="primary.second">
          <b> Add new shift</b>
        </Typography>{" "}
        <div>
          <TextField
            id="outlined-basic"
            label="Date"
            type="Date"
            variant="outlined"
            fullWidth
            required
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            sx={{ mb: 1 }}
          />
        </div>
        <TextField
          id="outlined-basic"
          label="Starting Hour"
          variant="outlined"
          fullWidth
          type="time"
          value={startHour_new}
          required
          onChange={(e) => setStartHour_new(e.target.value)}
          sx={{ my: 1 }}
        />
        <TextField
          id="outlined-basic"
          label="Ending Hour"
          variant="outlined"
          fullWidth
          type="time"
          value={endingHour_new}
          required
          onChange={(e) => setEndingHour_new(e.target.value)}
          sx={{ my: 1 }}
        />
        <Button
          fullWidth
          sx={{ mb: 1 }}
          variant="contained"
          onClick={add_shift}
        >
          Add shift
        </Button>
      </div>
      <div>
        <ButtonGroup fullWidth>
          <Button
            fullWidth
            sx={{ mr: 1 }}
            variant="contained"
            onClick={() => setUpdateShift(!updateShift)}
          >
            Update shift
          </Button>
          <Button
            fullWidth
            sx={{ ml: 1 }}
            variant="contained"
            onClick={() => setAllocateShift(!allocateShift)}
          >
            Allocate employees to shift
          </Button>
        </ButtonGroup>
      </div>
      {allocateShift && (
        <div>
          <Grid container spacing={2}>
            {storeData.db.shifts.map((item, index) => {
              return (
                <Grid
                  item
                  xs={12}
                  md={4}
                  sm={6}
                  xl={3}
                  key={index}
                  sx={{ mt: 2 }}
                >
                  <Item>
                    <ShiftAllocate
                      shift={item}
                      employees={storeData.db.employees}
                    />
                  </Item>
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
      {updateShift && (
        <div>
          <Grid container spacing={2}>
            {storeData.db.shifts.map((item, index) => {
              return (
                <Grid
                  item
                  xs={12}
                  md={4}
                  sm={6}
                  xl={3}
                  key={index}
                  sx={{ mt: 2 }}
                >
                  <Item>
                    <ShiftComp
                      shift={item}
                      employees={storeData.db.employees}
                    />
                  </Item>
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default ShiftsPage;
