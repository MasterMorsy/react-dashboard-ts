import React from "react";
import { useHistory } from "react-router";

interface NavigateToInterfaceProps {
  url: string;
}

const NavigateTo = (props: NavigateToInterfaceProps) => {
  const history = useHistory();
  React.useEffect(() => {
    history.push(props.url);
  }, []);

  return <></>;
};

export default NavigateTo;
