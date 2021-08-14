import React from "react";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";

export default function RadioComponent(props: any) {
  return (
    <RadioGroup {...props}>
      {props.data.map((item: any) => (
        <FormControlLabel
          value={props.keys ? item[props.keys.value] : item}
          control={<Radio />}
          label={props.keys ? item[props.keys.text] : item}
        />
      ))}
    </RadioGroup>
  );
}
