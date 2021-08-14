import React, { FormEvent } from "react";
import InputComponent from "../../../../components/InputComponent";
import MainButton from "../../../../components/MainButton";
import { isError } from "../../../../helpers/isError";
import { updateSkill, getSkill, deleteSkill } from "../services";
import BusinessStore from "../../../../context/context";
import { withRouter } from "react-router";
import { If } from "../../../../components/If";
import Spinner from "../../../../components/Spinner";
import PageLayout from "../../../../components/PageLayout";
import PageHeader from "../../../../components/PageHeader";
import { For } from "../../../../components/For";
import { Chip } from "@material-ui/core";

function UpdateSkill(props: any) {
  const [state, setState] = React.useState<any>({});
  const [records, setRecords] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [load, setLoad] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const { setNotify } = React.useContext(BusinessStore);

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data } = await getSkill(props.match.params.id);
    setState(data.record);
    setRecords(data.record.children);
    setLoading(false);
  }

  function handleState(key: string, value: any) {
    let clone = { ...state };
    clone[key] = value;
    setState(clone);
  }

  function updateRecord(event: FormEvent) {
    event.preventDefault();
    setLoad(true);

    updateSkill(props.match.params.id, {
      ...state,
      children:
        state.children && state.children.split(",").length
          ? state.children.split(",")
          : [],
    })
      .then((res) => {
        setNotify({ open: true, message: "Skill has been updated" });
        setLoad(false);
        props.history.push("/admin/skills");
      })
      .catch(() => setLoad(false));
  }

  async function handleDelete(id: string) {
    await deleteSkill(id);
    setNotify({ open: true, message: "Skill has been deleted" });
    setState({
      ...state,
      children: state.children.filter((record: any) => record._id !== id),
    });
  }

  return (
    <PageLayout>
      <PageHeader
        title={
          <>
            Update Skill <span className="main-color">{state.name}</span>
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
                error={isError(errors, "children").status}
                helperText={isError(errors, "children").value}
                type="text"
                disabled={load}
                required={state.children?.length ? false : true}
                label="add children"
                onChange={(event: any) =>
                  handleState("children", event.target.value)
                }
              />
              <For
                data={records}
                render={(item: any) => (
                  <Chip
                    label={item.name}
                    onDelete={() => handleDelete(item._id)}
                  />
                )}
              />

              <MainButton load={load} type="submit" text="submit" />
            </form>
          </div>
        </If>
      </div>
    </PageLayout>
  );
}

export default withRouter(UpdateSkill);
