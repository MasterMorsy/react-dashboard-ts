import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Switch } from "react-router-dom";
import { For } from "../../components/For";
import { If } from "../../components/If";
import CheckMiddleware from "./checkMiddleware";
import RenderLayout from "./renderLayout";

interface BasicComponentProps {
  key?: string;
  children: React.ReactNode;
}

interface RouterGroupProps {
  layout?: any;
  routes: Array<any>;
  middleware?: Function;
}

function RenderContent({ layout, routes, middleware }: RouterGroupProps) {
  if (middleware && middleware()) {
    return (
      <Router>
        <If condition={layout}>
          <RenderLayout layout={layout}>
            <Switch>
              <For
                data={routes}
                render={(item: any) => (
                  <CheckMiddleware item={item} middleware={middleware} />
                )}
              />
            </Switch>
          </RenderLayout>
        </If>
        <If condition={!layout}>
          <Switch>
            <For
              data={routes}
              render={(item: any) => (
                <CheckMiddleware item={item} middleware={middleware} />
              )}
            />
          </Switch>
        </If>
      </Router>
    );
  }

  return <></>;
}

export default function RouterGroup(props: RouterGroupProps) {
  ReactDOM.render(
    <React.StrictMode>
      <RenderContent {...props} />
    </React.StrictMode>,
    document.getElementById("root")
  );
}
