import React from "react";
import { FormControlLabel, Switch } from "@material-ui/core";

interface SwitchComponentProps {
  checked: boolean;
  handleChange: Function;
  label?: string | boolean;
}

export default function SwitchComponent({
  checked = false,
  handleChange,
  label,
}: SwitchComponentProps) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={handleChange}
          name="checkedB"
          color="primary"
        />
      }
      label={label}
    />
  );
}
