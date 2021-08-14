import React from "react";
import { For } from "../For";
import { If } from "../If";
import InputComponent from "../InputComponent";
import MainButton from "../MainButton";

interface QuestionnaireFormProps {
  data: Array<any>;
  current?: Array<any>;
  load?: boolean;
  preview?: boolean;
  onSave?: Function;
}

export default function QuestionnaireForm({
  data,
  current,
  load,
  onSave,
  preview,
}: QuestionnaireFormProps) {
  const [state, setState] = React.useState<any>([]);
  const [array, setArray] = React.useState<any>([]);

  React.useEffect(() => {
    if (current) {
      if (current.find((item) => item.type === "multiSelect"))
        setArray(current.find((item) => item.type === "multiSelect").value);
      setState(current);
    }
  }, []);

  function handleState(item: any, value: any) {
    let clone = [...state];
    if (item.type === "multiSelect") setArray(value);
    if (clone.find((quest) => quest._id === item._id)) {
      clone[
        clone.indexOf(clone.find((quest) => quest._id === item._id))
      ].value = value;
      setState(clone);
    } else {
      clone.push({
        _id: item._id,
        name: item.name,
        type: item.type,
        value,
      });
      setState(clone);
    }
  }

  function handleSave(event: any) {
    event.preventDefault();
    onSave(state);
  }

  function getValue(item: any) {
    let target = current.find((quest) => quest._id === item._id);
    if (target) return target.value;
  }

  return (
    <div className="questionnaires-Form">
      <form onSubmit={(event) => handleSave(event)}>
        <For
          data={data}
          render={(item: any, index: number) => (
            <>
              <If condition={item.type === "shortAnswer"}>
                <div className="questionnaire-item mb-8">
                  <h3 className="mb-4">👉 {" " + item.name}</h3>
                  <If condition={preview}>
                    <p>{getValue(item)}</p>
                  </If>
                  <If condition={!preview}>
                    <InputComponent
                      type="text"
                      disabled={load}
                      required={item.require}
                      value={getValue(item)}
                      onChange={(event: any) =>
                        handleState(item, event.target.value)
                      }
                    />
                  </If>
                  <hr className="mt-4" />
                </div>
              </If>
              <If condition={item.type === "longAnswer"}>
                <div className="questionnaire-item mb-8">
                  <h3 className="mb-4">👉 {" " + item.name}</h3>
                  <If condition={preview}>
                    <p>{getValue(item)}</p>
                  </If>
                  <If condition={!preview}>
                    <InputComponent
                      label={false}
                      type="textarea"
                      placeholder={item.name}
                      disabled={load}
                      value={getValue(item)}
                      required={item.require}
                      onChange={(event: any) =>
                        handleState(item, event.target.value)
                      }
                    />
                  </If>
                  <hr className="mt-4" />
                </div>
              </If>
              <If condition={item.type === "singleSelect"}>
                <div className="questionnaire-item mb-8">
                  <h3 className="mb-4">👉 {" " + item.name}</h3>
                  <If condition={preview}>
                    <p>{getValue(item)}</p>
                  </If>
                  <If condition={!preview}>
                    <InputComponent
                      type="radio"
                      value={getValue(item)}
                      data={item.options}
                      disabled={load}
                      required={item.require}
                      placeholder={item.name}
                      onChange={(event: any) =>
                        handleState(item, event.target.value)
                      }
                    />
                  </If>
                  <hr className="mt-4" />
                </div>
              </If>
              <If condition={item.type === "multiSelect"}>
                <div className="questionnaire-item mb-8">
                  <h3 className="mb-4">👉 {" " + item.name}</h3>
                  <If condition={preview}>
                    <p>
                      {Array.isArray(getValue(item))
                        ? getValue(item).join(" - ")
                        : getValue(item)}
                    </p>
                  </If>
                  <If condition={!preview}>
                    <InputComponent
                      label={false}
                      type="select"
                      multiple
                      value={array}
                      data={item.options}
                      placeholder={item.name}
                      disabled={load}
                      required={item.require}
                      onChange={(event: any) =>
                        handleState(item, event.target.value)
                      }
                    />
                  </If>
                  <hr className="mt-4" />
                </div>
              </If>
            </>
          )}
        />

        <If condition={!preview}>
          <MainButton load={load} type="submit" text="Save" />
        </If>
      </form>
    </div>
  );
}
