import React from "react";
import "./style.scss";

export interface ErrorComponentProps {
  text: string;
  className?: string;
}

const ErrorComponent = ({ text, className }: ErrorComponentProps) => {
  return <span className={`error-component ${className}`}>{text}</span>;
};

export default ErrorComponent;
