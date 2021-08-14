import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./style.scss";

interface SpinnerProps {
  size?: number;
  color?: "inherit" | "primary" | "secondary";
  height?: "full" | "normal";
}

export default function Spinner({
  size = 40,
  color = "primary",
  height = "full",
}: SpinnerProps) {
  return (
    <div
      className="app-spinner d-flex justify-center"
      style={{ minHeight: height === "full" ? "50vh" : "auto" }}
    >
      <CircularProgress size={size} color={color} />
    </div>
  );
}
