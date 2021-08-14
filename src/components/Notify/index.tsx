import React from "react";
import { Snackbar } from "@material-ui/core";
import BusinessStore from "../../context/context";

const Notify = () => {
  const [state, setState] = React.useState<any>({});
  const { notify, setNotify } = React.useContext(BusinessStore);
  React.useEffect(() => {
    setState(notify);
  }, [notify]);
  const horizontal = "left";

  function handleClose() {
    setNotify({ open: false });
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal }}
      open={state?.open}
      message={state?.message}
      key={"top" + horizontal}
      autoHideDuration={3000}
      onClose={() => handleClose()}
    />
  );
};

export default Notify;
