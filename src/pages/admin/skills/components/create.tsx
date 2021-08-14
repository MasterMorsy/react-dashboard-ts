import React, { FormEvent } from "react";
import InputComponent from "../../../../components/InputComponent";
import MainButton from "../../../../components/MainButton";
import { isError } from "../../../../helpers/isError";
import { createSkill } from "../services";
import BusinessStore from "../../../../context/context";
import PageLayout from "../../../../components/PageLayout";
import PageHeader from "../../../../components/PageHeader";
import { withRouter } from "react-router";

function NewSkill(props: any) {
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

    createSkill({
      ...state,
      children:
        state.children && state.children.length
          ? state.children.split(",")
          : [],
    })
      .then(() => {
        setNotify({ open: true, message: "Category has been added" });
        setLoad(false);
        props.history.push("/admin/skills");
      })
      .catch((err) => {
        setLoad(false);
        setErrors(err.response.data.errors);
      });
  }

  return (
    <PageLayout>
      <PageHeader title="Create Category" />

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
            error={isError(errors, "children").status}
            helperText={isError(errors, "children").value}
            type="text"
            disabled={load}
            label="skills"
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

export default withRouter(NewSkill);
