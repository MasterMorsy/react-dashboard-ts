import React, { Component } from "react";
import { If } from "../If";
import "./style.scss";

interface PageHeaderProps {
  children?: React.ReactNode;
  title: string | Component | React.ReactNode;
}

export default function PageHeader({ children, title }: PageHeaderProps) {
  return (
    <div className="page-title d-flex justify-between">
      <h2 className="page-title-text">{title}</h2>
      <If condition={children}>{children}</If>
    </div>
  );
}
