import React, { FormEvent } from "react";
import InputComponent from "../../../../components/InputComponent";
import MainButton from "../../../../components/MainButton";
import { isError } from "../../../../helpers/isError";
import { createCity } from "../services";
import BusinessStore from "../../../../context/context";
import PageLayout from "../../../../components/PageLayout";
import PageHeader from "../../../../components/PageHeader";
import { withRouter } from "react-router";

function NewCity(props: any) {
  const [state, setState] = React.useState<any>({});
  const [load, setLoad] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const { setNotify } = React.useContext(BusinessStore);

  function handleState(key: string, value: any) {
    let clone = { ...state };
    clone[key] = value;
    setState(clone);
  }

  function createRecord(event: FormEvent) {
    event.preventDefault();
    setLoad(true);

    createCity({ ...state, children: state.children.split(",") })
      .then(() => {
        setNotify({ open: true, message: "city has been added" });
        setLoad(false);
        props.history.push("/admin/cities");
      })
      .catch((err) => {
        setLoad(false);
        setErrors(err.response.data.errors);
      });
  }

  return (
    <PageLayout>
      <PageHeader title="Create City" />

      <div className="form-layout">
        <form onSubmit={createRecord}>
          <InputComponent
            error={isError(errors, "name").status}
            helperText={isError(errors, "name").value}
            type="text"
            disabled={load}
            required={true}
            label="name"
            onChange={(event: any) => handleState("name", event.target.value)}
          />
          <InputComponent
            error={isError(errors, "region").status}
            helperText={isError(errors, "region").value}
            type="text"
            disabled={load}
            required={true}
            label="regions"
            onChange={(event: any) =>
              handleState("children", event.target.value)
            }
          />
          <MainButton load={load} type="submit" text="submit" />
        </form>
      </div>
    </PageLayout>
  );
}

export default withRouter(NewCity);
