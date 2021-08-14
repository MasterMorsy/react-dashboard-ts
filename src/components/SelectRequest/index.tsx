import React from "react";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";
import endPoint from "../../services";

export default function SelectRequest(props: any) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open;
  //   const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const { data } = await endPoint.get(props.serviceUrl);

      if (active) {
        setOptions(data.records);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      onChange={(event, data) => props.onChange(data)}
      multiple={props.multiple}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option._id === value._id}
      getOptionLabel={(option) => option.name}
      options={options}
      value={props.value}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
