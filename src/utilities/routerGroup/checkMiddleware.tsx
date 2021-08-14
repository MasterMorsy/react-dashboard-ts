import React from "react";
import { Route } from "react-router-dom";
import { If } from "../../components/If";

interface CheckMiddlewareProps {
  item: any;
  middleware?: Function | null | undefined;
}

export default function CheckMiddleware({
  item,
  middleware,
}: CheckMiddlewareProps) {
  return (
    <>
      <If condition={middleware}>
        <Route exact path={item.path} component={item.component} />
      </If>
    </>
  );
}
