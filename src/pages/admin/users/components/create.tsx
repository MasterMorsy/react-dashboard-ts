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
import endPoint from "../../../../services";
import { If } from "../../../../components/If";
import Spinner from "../../../../components/Spinner";

function NewPatient(props: any) {
  const [state, setState] = React.useState<any>({ type: "patient", home: {} });
  const [cities, setCities] = React.useState([]);
  const [regions, setRegions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [load, setLoad] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const { setNotify } = React.useContext(BusinessStore);

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data } = await endPoint.get("/cities");
    setCities(data.records);
    setLoading(false);
  }

  function handleState(key: string, value: any) {
    let clone = { ...state };
    if (["city", "region"].includes(key)) clone["home"][key] = value;
    else clone[key] = value;
    setState(clone);
  }

  function createRecord(event: FormEvent) {
    event.preventDefault();
    setLoad(true);

    createUser(state)
      .then(() => {
        setNotify({ open: true, message: "patient has been added" });
        setLoad(false);
        props.history.push("/admin/patients");
      })
      .catch((err) => {
        setLoad(false);
        setErrors(err.response.data.errors);
      });
  }

  function handleCity(cityId: string) {
    setRegions(cities.find((city: any) => city._id === cityId).regions);
    handleState("city", cityId);
  }

  return (
    <PageLayout>
      <PageHeader title="New Patient" />

      <If condition={loading}>
        <Spinner />
      </If>

      <If condition={!loading}>
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
                  label={null}
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
                  label={null}
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
                <label className="form-label">Phone</label>
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
                <label className="form-label">Gender</label>
                <InputComponent
                  error={isError(errors, "gender").status}
                  helperText={isError(errors, "gender").value}
                  type="select"
                  disabled={load}
                  data={["male", "female"]}
                  required={true}
                  onChange={(event: any) =>
                    handleState("gender", event.target.value)
                  }
                />
              </Grid>
              <Grid item md={6}>
                <label className="form-label">Region</label>
                <InputComponent
                  error={isError(errors, "city").status}
                  helperText={isError(errors, "city").value}
                  type="select"
                  disabled={load}
                  data={cities}
                  keys={{ value: "_id", text: "name" }}
                  required={true}
                  onChange={(event: any) => handleCity(event.target.value)}
                />
              </Grid>
              <Grid item md={6}>
                <label className="form-label">City</label>
                <InputComponent
                  error={isError(errors, "region").status}
                  helperText={isError(errors, "region").value}
                  type="select"
                  disabled={load}
                  data={regions}
                  keys={{ value: "_id", text: "name" }}
                  required={true}
                  onChange={(event: any) =>
                    handleState("region", event.target.value)
                  }
                />
              </Grid>
            </Grid>

            <MainButton load={load} type="submit" text="submit" />
          </form>
        </div>
      </If>
    </PageLayout>
  );
}

export default withRouter(NewPatient);
