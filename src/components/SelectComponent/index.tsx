import React from "react";
import { MenuItem, Select } from "@material-ui/core";

export default function SelectComponent(props: any) {
  return (
    <Select {...props}>
      {props.data.map((item: any, index: number) => (
        <MenuItem
          value={props.keys ? item[props.keys.value] : item}
          key={index}
        >
          {props.keys ? item[props.keys.text] : item}
        </MenuItem>
      ))}
    </Select>
  );
}
