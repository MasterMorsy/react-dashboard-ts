import React, { FormEvent } from "react";
import InputComponent from "../../../../components/InputComponent";
import MainButton from "../../../../components/MainButton";
import { isError } from "../../../../helpers/isError";
import { updateUser, getUser } from "../services";
import BusinessStore from "../../../../context/context";
import { withRouter } from "react-router";
import { If } from "../../../../components/If";
import Spinner from "../../../../components/Spinner";
import PageLayout from "../../../../components/PageLayout";
import PageHeader from "../../../../components/PageHeader";
import { Grid } from "@material-ui/core";
import { listRoles } from "../../roles/services";

function UpdateCity(props: any) {
  const [state, setState] = React.useState<any>({});
  const [roles, setRoles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [load, setLoad] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const { setNotify } = React.useContext(BusinessStore);

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    Promise.all([await getUser(props.match.params.id), await listRoles()]).then(
      (res) => {
        setState(res[0].data.record);
        setRoles(res[1].data.records);
        setLoading(false);
      }
    );
  }

  function handleState(key: string, value: any) {
    let clone = { ...state };
    clone[key] = value;
    setState(clone);
  }

  function updateRecord(event: FormEvent) {
    event.preventDefault();
    setLoad(true);

    updateUser(props.match.params.id, state)
      .then((res) => {
        setNotify({ open: true, message: "stuff has been updated" });
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
      <PageHeader
        title={
          <>
            Update Stuff <span className="main-color">{state.name}</span>
          </>
        }
      />
      <div className="form-layout">
        <If condition={loading}>
          <Spinner />
        </If>

        <If condition={!loading}>
          <div className="form-layout">
            <form onSubmit={updateRecord}>
              <Grid container spacing={3}>
                <Grid item md={6}>
                  <label className="form-label">Full Name</label>
                  <InputComponent
                    error={isError(errors, "name").status}
                    helperText={isError(errors, "name").value}
                    type="text"
                    value={state.name}
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
                    value={state.username}
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
                    value={state.email}
                    required={true}
                    onChange={(event: any) =>
                      handleState("email", event.target.value)
                    }
                  />
                </Grid>
                <Grid item md={6}>
                  <label className="form-label">Phone</label>
                  <InputComponent
                    error={isError(errors, "phone").status}
                    helperText={isError(errors, "phone").value}
                    type="tel"
                    disabled={load}
                    value={state.phone}
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
                    value={state.role?._id}
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
                    value={state.gender}
                    data={["male", "female"]}
                    onChange={(event: any) =>
                      handleState("gender", event.target.value)
                    }
                  />
                </Grid>
              </Grid>

              <MainButton load={load} type="submit" text="Submit" />
            </form>
          </div>
        </If>
      </div>
    </PageLayout>
  );
}

export default withRouter(UpdateCity);
