import * as React from "react";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function BasicTimePicker({
  handleCustomSlotsInput,
  customInput,
}) {
  //   const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label="Custom slot"
        value={customInput}
        onChange={handleCustomSlotsInput}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
