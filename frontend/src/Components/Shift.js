import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import shiftsUtils from "../Utils/shiftsUtils";
import SendIcon from "@mui/icons-material/Send";

const ShiftComp = (props) => {
  let token = sessionStorage["token"];
  const [date, setDate] = useState(props.shift.Date);
  const [startH, setStartH] = useState(props.shift.StartingHour);
  const [endingH, setEndingH] = useState(props.shift.EndingHour);

  const update_shift = async () => {
    let obj = {};
    obj.Date = date;
    obj.StartingHour = startH;
    obj.EndingHour = endingH;
    obj._id = props.shift._id;
    await shiftsUtils.update_shift(token, props.shift._id, obj);
  };

  return (
    <div>
      <Typography variant="body2" mt={1} mb={1} color="primary">
        <b> shift ID: {props.shift._id}</b>
      </Typography>
      <TextField
        id="outlined-basic"
        placeholder="26/02/22"
        label="Date"
        type="date"
        variant="outlined"
        fullWidth
        value={date}
        onChange={(e) => setDate(e.target.value)}
        sx={{ mb: 1 }}
      />
      <br />
      <TextField
        id="outlined-basic"
        placeholder="09:00"
        label="Starting hour"
        variant="outlined"
        fullWidth
        type="time"
        value={startH}
        onChange={(e) => setStartH(e.target.value)}
        sx={{ mb: 1 }}
      />
      <br />
      <TextField
        id="outlined-basic"
        placeholder="19:00"
        label="Ending hour"
        variant="outlined"
        fullWidth
        type="time"
        value={endingH}
        onChange={(e) => setEndingH(e.target.value)}
        sx={{ mb: 1 }}
      />
      <br />
      <Button
        fullWidth
        sx={{ mb: 1 }}
        variant="contained"
        onClick={update_shift}
        endIcon={<SendIcon />}
      >
        UPDATE
      </Button>
    </div>
  );
};

export default ShiftComp;
