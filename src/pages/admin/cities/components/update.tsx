import React, { FormEvent } from "react";
import InputComponent from "../../../../components/InputComponent";
import MainButton from "../../../../components/MainButton";
import { isError } from "../../../../helpers/isError";
import { updateCity, deleteRegion, getCity } from "../services";
import BusinessStore from "../../../../context/context";
import { withRouter } from "react-router";
import { If } from "../../../../components/If";
import Spinner from "../../../../components/Spinner";
import { For } from "../../../../components/For";
import { Chip } from "@material-ui/core";
import AlertComponent from "../../../../components/Alert";
import PageLayout from "../../../../components/PageLayout";
import PageHeader from "../../../../components/PageHeader";

function UpdateCity(props: any) {
  const [state, setState] = React.useState<any>({});
  const [loading, setLoading] = React.useState(true);
  const [load, setLoad] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const { setNotify } = React.useContext(BusinessStore);

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data } = await getCity(props.match.params.id);
    setState(data.record);
    setLoading(false);
  }

  function handleState(key: string, value: any) {
    let clone = { ...state };
    clone[key] = value;
    setState(clone);
  }

  async function handleDeleteRegion(regionId: string) {
    await deleteRegion(regionId);
    setNotify({ open: true, message: "region has been removed" });
    let clone = { ...state };
    clone.regions = clone.regions.filter(
      (region: any) => region._id !== regionId
    );
    setState(clone);
  }

  function updateRecord(event: FormEvent) {
    event.preventDefault();
    setLoad(true);

    updateCity(props.match.params.id, {
      ...state,
      children:
        state.children && state.children.split(",").length
          ? state.children.split(",")
          : [],
    })
      .then((res) => {
        setState(res.data.record);
        setNotify({ open: true, message: "city has been updated" });
        setLoad(false);
      })
      .catch(() => setLoad(false));
  }

  return (
    <PageLayout>
      <PageHeader
        title={
          <>
            Update City <span className="main-color">{state.name}</span>
          </>
        }
      />
      <div className="form-layout">
        <AlertComponent
          type="info"
          notes="if region not saved, this becouse it's already exist"
        />

        <If condition={loading}>
          <Spinner />
        </If>

        <If condition={!loading}>
          <div className="form-layout">
            <form onSubmit={updateRecord}>
              <InputComponent
                error={isError(errors, "name").status}
                helperText={isError(errors, "name").value}
                type="text"
                value={state.name}
                disabled={load}
                required={true}
                label="name"
                onChange={(event: any) =>
                  handleState("name", event.target.value)
                }
              />
              <InputComponent
                error={isError(errors, "region").status}
                helperText={isError(errors, "region").value}
                type="text"
                disabled={load}
                required={state.regions?.length ? false : true}
                label="add regions"
                onChange={(event: any) =>
                  handleState("children", event.target.value)
                }
              />
              <For
                data={state.regions}
                render={(item: any) => (
                  <Chip
                    label={item.name}
                    onDelete={() => handleDeleteRegion(item._id)}
                  />
                )}
              />
              <MainButton load={load} type="submit" text="Submit" />
            </form>
          </div>
        </If>
      </div>
    </PageLayout>
  );
}

export default withRouter(UpdateCity);
