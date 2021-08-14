import React, { FormEvent } from "react";
import InputComponent from "../../../../components/InputComponent";
import MainButton from "../../../../components/MainButton";
import { isError, isGlobalError } from "../../../../helpers/isError";
import { createRole } from "../services";
import BusinessStore from "../../../../context/context";
import PageLayout from "../../../../components/PageLayout";
import PageHeader from "../../../../components/PageHeader";
import { withRouter } from "react-router";
import { Grid, Checkbox, FormControlLabel } from "@material-ui/core";
import ErrorComponent from "../../../../components/ErrorComponent";
import { For } from "../../../../components/For";
import { modules, premessionsList } from "../../../../helpers/data";

function NewRecord(props: any) {
  const [state, setState] = React.useState<any>({ name: "", permissions: [] });
  const [load, setLoad] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const { setNotify } = React.useContext(BusinessStore);

  function handleState(event: any) {
    let clone = { ...state };
    clone["name"] = event.target.value;
    setState(clone);
  }

  function handleRoles(moduleName: string, event: any) {
    let clone = { ...state };

    if (clone.permissions.find((module: any) => module.name === moduleName)) {
      let target = clone.permissions.find(
        (module: any) => module.name === moduleName
      );
      target["roles"][event.target.name] = event.target.checked;
    } else {
      clone.permissions.push({
        name: moduleName,
        roles: {
          [event.target.name]: event.target.checked,
        },
      });
    }

    setState(clone);
  }

  function createRecord(event: FormEvent) {
    event.preventDefault();
    setLoad(true);

    createRole(state)
      .then(() => {
        setNotify({ open: true, message: "roles has been added" });
        setLoad(false);
        props.history.push("/admin/roles");
      })
      .catch((err) => {
        setLoad(false);
        setErrors(err.response.data.errors);
      });
  }

  return (
    <PageLayout>
      <PageHeader title="New Role" />

      <div className="form-layout">
        <ErrorComponent text={isGlobalError(errors)} />
        <form onSubmit={createRecord}>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <InputComponent
                error={isError(errors, "name").status}
                helperText={isError(errors, "name").value}
                type="text"
                disabled={load}
                required={true}
                label="name"
                onChange={handleState}
              />
            </Grid>
            <For
              data={modules}
              render={(module: any) => (
                <Grid item md={12}>
                  <h3 className="text-xl pb-4">{module}</h3>
                  <hr />

                  <For
                    data={premessionsList}
                    render={(premisstion: any) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(event) => handleRoles(module, event)}
                            name={premisstion}
                            color="primary"
                          />
                        }
                        label={premisstion}
                      />
                    )}
                  />
                </Grid>
              )}
            />
          </Grid>

          <MainButton load={load} type="submit" text="submit" />
        </form>
      </div>
    </PageLayout>
  );
}

export default withRouter(NewRecord);
