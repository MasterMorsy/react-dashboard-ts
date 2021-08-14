import React from "react";
import { If } from "../If";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import "./style.scss";

interface BooleanComponentProps {
  value?: boolean;
}

export default function BooleanComponent(props: BooleanComponentProps) {
  return (
    <div className="boolean-component-wrapper">
      <If condition={props.value}>
        <div className="boolean-component true">
          <CheckIcon fontSize="small" />
        </div>
      </If>
      <If condition={!props.value}>
        <div className="boolean-component false">
          <CloseIcon fontSize="small" />
        </div>
      </If>
    </div>
  );
}
