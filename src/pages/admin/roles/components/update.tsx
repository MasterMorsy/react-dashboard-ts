import React, { FormEvent } from "react";
import InputComponent from "../../../../components/InputComponent";
import MainButton from "../../../../components/MainButton";
import { isError, isGlobalError } from "../../../../helpers/isError";
import { updateRole, getRole } from "../services";
import BusinessStore from "../../../../context/context";
import { withRouter } from "react-router";
import { If } from "../../../../components/If";
import Spinner from "../../../../components/Spinner";
import PageLayout from "../../../../components/PageLayout";
import PageHeader from "../../../../components/PageHeader";
import { FormControlLabel, Grid, Checkbox } from "@material-ui/core";
import { For } from "../../../../components/For";
import ErrorComponent from "../../../../components/ErrorComponent";
import { modules, premessionsList } from "../../../../helpers/data";

function UpdateUser(props: any) {
  const [state, setState] = React.useState<any>({});
  const [loading, setLoading] = React.useState(true);
  const [load, setLoad] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const { setNotify } = React.useContext(BusinessStore);

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data } = await getRole(props.match.params.id);
    setState(data.record);
    setLoading(false);
  }

  function handleState(key: string, value: any) {
    let clone = { ...state };
    clone[key] = value;
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

  function isChecked(moduleName: string, premession: String): boolean {
    return state.permissions?.find((module: any) => module.name === moduleName)
      ?.roles?.[`${premession}`];
  }

  function updateRecord(event: FormEvent) {
    event.preventDefault();
    setLoad(true);

    updateRole(props.match.params.id, state)
      .then((res) => {
        setNotify({ open: true, message: "user has been updated" });
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
      <PageHeader title={`Update role ${state.name}`} />

      <If condition={loading}>
        <Spinner />
      </If>
      <If condition={!loading}>
        <div className="form-layout">
          <ErrorComponent text={isGlobalError(errors)} />
          <form onSubmit={updateRecord}>
            <Grid container spacing={3}>
              <Grid item md={12}>
                <InputComponent
                  error={isError(errors, "name").status}
                  helperText={isError(errors, "name").value}
                  type="text"
                  value={state.name}
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
                      render={(premession: any) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isChecked(module, premession)}
                              onChange={(event: any) =>
                                handleRoles(module, event)
                              }
                              name={premession}
                              color="primary"
                            />
                          }
                          label={premession}
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
      </If>
    </PageLayout>
  );
}

export default withRouter(UpdateUser);
