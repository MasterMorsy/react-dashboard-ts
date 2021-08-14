import React from "react";
import { InputAdornment, InputLabel, TextField } from "@material-ui/core";
import { If } from "../If";
import SelectComponent from "../SelectComponent";
import RadioComponent from "../RadioComponent";
import "./style.scss";

const difference = ["select", "textarea", "radio", "date"];

const InputComponent = (props: any) => {
  return (
    <>
      <If condition={props.icon && !difference.includes(props.type)}>
        <TextField
          className={`input-component ${props.className}`}
          {...props}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{props.icon}</InputAdornment>
            ),
          }}
        />
      </If>
      <If condition={!props.icon && !difference.includes(props.type)}>
        <TextField
          className={`input-component ${props.className}`}
          {...props}
        />
      </If>
      <If condition={props.type === "select"}>
        <If condition={props.label}>
          <InputLabel>{props.label}</InputLabel>
        </If>
        <SelectComponent
          className={`input-component ${props.className}`}
          {...props}
        />
      </If>
      <If condition={props.type === "date"}>
        <If condition={props.label}>
          <InputLabel>{props.label}</InputLabel>
        </If>
        <TextField
          className={`input-component ${props.className}`}
          {...props}
          type="datetime-local"
          label={false}
        />
      </If>
      <If condition={props.type === "radio"}>
        <If condition={props.label}>
          <InputLabel>{props.label}</InputLabel>
        </If>
        <RadioComponent
          className={`input-component ${props.className}`}
          {...props}
        />
      </If>
      <If condition={props.type === "textarea"}>
        {/* <If condition={props.label}>
          <InputLabel>{props.label}</InputLabel>
        </If> */}
        <TextField
          multiline
          rows={4}
          className={`input-component ${props.className}`}
          {...props}
        />
      </If>
    </>
  );
};

export default InputComponent;
