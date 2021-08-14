import React from "react";
import { InfoOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import "./style.scss";

interface AlertComponentProps {
  type?: "info" | "error" | "success" | "warning";
  notes?: string;
}

const useStyles = makeStyles({
  alert: {
    backgroundColor: (colord: any) => colord.backgroundColor,
    color: (colord: any) => colord.color,
  },
});

export default function AlertComponent(props: AlertComponentProps) {
  const styles = useStyles(handleColor());

  function handleColor() {
    let result = {
      backgroundColor: "transparent",
      color: "#1b1b1b",
    };

    switch (props.type) {
      case "info":
        result.backgroundColor = "rgb(232, 244, 253)";
        result.color = "rgb(13, 60, 97)";
        break;

      default:
        break;
    }

    return result;
  }

  return (
    <div className={`alert-component ${styles.alert}`}>
      <InfoOutlined fontSize="small" />
      <div className="alert-component-message">{props.notes}</div>
    </div>
  );
}
