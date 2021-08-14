import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { If } from "../If";

export interface MainButtonProps {
  text: string | React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  color?: "primary" | "secondary";
  onClick?: Function;
  icon?: string;
  iconWidth?: string | number;
  load?: boolean;
  disabled?: boolean;
}

const useStyle = makeStyles({
  wrapper: {
    userSelect: "none",
    backgroundColor: (props: MainButtonProps) => {
      return props.color === "secondary" || props.disabled
        ? "#ececec"
        : "#66cada";
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "none",
    borderRadius: 3,
    width: 145,
    height: 45,
    textAlign: "center",
    fontSize: 15,
  },
  icon: {
    marginRight: 10,
  },
});

const MainButton = (props: MainButtonProps) => {
  const classes = useStyle(props);

  const handleClick = () => {
    if (props.onClick) props.onClick();
  };
  return (
    <Button
      color="primary"
      variant="contained"
      disabled={props.disabled}
      type={props.type}
      onClick={() => (props.disabled ? null : handleClick())}
      className={`${classes.wrapper} ${props.className}`}
    >
      <If condition={props.load}>
        <CircularProgress color="secondary" size={20} />
      </If>
      <If condition={!props.load}>
        <If condition={props.icon}>
          <img
            src={props.icon}
            alt="admin-btn"
            className={classes.icon}
            width={props.iconWidth ? props.iconWidth : "20"}
          />
        </If>
        <span className="main-button-text">{props.text}</span>
      </If>
    </Button>
  );
};

MainButton.defaultProps = {
  type: "button",
  load: false,
};

export default MainButton;
