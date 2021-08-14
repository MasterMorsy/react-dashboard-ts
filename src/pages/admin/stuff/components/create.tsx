import React, { FormEvent } from "react";
import InputComponent from "../../../../components/InputComponent";
import MainButton from "../../../../components/MainButton";
import { isError, isGlobalError } from "../../../../helpers/isError";
import { createUser } from "../services";
import BusinessStore from "../../../../context/context";
import PageLayout from "../../../../components/PageLayout";
import PageHeader from "../../../../components/PageHeader";
import { withRouter } from "react-router";
import { Grid } from "@material-ui/core";
import ErrorComponent from "../../../../components/ErrorComponent";
import { listRoles } from "../../roles/services";

function NewStuff(props: any) {
  const [state, setState] = React.useState<any>({ type: "stuff" });
  const [roles, setRoles] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const { setNotify } = React.useContext(BusinessStore);

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data } = await listRoles();
    setRoles(data.records);
  }

  function handleState(key: string, value: any) {
    let clone = { ...state };
    clone[key] = value;
    setState(clone);
  }

  function createRecord(event: FormEvent) {
    event.preventDefault();
    setLoad(true);

    createUser(state)
      .then(() => {
        setNotify({ open: true, message: "stuff has been added" });
        setLoad(false);
        props.history.push("/admin/stuff");
      })
      .catch((err) => {
        setLoad(false);
        setErrors(err.response.data.errors);
      });
  }

  return (
    <PageLayout>
      <PageHeader title="New Stuff" />

      <div className="form-layout">
        <ErrorComponent text={isGlobalError(errors)} />
        <form onSubmit={createRecord}>
          <Grid container spacing={3}>
            <Grid item md={6}>
              <label className="form-label">Full Name</label>
              <InputComponent
                error={isError(errors, "name").status}
                helperText={isError(errors, "name").value}
                type="text"
                disabled={load}
                required={true}
                onChange={(event: any) =>
                  handleState("name", event.target.value)
                }
              />
            </Grid>
            <Grid item md={6}>
              <label className="form-label">Username</label>
              <InputComponent
                error={isError(errors, "username").status}
                helperText={isError(errors, "username").value}
                type="text"
                disabled={load}
                required={true}
                onChange={(event: any) =>
                  handleState("username", event.target.value)
                }
              />
            </Grid>
            <Grid item md={6}>
              <label className="form-label">Email</label>
              <InputComponent
                error={isError(errors, "email").status}
                helperText={isError(errors, "email").value}
                type="email"
                disabled={load}
                required={true}
                onChange={(event: any) =>
                  handleState("email", event.target.value)
                }
              />
            </Grid>
            <Grid item md={6}>
              <label className="form-label">Phone Number</label>
              <InputComponent
                error={isError(errors, "phone").status}
                helperText={isError(errors, "phone").value}
                type="tel"
                disabled={load}
                required={true}
                onChange={(event: any) =>
                  handleState("phone", event.target.value)
                }
              />
            </Grid>
            <Grid item md={6}>
              <label className="form-label">Password</label>
              <InputComponent
                error={isError(errors, "password").status}
                helperText={isError(errors, "password").value}
                type="password"
                disabled={load}
                required={true}
                onChange={(event: any) =>
                  handleState("password", event.target.value)
                }
              />
            </Grid>

            <Grid item md={6}>
              <label className="form-label">Role</label>
              <InputComponent
                error={isError(errors, "role").status}
                helperText={isError(errors, "role").value}
                type="select"
                disabled={load}
                required={true}
                keys={{ text: "name", value: "_id" }}
                data={roles}
                onChange={(event: any) =>
                  handleState("role", event.target.value)
                }
              />
            </Grid>
            <Grid item md={6}>
              <label className="form-label">Gender</label>
              <InputComponent
                error={isError(errors, "gender").status}
                helperText={isError(errors, "gender").value}
                type="select"
                disabled={load}
                required={true}
                data={["male", "female"]}
                onChange={(event: any) =>
                  handleState("gender", event.target.value)
                }
              />
            </Grid>
          </Grid>

          <MainButton load={load} type="submit" text="submit" />
        </form>
      </div>
    </PageLayout>
  );
}

export default withRouter(NewStuff);
