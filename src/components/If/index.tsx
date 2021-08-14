import React from "react";

interface IfProps {
  condition: any;
  children: React.ReactNode;
  elseIf?: Function;
}

const falsy = [0, null, undefined, false];

export function If({ condition, children, elseIf }: IfProps) {
  if (falsy.includes(condition)) {
    return elseIf ? elseIf() : null;
  }
  return <>{children}</>;
}
